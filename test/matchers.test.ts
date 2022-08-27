import { expect } from '../src/expect';
import { describe } from '../src/describe';

describe('matchers', () => {
  const nullValue = null;
  const undefinedValue = undefined;

  // null / undefined

  expect(nullValue).not.toBeDefined();
  expect(nullValue).toBeNull();

  expect(undefinedValue).not.toBeDefined();

  expect(undefinedValue).toBeUndefined();
  expect(nullValue).not.toBeUndefined();

  // string

  const string = 'hello world';

  expect(string).toContain('hello');
  expect(string).toIncludes('hello');

  // array

  const array = ['ping', 'pong'];

  expect(array).toIncludes('ping');
  expect(array).toContain('ping');

  // todo: add number functions

  // not.not
  // expect().not.not; => error
});
