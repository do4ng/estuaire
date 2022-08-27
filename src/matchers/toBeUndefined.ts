import { expectFunc as expect } from '../expect/expect';

expect.extend({
  toBeUndefined: (received) => ({ pass: received === undefined }),
});
