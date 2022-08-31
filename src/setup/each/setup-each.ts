function setup() {
  if (!global.estuaire_each_before) global.estuaire_each_before = null;
  if (!global.estuaire_each_after) global.estuaire_each_after = null;
}

function beforeEach(fn: () => Promise<void> | void) {
  setup();

  global.estuaire_each_before = fn;
}
function afterEach(fn: () => Promise<void> | void) {
  setup();

  global.estuaire_each_after = fn;
}

export { beforeEach, afterEach };
