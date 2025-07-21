#!/usr/bin/env node
import ora from 'ora';
import { execa } from 'execa';

async function gmerge(args: string[]) {
  const helpFlags = ['-h', '--help'];
  if (args.length === 0 || helpFlags.includes(args[0])) {
    console.log(`
Usage: gmerge <release-branch-name>

Merge a remote release branch into your current branch without committing.

Options:
  -h, --help   Show this help message and exit.

Example:
  gmerge planner

This will merge the remote branch origin/release/planner
into your current branch using:

  git merge --no-commit --no-ff origin/release/planner

Notes:
  - The merge is performed with --no-commit and --no-ff,
    so you can review changes before committing.
  - Make sure your working directory is clean before merging.
`);
    return;
  }

  const branch = args[0];
  const remoteBranch = `origin/release/${branch}`;

  const spinner = ora(`Fetching remote branches...`).start();
  try {
    await execa('git', ['fetch', '--prune']);
    spinner.succeed('Remote branches fetched.');

    const { stdout } = await execa('git', [
      'show-ref',
      '--verify',
      `refs/remotes/${remoteBranch}`
    ]);
    if (!stdout) {
      console.error(`Remote branch '${remoteBranch}' not found.`);
      process.exit(1);
    }
  } catch {
    spinner.fail(`Failed to fetch or verify remote branch '${remoteBranch}'.`);
    process.exit(1);
  }

  const mergeSpinner = ora(
    `Merging ${remoteBranch} with --no-commit --no-ff`
  ).start();
  try {
    await execa('git', ['merge', '--no-commit', '--no-ff', remoteBranch]);
    mergeSpinner.succeed(`Merge successful.`);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    mergeSpinner.fail(`Merge failed: ${msg}`);
    process.exit(1);
  }
}

// To run: gmerge(process.argv.slice(2));
gmerge(process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exit(1);
});
