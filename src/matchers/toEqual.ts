import { equal } from '../equal';
import { expect } from '../expect/expect';

expect.extend({
  toEqual: (received, expected) => ({ pass: equal(received, expected) }),
});
