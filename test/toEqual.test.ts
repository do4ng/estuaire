import { expect } from '../src/expect';
import { describe } from '../src/describe';

describe('to Equal', () => {
  expect({}).toEqual({});
  expect({ hello: true }).toEqual({ hello: true });
  expect({ hello: true, world: true }).toEqual({ world: true, hello: true });
});
