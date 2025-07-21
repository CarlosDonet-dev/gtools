#!/usr/bin/env node
import ora from 'ora';
import { execa } from 'execa';
import { color } from './utils/color.js';

async function gfetch() {
  const args = process.argv.slice(2);
  if (args.includes('-h') || args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  const spinner = ora(
    'Fetching from remote and pruning deleted branches...'
  ).start();

  try {
    const { stdout } = await execa('git', ['fetch', '-p']);
    spinner.succeed('Done.');
    if (stdout.trim()) {
      console.log(color(stdout.trim(), 36));
    }
  } catch (err) {
    spinner.fail('An error occurred while fetching.');
    process.exit(1);
  }
}

function printHelp() {
  console.log(`
Usage: gfetch

Fetches updates from the remote repository and prunes deleted branches.

This is a shortcut for:
  git fetch -p

The '-p' option tells Git to remove any remote-tracking references that no longer exist on the remote.

Example:
  gfetch

Runs 'git fetch -p' and shows updated refs.
`);
}

gfetch();
