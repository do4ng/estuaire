import { expect } from '../expect/expect';

expect.extend({
  toContain: (received, expected) => {
    if (Array.isArray(received)) {
      return {
        pass: received.includes(expected),
      };
    }

    if (typeof received === 'string') {
      return {
        pass: received.includes(expected as any),
      };
    }

    return {
      pass: false,
    };
  },
});
