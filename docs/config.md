# Config

```ts
// estuaire.config.ts
import { defineConfig } from 'estuaire';

export default defineConfig({
  // ...
});
```

```ts
export interface Config {
  esbuild?: EsbuildConfig; // esbuild config
  nodeExternal?: boolean;
  includes?: Array<string>; // include files/directorys
  excludes?: Array<string>; // exclude files/directorys
  watch?: boolean; // develop in progress
}
```
