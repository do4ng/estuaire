import { expectFunc as expect } from '../expect/expect';

expect.extend({
  toBeFalsy: (received) => ({ pass: (received as any) === false }),
});
