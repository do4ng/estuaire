# custom matcher

[example](../test/customMatcher.test.ts)

```ts
expect.extend({
  trim: (received, expected) => {
    return {
      pass: received.trim() === expected.trim(),
    };
  },
});

describe('test', () => {
  expect(' hello ').trim('hello');
});
```
