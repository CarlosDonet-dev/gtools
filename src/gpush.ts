#!/usr/bin/env node
import ora from 'ora';
import { execa } from 'execa';

const args = process.argv.slice(2);
const showHelp = args.includes('--help') || args.includes('-h');

if (showHelp) {
  console.log(`
Usage: gpush

Pushes your commits to the remote repository.

This is a shortcut for:
  git push

Example:
  gpush
`);
  process.exit(0);
}

async function run() {
  const spinner = ora('⬆️  Pushing your commits to remote...').start();

  try {
    await execa('git', ['push']);
    spinner.succeed('Push completed successfully.');
  } catch (error: any) {
    spinner.fail('Push failed.');
    console.error(error.message);
    process.exit(1);
  }
}

run();
