# estuaire

super fast javascript testing tool

[github](https://github.com/do4ng/estuaire)

## Features

- ⚡ lightning fast
- 🎨 extensible expect
- 🦄 typescript supported
- 🛠️ not required config

## Usage

```bash
yarn add -D estuaire
```

```diff
"scripts": {
+  "test": "estuaire"
}
```

```ts
// test/index.test.ts
import { expect, describe } from 'estuaire';

describe('sum', () => {
  expect(1 + 2).toBe(3);
});
```

## Matcher

```ts
const nullValue = null;
const undefinedValue = undefined;
const array = ['ping', 'pong'];
const string = 'hello world';
const number = 2 + 2;

// matchers
expect('hello').toBe('hello');
expect({ a: 10 }).toEqual({ a: 10 });

// truthiness

expect(nullValue).not.toBeDefined();
expect(nullValue).toBeNull();
expect(nullValue).not.toBeUndefined();

expect(undefinedValue).not.toBeDefined();
expect(undefinedValue).toBeUndefined();

// string

expect(string).toContain('hello');
expect(string).toIncludes('hello');

// array

expect(array).toIncludes('ping');
expect(array).toContain('ping');

// number

expect(number).toBeGreaterThan(3);
expect(number).toBeGreaterThanOrEqual(4);
expect(number).toBeLessThan(5);
expect(number).toBeLessThanOrEqual(4);
```

## License

MIT
