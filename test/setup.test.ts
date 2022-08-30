import { expect } from '../src/expect';
import { describe } from '../src/describe';
import { beforeEach, afterEach } from '../src/setup/setup';

let count = 10;

beforeEach(() => {
  count = 20;
});

afterEach(() => {
  count = 10;
});

describe('count (setup test)', () => {
  expect(count).toBe(20);
});
