import { expect } from '../src/expect';
import { describe } from '../src/describe';

function wait() {
  let count = 0;
  return new Promise((resolve) => {
    setTimeout(() => {
      count += 1;
      resolve(count);
    }, 200);
  });
}

describe('promise', async () => {
  const result = await wait();
  expect(result).toBe(1);
});
