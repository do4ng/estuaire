/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-expressions */
import chokidar from 'chokidar';
import glob from 'fast-glob';
import { cursorTo, emitKeypressEvents } from 'readline';
import { Config } from '../config';
import matchPath from '../utils/matchPath';
import { core } from './core';

const getPos = () =>
  new Promise((resolve) => {
    const termcodes = { cursorGetPosition: '\u001b[6n' };

    process.stdin.setEncoding('utf8');
    process.stdin.setRawMode(true);

    const readfx = function () {
      const buf = process.stdin.read();
      const str = JSON.stringify(buf); // "\u001b[9;1R"
      const regex = /\[(.*)/g;
      const xy = regex.exec(str)[0].replace(/\[|R"/g, '').split(';');
      const pos = { rows: xy[0], cols: xy[1] };
      process.stdin.setRawMode(false);
      resolve(pos);
    };

    process.stdin.once('readable', readfx);
    process.stdout.write(termcodes.cursorGetPosition);
  });

async function controller() {
  console.log(`press ${'q'.white} to quit`);
  emitKeypressEvents(process.stdin);

  if (process.stdin.isTTY) process.stdin.setRawMode(true);
  process.stdin.on('keypress', (chunk, key) => {
    if (key && key.name === 'q') process.exit(1);
  });
}

export default async function watch(config: Config): Promise<void> {
  await core(config); // init
  await controller();

  chokidar.watch(config.includes, { cwd: process.cwd() }).on('all', async (method, path) => {
    if (method === 'change') {
      cursorTo(process.stdout, 0, ((await getPos()) as any).rows - 2);
      process.stdout.clearLine(0);
      const dir = await glob(config.includes, { cwd: process.cwd() });

      dir.filter((d) => matchPath(d, path));

      if (dir.length !== 0) {
        console.log();
        console.log('_'.repeat(process.stdout.columns).gray);
        console.log('\n');

        await core(config);
        await controller();
      }
    }
  });
}
