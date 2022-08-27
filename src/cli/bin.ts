#!/usr/bin/env node

import { getConfig } from '../config';
import { core } from '../core/core';

async function main() {
  core(await getConfig());
}

main();
