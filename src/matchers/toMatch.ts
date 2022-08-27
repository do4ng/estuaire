import { expectFunc as expect } from '../expect/expect';

expect.extend({
  // @ts-ignore
  toMatch: (received: string, expected: RegExp) => ({
    pass: expected.test(received),
  }),
});
