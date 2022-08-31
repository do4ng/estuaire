async function describe(title: string, fn: () => Promise<any> | any) {
  global.estuaire_tests.push({ title, fn });
}

// eslint-disable-next-line no-unused-vars
describe.skip = (title: string, fn: () => Promise<any> | any) => {
  // skip
};

describe.only = (title: string, fn: () => Promise<any> | any) => {
  global.estuaire_enable_tests_only = true;
  global.estuaire_tests_only.push({ title, fn });
};

export { describe };
