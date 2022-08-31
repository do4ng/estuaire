import { expect } from '../src/expect';
import { describe } from '../src/describe';

describe.skip('skipped', () => {
  // skipped
  expect(10).toBe(15); // failed
});

describe('skip method', () => {
  expect(10).toBe(10);
});
