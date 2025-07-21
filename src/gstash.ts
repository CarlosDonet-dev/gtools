#!/usr/bin/env node
import ora from 'ora';
import { execa } from 'execa';

const args = process.argv.slice(2);
const showHelp = args.includes('--help') || args.includes('-h');
const applyStash = args.includes('-a');

if (showHelp) {
  console.log(`
Usage: gstash [option]

A shortcut wrapper for Git stash operations.

Commands:
  gstash           Save current changes (equivalent to 'git stash')
  gstash -a        Apply the most recent stash (equivalent to 'git stash apply')

Examples:
  gstash           Stashes your current uncommitted changes.
  gstash -a        Applies the most recent stash.
`);
  process.exit(0);
}

async function run() {
  try {
    if (applyStash) {
      const spinner = ora('📦 Applying the latest stash...').start();
      await execa('git', ['stash', 'apply']);
      spinner.succeed('Stash applied.');
    } else {
      const spinner = ora('📥 Stashing current changes...').start();
      await execa('git', ['stash']);
      spinner.succeed('Changes stashed.');
    }
  } catch (error: any) {
    console.error(`✖ ${error.message}`);
    process.exit(1);
  }
}

run();
