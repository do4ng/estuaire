/* eslint-disable no-useless-return */
import { pushHistory } from './history';
import isPromise from './utils/isPromise';

async function doBefore() {
  let count = 0;
  let doneCount = 0;

  if (global.estuaire_each_before) count += 1;
  if (global.estuaire_all_before) count += 1;

  const done = () => {
    if (doneCount >= count) {
      return;
    }
  };

  const countup = () => {
    doneCount += 1;
    done();
  };

  if (global.estuaire_each_before) {
    const eachBefore = global.estuaire_each_before(countup);

    if (!isPromise(eachBefore)) {
      done();
    }
  }
  if (global.estuaire_all_before) {
    const allBefore = global.estuaire_all_before(countup);

    if (!isPromise(allBefore)) {
      done();
    }
  }
}

async function doAfter() {
  let count = 0;
  let doneCount = 0;

  if (global.estuaire_all_before) count += 1;
  if (global.estuaire_all_after) count += 1;

  const done = () => {
    count += 1;
    if (doneCount >= count) {
      return;
    }
  };

  const countup = () => {
    doneCount += 1;
    done();
  };

  if (global.estuaire_each_after) {
    const eachAfter = global.estuaire_each_after(countup);

    if (!isPromise(eachAfter)) {
      done();
    }
  }
  if (global.estuaire_all_after) {
    const allAfter = global.estuaire_all_after(countup);

    if (!isPromise(allAfter)) {
      done();
    }
  }
}

async function describe(title: string, fn: () => Promise<any> | any) {
  if (!global.$estuaireCount) {
    global.$estuaireCount = 0;
  }

  pushHistory({ type: 'start-describe', title });
  global.$estuaireCount += 1;

  await doBefore();

  const func = fn();

  if (isPromise(func)) {
    global.$estuaireCount -= 2;
    global.$estuaireTesting();

    (func as Promise<any>).then(() => {
      pushHistory({ type: 'end-describe', title });
      global.$estuaireCount -= 1;
    });
  } else {
    pushHistory({ type: 'end-describe', title });
    global.$estuaireCount += 1;
    global.$estuaireTesting();
  }

  await doAfter();
}

export { describe };
