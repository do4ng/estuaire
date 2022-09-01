import { expect } from '../expect/expect';

expect.extend({
  toBeLessThanOrEqual: (received, expected) => ({ pass: received <= expected }),
});
