export function color(text: string, code: number) {
  return `\x1b[${code}m${text}\x1b[0m`;
}
