import { expect } from '../src/expect';
import { describe } from '../src/describe';
import { beforeEach, afterEach } from '../src/setup/setup';

let count = 10;

beforeEach(async (done) => {
  count = 20;
  done();
});

afterEach(async () => {
  count = 10;
});

describe('count (setup promise test)', () => {
  expect(count).toBe(20);
});
