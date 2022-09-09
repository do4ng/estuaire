/* eslint-disable indent */
import glob from 'fast-glob';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, parse } from 'node:path';
import 'colors';
import { execSync } from 'node:child_process';
import { bundle } from '../bundle';
import { Config } from '../config';
import { getHistory, historyData, resetHistory } from '../history';
import { randomString } from '../utils/random';
import { occurError } from '../error';
import terminalCenter from '../utils/output';
import box from '../box';
import * as log from '../log';

function insertSpy(id: string, f: string) {
  let file = readFileSync(join(__dirname, `../temp/test.${id}.js`)).toString();
  file = `/*${id}*/

var __dirname = "${parse(f).dir.replace(/"/g, "'")}";
var __filename = "${f.replace(/"/g, "'")}";
function __estuaire_done() {
  require("fs").writeFileSync("${join(__dirname, '../temp/test.json').replace(
    /\\/g,
    '/'
  )}", JSON.stringify(global.$estuaireHistory)); // return result
}

function __estuaire_init () {
  global.estuaire_tests = [];
  global.estuaire_tests_only = [];
  global.$estuaireHistory = [];
  global.estuaire_enable_tests_only = false;
  global.estuaire_describe_tests = [];
}

async function __estuaire_process() {
  var __estuaire_tests = global.estuaire_tests;

  if (global.estuaire_all_before) await global.estuaire_all_before();

  if (global.estuaire_enable_tests_only) {
    for await (const test of estuaire_tests_only) {
      if (global.estuaire_each_before) await global.estuaire_each_before();
      global.$estuaireHistory.push({ type: "start-describe", title: test.title });
      await test.fn();
      global.$estuaireHistory.push({ type: "end-describe", title: test.title });
      if (global.estuaire_each_after) await global.estuaire_each_after();
    }
  } else {
    for await (const test of __estuaire_tests) {
      if (global.estuaire_each_before) await global.estuaire_each_before();
      global.$estuaireHistory.push({ type: "start-describe", title: test.title });
      await test.fn();
      global.$estuaireHistory.push({ type: "end-describe", title: test.title });
      if (global.estuaire_each_after) await global.estuaire_each_after();
    }
  }
  
  if (global.estuaire_all_after) await global.estuaire_all_after();

  __estuaire_done();
}

__estuaire_init();

${file}

__estuaire_process();
`;
  writeFileSync(join(__dirname, `../temp/test.${id}.js`), file);
}

export function progressWithHistory(file: string, id: string) {
  const splitted = file.split('/');
  const localHistory = getHistory();

  const data = {};
  const total = {
    pass: 0,
    failed: 0,
    failedData: [],
  };

  let openedDescribe = '';

  localHistory.forEach((el) => {
    const history: historyData = typeof el === 'string' ? JSON.parse(el) : el;

    if (history.type === 'start-describe') {
      // init
      data[history.title] = [];

      // set current opened describe block
      openedDescribe = history.title;
    } else if (history.type === 'end-describe') {
      openedDescribe = '';

      const failed = data[history.title].filter((pass) => pass.result === false);

      if (failed.length !== 0) {
        console.log(
          terminalCenter(
            `${' FAIL '.bgRed.white.bold} ${history.title.bold} ${
              `[ ${splitted.slice(0, 2).join('/')}/${splitted.slice(2).join('/').red.bold} ]`.gray
            }`
          )
        );

        total.failed += 1;
      } else {
        total.pass += 1;
      }

      data[history.title].forEach((result) => {
        // failed
        if (!result.result) {
          console.log(`${file}> ${history.title.white.bold} \n`.dim.yellow);

          const occurPos: { x; y } = result.line;

          const bundled = readFileSync(join(__dirname, '../temp', `test.${id}.js`)).toString();
          const lines = bundled.split('\n');

          const errorLines = [lines[occurPos.y - 1], lines[occurPos.y], lines[occurPos.y + 1]];

          errorLines.forEach((line, index) => {
            console.log(`  ${`${index + 1}| `.gray} ${line.italic}`);

            if (index === 0) {
              console.log(`   ${'|'.gray} ${' '.repeat(occurPos.x)}${'^'.red} `);
            }
          });

          console.log();
          occurError(result.data.received, result.data.expected);
          console.log();
        }
      });

      data[history.title] = [];
      openedDescribe = '';
    } else if (!data[openedDescribe]) {
      log.error(
        new Error(
          `Cannot find opened describe (${openedDescribe}). see more - https://github.com/do4ng/estuaire/blob/main/docs/rules.md `
        )
      );
    } else {
      // expect
      data[openedDescribe].push(history);
    }
  });

  return total;
}

export async function core(config: Config) {
  if (existsSync(join(__dirname, '../temp'))) rmSync(join(__dirname, '../temp'), { recursive: true });
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

      insertSpy(random, join(process.cwd(), file).replace(/\\/g, '/'));

      // run
      execSync(`node ${join(__dirname, `../temp/test.${random}`)}.js`, {
        stdio: 'inherit',
      });

      const output = readFileSync(join(__dirname, '../temp/test.json')).toString();

      global.$estuaireHistory = JSON.parse(output);

      // print result
      const result = progressWithHistory(file, random);

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
