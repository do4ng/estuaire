/* eslint-disable no-unused-vars */
import { SetupDone } from '../setup';

function setup() {
  if (!global.estuaire_each_before) global.estuaire_each_before = null;
  if (!global.estuaire_each_after) global.estuaire_each_after = null;
}

function beforeEach(fn: (done: SetupDone) => Promise<void> | void) {
  setup();

  global.estuaire_each_before = fn;
}
function afterEach(fn: (done: SetupDone) => Promise<void> | void) {
  setup();

  global.global.estuaire_each_after = fn;
}

export { beforeEach, afterEach };
