import { expect } from '../src/expect';
import { describe } from '../src/describe';

describe('skipped', () => {
  // skipped
  expect(10).toBe(15); // failed
});

describe.only('only method', () => {
  expect(10).toBe(10);
});

describe.only('only method (2)', () => {
  expect(10).toBe(10);
});
