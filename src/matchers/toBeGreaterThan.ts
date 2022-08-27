import { expectFunc as expect } from '../expect/expect';

expect.extend({
  toBeGreaterThan: (received, expected) => ({ pass: received > expected }),
});
