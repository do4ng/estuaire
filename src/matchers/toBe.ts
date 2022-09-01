import { expect } from '../expect/expect';

expect.extend({
  toBe: (received, expected) => ({ pass: received === expected }),
});
