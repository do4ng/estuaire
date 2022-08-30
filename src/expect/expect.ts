/* eslint-disable no-unused-vars */
/* eslint-disable import/no-mutable-exports */

import { pushHistory } from '../history';

export interface CustomMatcherOutput {
  pass: boolean;
  message?: string;
}

export interface Expect<T> {
  not: Omit<Expect<T>, 'not'>;

  toBeTruthy: () => void;
  toBeFalsy: () => void;
  toBeUndefined: () => void;
  toBeDefined: () => void;
  toBeNull: () => void;

  toBe: (expected: T) => void; // any
  toEqual: (expected: T) => void; // any

  toMatch: (expected: any) => void; // string
  toIncludes: (expected: any) => void; // array or string

  toContain: (expected: any) => void; // array

  toBeGreaterThan: (expected: number) => void;
  toBeGreaterThanOrEqual: (expected: number) => void;
  toBeLessThan: (expected: number) => void;
  toBeLessThanOrEqual: (expected: number) => void;

  toBeInstanceOf: (expected: any) => void;
}

export interface MatchersObject {
  [key: string]: <T>(received: T | any, expected: T | any) => CustomMatcherOutput;
}

export let matchers = {};

function expectFunc<T>(received: T): Expect<T> {
  let customMatchers = {};
  let notMatchers = {};

  Object.keys(matchers as Expect<T>).forEach((customMatcher) => {
    customMatchers = {
      ...customMatchers,
      [customMatcher]: (expected) => {
        const result = (matchers as Expect<T>)[customMatcher](received, expected);

        if (received instanceof Object) received = JSON.stringify(received) as any;
        if (expected instanceof Object) expected = JSON.stringify(expected) as any;

        pushHistory({ type: 'expect', result: result.pass, data: { received: received as any, expected } });

        return result;
      },
    };

    // not
    notMatchers = {
      ...notMatchers,
      [customMatcher]: (expected) => {
        const result = (matchers as Expect<T>)[customMatcher](received, expected);

        result.pass = !result.pass;

        if (received instanceof Object) received = JSON.stringify(received) as any;
        if (expected instanceof Object) expected = JSON.stringify(expected) as any;

        pushHistory({ type: 'expect', result: result.pass, data: { received: received as any, expected } });

        return result;
      },
    };
  });

  customMatchers = {
    ...customMatchers,
    not: notMatchers,
  };

  return customMatchers as Expect<T>;
}

expectFunc.extend = (matcher: MatchersObject) => {
  matchers = {
    ...matchers,
    ...matcher,
  };
};

expectFunc.matchers = () => matchers;

export { expectFunc };
