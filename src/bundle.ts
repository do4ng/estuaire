import esbuild from 'esbuild';
import externals from 'esbuild-node-externals';

import path from 'node:path';
import { readFileSync } from 'node:fs';

import log from './log';
import { Config } from './config';

export function bundle(target: string, config?: Config, out?: string): Promise<{ path: string; source: string }> {
  return new Promise((resolve, reject) => {
    if (!config) config = {};

    const dist = path.join(__dirname, '../', 'temp');
    const cfg: any = {
      entryPoints: [target],
      outfile: path.join(dist, out || 'out.js'),

      bundle: true,
      minify: true,

      platform: 'node',

      // customized esbuild config
      ...(config.esbuild || {}),
    };

    if (!cfg.plugins) cfg.plugins = [];

    if (config.nodeExternal || typeof config.nodeExternal === 'undefined') cfg.plugins.push(externals());

    esbuild
      .build(cfg)
      .then((value) => {
        value.errors.forEach((error) => {
          log.error(`[esbuild] ${error.text} - ${error.detail} ( at ${error.location} )`);
        });

        resolve({
          path: path.join(dist, out || 'out.js'),
          source: readFileSync(path.join(dist, out || 'out.js'), 'utf-8'),
        });
      })
      .catch((err) => reject(err));
  });
}
