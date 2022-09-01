import { expect } from '../expect/expect';

expect.extend({
  toBeGreaterThanOrEqual: (received, expected) => ({ pass: received >= expected }),
});
