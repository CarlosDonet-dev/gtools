// utils/config.ts
import fs from 'fs';
import os from 'os';
import path from 'path';

const CONFIG_PATH = path.join(os.homedir(), '.gtools', 'config.json');

export function loadConfig(): Record<string, string> {
  if (!fs.existsSync(CONFIG_PATH)) return {};
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load gtools config:', e);
    return {};
  }
}

export function getConfigValue(key: string, fallback: string = ''): string {
  const config = loadConfig();
  return config[key] || fallback;
}
