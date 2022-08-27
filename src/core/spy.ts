import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export default function spy() {
  global.estuaire = {
    version: JSON.parse(readFileSync(join(__dirname, '../package.json')).toString()).version,
  };
}
