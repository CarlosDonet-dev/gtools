#!/usr/bin/env node
import ora from 'ora';
import { execa } from 'execa';

const args = process.argv.slice(2);
const showHelp = args.includes('--help') || args.includes('-h');

if (showHelp) {
  console.log(`
Usage: gok

Continues an in-progress Git merge operation.

This is a shortcut for:
  git merge --continue

Use this after resolving conflicts during a merge to proceed.

Example:
  gok

Runs 'git merge --continue' and completes the merge if possible.
`);
  process.exit(0);
}

async function run() {
  const spinner = ora('🚀 Continuing merge...').start();

  try {
    await execa('git', ['merge', '--continue']);
    spinner.succeed('Merge continued successfully.');
  } catch (error: any) {
    spinner.fail('Failed to continue merge. Resolve conflicts and try again.');
    if (error.stderr) {
      console.error(error.stderr);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

run();
