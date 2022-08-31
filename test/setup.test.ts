import { expect } from '../src/expect';
import { describe } from '../src/describe';
import { beforeEach } from '../src/setup/setup';

let count = 10;

beforeEach(() => {
  count += 1;
});

describe('setup each', () => {
  expect(count).toBe(11);
});

describe('setup each (2)', () => {
  expect(count).toBe(12);
});
