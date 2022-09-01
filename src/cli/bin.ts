#!/usr/bin/env node

import { getConfig } from '../config';
import { core } from '../core/core';
import watch from '../core/watch';
import pkg from '../../package.json';

async function main() {
  const config = await getConfig();
  console.log(`${`v${pkg.version}`.cyan.bold} ${process.cwd().gray}\n`);

  if (config.watch) {
    watch(config);
  } else {
    core(config);
  }
}

main();
