import { expect } from '../expect/expect';

expect.extend({
  toBeNull: (received) => ({ pass: received === null }),
});
