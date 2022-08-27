# rules

`expect()` of estuaire relies on `describe()` (not files).
So `expect()` requires `describe()`

```ts
expect(1 + 2).toBe(3); // error!

describe('good', () => {
  expect(1 + 2).toBe(3); // good!
});
```
