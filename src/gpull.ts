#!/usr/bin/env node
import ora from 'ora';
import { execa } from 'execa';

const args = process.argv.slice(2);
const showHelp = args.includes('--help') || args.includes('-h');

if (showHelp) {
  console.log(`
Usage: gpull

Fetches and integrates changes from the remote repository to your current branch.

This is a shortcut for:
  git pull

Example:
  gpull
`);
  process.exit(0);
}

async function run() {
  const spinner = ora('⬇️  Pulling latest changes from remote...').start();

  try {
    await execa('git', ['pull']);
    spinner.succeed('Pull completed successfully.');
  } catch (error: any) {
    spinner.fail('Pull failed.');
    console.error(error.message);
    process.exit(1);
  }
}

run();
