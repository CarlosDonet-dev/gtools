#!/usr/bin/env node
import ora from 'ora';
import { execa } from 'execa';
import { color } from './utils/color.js';

async function gclean() {
  const args = process.argv.slice(2);
  if (args.includes('-h') || args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  const spinner = ora(
    'Fetching and pruning remote-tracking branches...'
  ).start();

  try {
    await execa('git', ['fetch', '-p']);
    spinner.succeed('Remote-tracking branches pruned.');
  } catch (err) {
    spinner.fail('Failed to fetch and prune.');
    process.exit(1);
  }

  const { stdout: currentBranch } = await execa('git', [
    'branch',
    '--show-current'
  ]);
  console.log(`Current branch: ${currentBranch}`);

  const { stdout: branches } = await execa('git', ['branch', '-vv']);
  const goneBranches = branches
    .split('\n')
    .filter((line) => line.includes(': gone]'))
    .map((line) => line.trim().split(' ')[0])
    .filter((name) => name !== currentBranch && name !== '*');

  if (goneBranches.length === 0) {
    console.log(color('No local branches to clean.', 32));
    process.exit(0);
  }

  for (const branch of goneBranches) {
    await execa('git', ['branch', '-D', branch]);
  }

  console.log(color('✔ Cleanup complete', 32));
}

function printHelp() {
  console.log(`
Usage: gclean

Deletes local Git branches that no longer exist on the remote.

Steps:
  1. Runs 'git fetch -p' to prune remote-tracking branches.
  2. Deletes all local branches marked as '[gone]' in 'git branch -vv'.

Warning:
  - Your current branch will NOT be deleted.
  - This deletes branches permanently.
`);
}

gclean();
