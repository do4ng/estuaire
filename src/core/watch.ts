/* eslint-disable no-unused-expressions */
import chokidar from 'chokidar';
import glob from 'fast-glob';
import { Config } from '../config';
import matchPath from '../utils/matchPath';
import { core } from './core';

export default function watch(config: Config): void {
  chokidar.watch(config.includes, { cwd: process.cwd() }).on('change', async (path) => {
    const dir = await glob(config.includes, { cwd: process.cwd() });

    dir.filter((d) => matchPath(d, path));

    if (dir.length !== 0) core(config);
  });
}
