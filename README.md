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
