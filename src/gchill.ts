import ora from 'ora';

const chillPhrases = [
  'Taking a coffee break... ☕️😌',
  'Chilling like a git commit with no conflicts... 😎✅',
  'Just merging peace and quiet... ✌️🕊️',
  'Waiting for inspiration... or Wi-Fi... 📶💡',
  'Deleting stress, not branches... 🧘‍♂️❌🌿',
  'Counting commits... zzz... 💤📈',
  'Resetting mind to HEAD~1... 🤯🔄',
  'Branching out to relaxation... 🌴🌊',
  'Pushing worries away... 🚀🧹',
  'Keeping calm and git on... 🐢💻',
  'Compiling chill vibes... 0 errors, 0 warnings. ⚙️👌',
  'Fetching some coolness from origin/chill-zone... ❄️📥',
  'Refactoring my thoughts... one joke at a time. 🧠🔧😂',
  'If debugging is the process of removing bugs, chilling is the process of removing stress. 🐞➔😌',
  'Optimizing relaxation algorithms... O(1) complexity guaranteed. 🧑‍💻🎯',
  'Just waiting for my code to deploy... and my brain to reboot. 🖥️🔄🧠',
  'Remember: a relaxed coder is a productive coder. 😴➡️💡',
  'Merging Zen mode into main branch... no conflicts expected. 🧘‍♀️➕🌿',
  'Time to git stash all worries and pop a chill commit. 📦😌✔️',
  'No bugs here, just vibes. 🐞🚫✌️',
  'Restoring HEAD to ‘relaxation’ state... 🎉😴'
];

function printHelp() {
  console.log(`
Usage: gchill [--help|-h]

A fun command that shows nerdy and funny chill phrases with a spinner.

Options:
  -h, --help    Show this help message and exit

Example:
  gchill
`);
}

async function gchill() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    return;
  }
  const spinner = ora('Getting into chill mode...').start();

  for (let i = 0; i < 4; i++) {
    await new Promise((res) => setTimeout(res, 3000));
    spinner.text =
      chillPhrases[Math.floor(Math.random() * chillPhrases.length)];
  }

  spinner.succeed('All chilled out! 😌 Time to code on.');
}

gchill();
