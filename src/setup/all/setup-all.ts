function setup() {
  if (!global.estuaire_all_before) global.estuaire_all_before = null;
  if (!global.estuaire_all_after) global.estuaire_all_after = null;
}

function beforeAll(fn: () => Promise<void> | void) {
  setup();

  global.estuaire_all_before = fn;
}
function afterAll(fn: () => Promise<void> | void) {
  setup();

  global.estuaire_all_after = fn;
}

export { beforeAll, afterAll };
