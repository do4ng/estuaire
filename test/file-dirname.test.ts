import { parse } from 'path';
import { expect } from '../src/expect';
import { describe } from '../src/describe';

describe('__filename', async () => {
  expect(parse(__filename).base).toBe('file-dirname.test.ts');
});
describe('__dirname', async () => {
  expect(parse(__dirname).base).toBe('test');
});
