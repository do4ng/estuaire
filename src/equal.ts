// {a: {b: {c: 1, d: 2}}}
// to
// [{'a.b.c': 1}, {'a.b.d': 2}]
export function objectToArray(target: object, base: string = ''): object[] {
  const data = [];

  Object.keys(target).forEach((el) => {
    // object
    if (target[el] instanceof Object && Object.keys(target[el]).length !== 0) {
      data.push(...objectToArray(target[el], `${base}${base === '' ? '' : '.'}${el}`));
    } else {
      const v = {};
      v[`${base}${base === '' ? '' : '.'}${el}`] = target[el];
      data.push(v);
    }
  });

  return data;
}

export function equal<T>(received: T, expected: T, strict: boolean = false): boolean {
  if (typeof received !== typeof expected) return false;

  const type = typeof received;

  if (
    type === 'string' ||
    type === 'function' ||
    type === 'undefined' ||
    type === 'number' ||
    type === 'boolean' ||
    type === 'bigint'
  ) {
    return received === expected;
  }

  if (type === 'object' && Array.isArray(received)) {
    // Array

    const remains = [];

    received.forEach((el) => {
      if (strict) remains.push(el);
      else if (el !== undefined) {
        remains.push(el);
      }
    });

    (expected as typeof received).forEach((el, index) => {
      if (el === undefined && strict) return;

      if (remains.includes(el)) {
        remains[remains.indexOf(el)] = null;
        expected[index] = null;
      }
    });

    console.log(remains, expected);

    return (
      remains.filter((arg) => arg !== null).length === 0 && (expected as any).filter((arg) => arg !== null).length === 0
    );
  }
  if (type === 'object' && received instanceof Object) {
    // Object

    const remainsReceived = objectToArray(received as any);
    const remainsExpected = objectToArray(expected as any);

    remainsExpected.forEach((exp, index) => {
      const key = Object.keys(exp)[0];
      const value = exp[key];

      remainsReceived.forEach((rm, reIndex) => {
        if (rm === null) return;

        if (Object.keys(rm)[0] === key) {
          if (rm[Object.keys(rm)[0]] === value) {
            remainsReceived[reIndex] = null;
            remainsExpected[index] = null;
          } else if (Object.keys(rm[Object.keys(rm)[0]]).length === 0 && Object.keys(value).length === 0) {
            remainsReceived[reIndex] = null;
            remainsExpected[index] = null;
          }
        }
      });
    });

    return (
      remainsReceived.filter((arg) => arg !== null).length === 0 &&
      (remainsExpected as typeof remainsReceived).filter((arg) => arg !== null).length === 0
    );
  }

  return false;
}
