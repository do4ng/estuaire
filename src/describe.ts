import { pushHistory } from './history';
import isPromise from './utils/isPromise';

async function describe(title: string, fn: () => Promise<void> | void) {
  pushHistory({ type: 'start-describe', title });

  if (isPromise(fn)) {
    await fn();
  } else {
    fn();
  }

  pushHistory({ type: 'end-describe', title });
}

export { describe };
