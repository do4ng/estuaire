import { expect } from '../expect/expect';

expect.extend({
  toBeTruthy: (received) => ({ pass: (received as any) === true }),
});
