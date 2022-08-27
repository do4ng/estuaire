# matchers

- [example](../test/matcher.test.ts)
- [custom matcher](./custom-matcher.md)

```ts
describe('matchers', () => {
  const nullValue = null;
  const undefinedValue = undefined;

  // null / undefined

  expect(nullValue).not.toBeDefined();
  expect(nullValue).toBeNull();

  expect(undefinedValue).not.toBeDefined();

  expect(undefinedValue).toBeUndefined();
  expect(nullValue).not.toBeUndefined();

  // string

  const string = 'hello world';

  expect(string).toContain('hello');
  expect(string).toIncludes('hello');

  // array

  const array = ['ping', 'pong'];

  expect(array).toIncludes('ping');
  expect(array).toContain('ping');

  // number

  const number = 2 + 2;

  expect(number).toBeGreaterThan(3);
  expect(number).toBeGreaterThanOrEqual(4);

  expect(number).toBeLessThan(5);
  expect(number).toBeLessThanOrEqual(4);
});
```
