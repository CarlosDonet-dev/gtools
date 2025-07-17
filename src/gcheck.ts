#!/usr/bin/env node
import { execSync } from 'child_process';
import prompts from 'prompts';

const PREFIX = 'GES3-';

type BranchType = 'feat' | 'fix' | 'release' | 'other';

function parseArgs(): { type: BranchType; ticket: string } {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: gcheck [-f | -r | -o] <ticket_or_branch>');
    process.exit(1);
  }

  let type: BranchType = 'feat';
  let ticket = '';

  const flag = args[0];

  switch (flag) {
    case '-f':
      type = 'fix';
      ticket = args[1];
      break;
    case '-r':
      type = 'release';
      ticket = args[1];
      break;
    case '-o':
      type = 'other';
      ticket = args[1];
      break;
    default:
      ticket = args[0]; // Default to feature branch
  }

  if (!ticket) {
    console.error('Missing ticket or branch name.');
    process.exit(1);
  }

  return { type, ticket };
}

function getMatchingBranches(type: BranchType, ticket: string): string[] {
  const allBranches = execSync('git branch -a')
    .toString()
    .split('\n')
    .map((b) => b.trim().replace(/^\* /, ''));

  if (type === 'other') {
    return allBranches.filter((b) => b.endsWith(ticket));
  }

  if (type === 'release') {
    return allBranches.filter((b) => b.endsWith(`release/${ticket}`));
  }

  // feat or fix
  const search = `${type}/${PREFIX}${ticket}_`;
  return allBranches.filter(
    (b) =>
      b.includes(search) || (b.startsWith('remotes/') && b.includes(search))
  );
}

function filterBranches(branches: string[]): string[] {
  const local = new Set(branches.filter((b) => !b.startsWith('remotes/')));
  return branches.filter((b) => {
    if (!b.startsWith('remotes/')) return true;
    const localEquivalent = b.replace(/^remotes\/[^\/]+\//, '');
    return !local.has(localEquivalent);
  });
}

async function main() {
  const { type, ticket } = parseArgs();

  let branches = getMatchingBranches(type, ticket);
  branches = filterBranches(branches);

  if (branches.length === 0) {
    try {
      console.log("Branch not found locally. Running 'git fetch -p'...");
      execSync('git fetch -p', { stdio: 'inherit' });
    } catch (err) {
      console.error('Failed to fetch:', err);
      process.exit(1);
    }

    branches = getMatchingBranches(type, ticket);
    branches = filterBranches(branches);

    if (branches.length === 0) {
      console.error('No branches found.');
      process.exit(1);
    }
  }

  let selected = branches.find((b) => !b.startsWith('remotes/')) || branches[0];

  if (branches.length > 1) {
    const res = await prompts({
      type: 'select',
      name: 'branch',
      message: 'Multiple branches found. Select one to checkout:',
      choices: branches.map((b) => ({ title: b, value: b }))
    });
    selected = res.branch;
  }

  if (!selected) {
    console.log('No branch selected.');
    process.exit(0);
  }

  try {
    if (selected.startsWith('remotes/')) {
      const local = selected.replace(/^remotes\/[^\/]+\//, '');
      console.log(`Checking out remote '${selected}' as local '${local}'`);
      execSync(`git checkout -b ${local} ${selected}`, { stdio: 'inherit' });
    } else {
      console.log(`Checking out '${selected}'`);
      execSync(`git checkout ${selected}`, { stdio: 'inherit' });
    }
  } catch (err) {
    console.error('Checkout failed:', err);
    process.exit(1);
  }
}

main();
