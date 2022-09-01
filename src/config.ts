import type esbuild from 'esbuild';

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { bundle } from './bundle';
import text from './utils/text';

export type OutFiles = `out${string}`;

// esbuild config (without entry, out properties)
export interface EsbuildConfig extends Omit<esbuild.BuildOptions, 'entryPoints' | 'entryNames' | OutFiles> {}

export interface Config {
  // esbuild
  esbuild?: EsbuildConfig;

  // use node-externals plugin
  nodeExternal?: boolean;

  // targets
  includes?: Array<string>;

  // excluded targets
  excludes?: Array<string>;

  // watch
  watch?: boolean;
}

const includes = ['./test/**/*.{test,spec}.{js,ts}', './__test__/**/*.{test,spec}.{js,ts}'];

// default config
export const defaultConfig: Config = {
  esbuild: {},

  includes: [],

  nodeExternal: true,
};

// config files
export const configTargets = ['estuaire.config.ts', 'estuaire.config.js'];

export function defineConfig(c: Config) {
  return c;
}

export async function getConfig(): Promise<Config> {
  let config: Config = defaultConfig;

  await Promise.all(
    configTargets.map(async (target) => {
      target = join(process.cwd(), target);

      if (existsSync(target)) {
        await bundle(target);

        config = (require(text('../temp/out')).default as any) || config;
      }
    })
  );
  if (!config.includes) config.includes = [];

  config.includes.push(...includes);

  return config;
}
