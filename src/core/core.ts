import glob from 'fast-glob';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import 'colors';
import { bundle } from '../bundle';
import { Config } from '../config';
import { getHistory, historyData, resetHistory } from '../history';
import { randomString } from '../utils/random';
import text from '../utils/text';
import { occurError } from '../error';
import terminalCenter from '../utils/center';
import box from '../box';
import log from '../log';

function insertSpy(id: string) {
  let file = readFileSync(join(__dirname, `../temp/test.${id}.js`)).toString();
  file = `/*${id}*/

${file}`;
  writeFileSync(join(__dirname, `../temp/test.${id}.js`), file);
}

const req = (t) => {
  require(text(t));
};

export function progressWithHistory(file: string) {
  const localHistory = getHistory();

  const data = {};
  const total = {
    pass: 0,
    failed: 0,
  };

  let openedDescribe = '';

  localHistory.forEach((el) => {
    const history: historyData = JSON.parse(el);

    if (history.type === 'start-describe') {
      // init
      data[history.title] = [];

      // set current opened describe block
      openedDescribe = history.title;
    } else if (history.type === 'end-describe') {
      openedDescribe = '';

      if (data[history.title].filter((pass) => pass.result === false).length !== 0) {
        console.log(terminalCenter(`${' FAILED '.bgRed.white.bold} ${history.title.bold} ${`(${file})`.gray}`));

        total.failed += 1;
      } else {
        console.log(terminalCenter(`${' PASS '.bgGreen.white.bold} ${history.title.bold} ${`(${file})`.gray}`));

        total.pass += 1;
      }

      data[history.title].forEach((result, index) => {
        // failed
        if (!result.result) {
          console.log(`> ${history.title} (index: ${index.toString().bold})`.gray);

          occurError(result.data.received, result.data.expected);
        }
      });
      console.log();
    } else if (!data[openedDescribe]) {
      log.error(new Error('Cannot find opened describe'));
    } else {
      // expect
      data[openedDescribe].push(history);
    }
  });

  return total;
}

export async function core(config: Config) {
  const total = {
    pass: 0,
    failed: 0,
  };
  const startTime = performance.now(); // timer start

  const dir = await glob(config.includes);

  await Promise.all(
    dir.map(async (file) => {
      const random = randomString(6);

      // bundle file
      await bundle(file, config, `test.${random}.js`);

      insertSpy(random);

      // run
      req(`../temp/test.${random}`);

      // print result
      const result = progressWithHistory(file);

      total.failed += result.failed;
      total.pass += result.pass;

      // remove history
      resetHistory();
      rmSync(join(__dirname, `../temp/test.${random}.js`));
    })
  );

  const printResult = [];

  printResult.push();
  printResult.push(`${'pass'.green}: ${total.pass.toString().bold}`);
  printResult.push(`${'failed'.red}: ${total.failed.toString().bold}`);

  printResult.push(`Done in ${String(((performance.now() - startTime) / 1000).toFixed(2)).cyan.bold}s`);
  printResult.push();

  box(printResult.join('\n'), { padding: 2 });

  console.log();
}
