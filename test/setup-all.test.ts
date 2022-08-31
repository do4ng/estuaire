import { expect } from '../src/expect';
import { describe } from '../src/describe';
import { beforeAll, afterAll } from '../src/setup/setup';

let count = 10;

beforeAll(() => {
  count += 1;
});

afterAll(() => {
  count = 10;
});

describe('setup all', () => {
  expect(count).toBe(11);
});

describe('setup all (2)', () => {
  expect(count).toBe(11);
});
