import 'colors';
import { removeAnsi } from '../box';

export default function terminalCenter(text: string): string {
  const x = process.stdout.columns;

  let repeatNum = (x - removeAnsi(text).length) / 2 - 2;

  if (repeatNum % 2) {
    repeatNum -= 1;
  }

  return ` ${'='.repeat(repeatNum).gray} ${text} ${'='.repeat(repeatNum).gray} `;
}
