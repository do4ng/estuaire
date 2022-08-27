import { expect } from '../src/expect';
import { describe } from '../src/describe';
import { Expect } from '../src/expect/expect';

interface Matcher<R> extends Expect<R> {
  // eslint-disable-next-line no-unused-vars
  trim: (expected: string) => void;
}

expect.extend({
  trim: (received, expected) => ({
    pass: received.trim() === expected.trim(),
  }),
});

describe('test', () => {
  (expect(' hello ') as Matcher<string>).trim('hello');
});
