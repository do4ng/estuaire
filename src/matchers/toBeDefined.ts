import { expect } from '../expect/expect';

expect.extend({
  toBeDefined: (received) => ({ pass: received !== null && received !== undefined }),
});
