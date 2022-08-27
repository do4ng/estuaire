import { expectFunc as expect } from '../expect/expect';

expect.extend({
  toBeLessThan: (received, expected) => ({ pass: received < expected }),
});
