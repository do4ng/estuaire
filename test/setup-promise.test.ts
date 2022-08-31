import { expect } from '../src/expect';
import { describe } from '../src/describe';
import { beforeEach, afterEach } from '../src/setup/setup';

let count = 10;

beforeEach(async () => {
  count = 20;
});

afterEach(async () => {
  count = 10;
});

describe('count (setup promise test)', () => {
  expect(count).toBe(20);
});
