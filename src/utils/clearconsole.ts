/* eslint-disable no-octal-escape */
export default function clearConsole() {
  process.stdout.write('\u001b[2J\u001b[0;0H');
}
