#!/usr/bin/env node
import fs from 'fs';
import os from 'os';
import path from 'path';
import inquirer from 'inquirer';

const CONFIG_DIR = path.join(os.homedir(), '.gtools');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

function loadConfig(): Record<string, string> {
  if (!fs.existsSync(CONFIG_FILE)) return {};
  try {
    const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function saveConfig(config: Record<string, string>) {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

async function interactiveSetup() {
  const config = loadConfig();
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'PREFIX',
      message: 'Enter your branch PREFIX:',
      default: config.PREFIX || '',
      validate: (input: string) =>
        input.trim().length > 0 || 'Prefix cannot be empty'
    }
  ]);
  config.PREFIX = answers.PREFIX.trim();
  saveConfig(config);
  console.log(`Saved PREFIX = ${config.PREFIX}`);
}

function printHelp() {
  console.log(`
Usage:
  gconfig                  Launch interactive configuration setup
  gconfig get <KEY>        Get the value of a specific config key
  gconfig set <KEY> <VAL>  Set the value for a specific config key

Examples:
  gconfig
  gconfig get PREFIX
  gconfig set PREFIX TICKET-
`);
}

async function main() {
  const args = process.argv.slice(2);
  const config = loadConfig();

  if (args.length === 0) {
    await interactiveSetup();
    return;
  }

  const [cmd, key, value] = args;

  if (cmd === 'set' && key && value) {
    config[key] = value;
    saveConfig(config);
    console.log(`Set ${key} = ${value}`);
  } else if (cmd === 'get' && key) {
    if (config[key]) {
      console.log(config[key]);
    } else {
      console.log(`${key} not set.`);
    }
  } else if (cmd === 'interactive') {
    await interactiveSetup();
  } else {
    printHelp();
  }
}

main();
