# methods

- [`describe.skip`](#skip)
- [`describe.only`](#only)

## skip

```ts
describe.skip('skipped', () => {
  // skipped
  expect(10).toBe(15); // failed
});

describe('skip method', () => {
  expect(10).toBe(10);
});
```

## only

```ts
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
```
