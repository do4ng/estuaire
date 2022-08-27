import { equal } from '../equal';
import { expectFunc as expect } from '../expect/expect';

expect.extend({
  toEqual: (received, expected) => ({ pass: equal(received, expected) }),
});
