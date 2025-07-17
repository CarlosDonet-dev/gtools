#!/usr/bin/env node

import { execSync } from 'child_process';
import chalk from 'chalk';

type BranchGroups = {
  feat: string[];
  fix: string[];
  release: string[];
  main: string[];
  other: string[];
};

function getLocalBranches(): { branches: string[]; current: string } {
  try {
    const output = execSync('git branch', { encoding: 'utf-8' });
    const lines = output
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    let current = '';
    const branches = lines.map((line) => {
      if (line.startsWith('*')) {
        current = line.slice(2).trim();
        return current;
      }
      return line;
    });

    return { branches, current };
  } catch (error) {
    console.error(
      chalk.red(
        '❌ Error: Could not read Git branches. Are you inside a Git repo?'
      )
    );
    process.exit(1);
  }
}

function groupBranches(branches: string[]): BranchGroups {
  const groups: BranchGroups = {
    feat: [],
    fix: [],
    release: [],
    main: [],
    other: []
  };

  for (const branch of branches) {
    if (branch.startsWith('feat/')) groups.feat.push(branch);
    else if (branch.startsWith('fix/')) groups.fix.push(branch);
    else if (branch.startsWith('release/')) groups.release.push(branch);
    else if (branch === 'main' || branch === 'dev') groups.main.push(branch);
    else groups.other.push(branch);
  }

  return groups;
}

function printGroup(
  title: string,
  color: typeof chalk,
  branches: string[],
  current: string
) {
  if (branches.length === 0) return;

  console.log(color.bold.underline(title));
  for (const branch of branches) {
    if (branch === current) {
      console.log(`  * ${color.bold(branch)}   ${chalk.gray('← current')}`);
    } else {
      console.log(`    ${branch}`);
    }
  }
  console.log();
}

function run() {
  const { branches, current } = getLocalBranches();
  const groups = groupBranches(branches);

  printGroup('Features', chalk.cyan, groups.feat, current);
  printGroup('Fixes', chalk.yellow, groups.fix, current);
  printGroup('Releases', chalk.magenta, groups.release, current);
  printGroup('Main Branches', chalk.green, groups.main, current);
  printGroup('Other Branches', chalk.gray, groups.other, current);
}

run();
