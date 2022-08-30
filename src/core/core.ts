/* eslint-disable indent */
import glob from 'fast-glob';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import 'colors';
import { execSync } from 'node:child_process';
import { bundle } from '../bundle';
import { Config } from '../config';
import { getHistory, historyData, resetHistory } from '../history';
import { randomString } from '../utils/random';
import { occurError } from '../error';
import terminalCenter from '../utils/output';
import box from '../box';
import log from '../log';

function insertSpy(id: string) {
  let file = readFileSync(join(__dirname, `../temp/test.${id}.js`)).toString();
  file = `/*${id}*/

function __estuaire_done() {
  require("fs").writeFileSync("${join(__dirname, '../temp/test.json').replace(
    /\\/g,
    '/'
  )}", JSON.stringify(global.$estuaireHistory)); // return result
}

global.$estuaireTesting = function () {
  const __estuaire_start_count = global.$estuaireCount;

  // promise func
  if (__estuaire_start_count <= 0) {
    const __estuaire_interval = setInterval(() => {
      __estuaire_done();
      if (global.$estuaireCount === __estuaire_start_count * 2) {
        clearInterval(__estuaire_interval);
        global.$estuaireCount = 0;
      }
    }, 10)
  } else {
    __estuaire_done();
  }
}
/*core*/

${file}
`;
  writeFileSync(join(__dirname, `../temp/test.${id}.js`), file);
}

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
          console.log(`> ${history.title} (index: ${(index + 1).toString().bold})`.gray);

          occurError(result.data.received, result.data.expected);
        }
      });
    } else if (!data[openedDescribe]) {
      log.error(
        new Error('Cannot find opened describe. see more - https://github.com/do4ng/estuaire/blob/main/docs/rules.md ')
      );
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

  console.log();

  await Promise.all(
    dir.map(async (file) => {
      const random = randomString(6);

      // bundle file
      await bundle(file, config, `test.${random}.js`);

      insertSpy(random);

      // run
      execSync(`node ${join(process.cwd(), `./temp/test.${random}`)}.js`, {
        stdio: 'inherit',
      });

      const output = readFileSync(join(__dirname, '../temp/test.json')).toString();

      global.$estuaireHistory = JSON.parse(output);

      // print result
      const result = progressWithHistory(file);

      total.failed += result.failed;
      total.pass += result.pass;

      // remove history
      resetHistory();
      rmSync(join(__dirname, `../temp/test.${random}.js`));
    })
  );

  console.log();

  const printResult = [];

  printResult.push();
  printResult.push(`${'pass'.green}: ${total.pass.toString().bold}`);
  printResult.push(`${'failed'.red}: ${total.failed.toString().bold}`);

  printResult.push(`Done in ${String(((performance.now() - startTime) / 1000).toFixed(2)).cyan.bold}s`);
  printResult.push();

  box(printResult.join('\n'), { padding: 2 });

  console.log();
}
