import { expectFunc as expect } from '../expect/expect';

expect.extend({
  toBe: (received, expected) => ({ pass: received === expected }),
});
