import { expect } from '../expect/expect';

expect.extend({
  toBeInstanceOf: (received, expected) => ({ pass: received instanceof expected }),
});
