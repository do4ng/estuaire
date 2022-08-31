# setup

## `before/after each`

[example](../test/setup.test.ts)

```ts
import { beforeEach, afterEach, expect, describe } from 'estuaire';

let count = 10;

// promise
beforeEach(async () => {
  count = 20;
});

afterEach(async () => {
  count = 10;
});

describe('count', () => {
  expect(count).toBe(20);
});
```

## `before/after all`

[example](../test/setup-all.test.ts)

```ts
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
```
