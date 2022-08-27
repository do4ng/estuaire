import { join } from 'path';

export default function matchPath(a: string, b: string): boolean {
  return join(process.cwd(), a) === join(process.cwd(), b);
}
