import { pushHistory } from './history';
import isPromise from './utils/isPromise';

async function describe(title: string, fn: () => Promise<any> | any) {
  if (!global.$estuaireCount) {
    global.$estuaireCount = 0;
  }
  pushHistory({ type: 'start-describe', title });
  global.$estuaireCount += 1;
  const func = fn();
  if (isPromise(func)) {
    global.$estuaireCount -= 2;
    (func as Promise<any>).then(() => {
      pushHistory({ type: 'end-describe', title });
      global.$estuaireCount -= 1;
    });
  } else {
    pushHistory({ type: 'end-describe', title });
    global.$estuaireCount += 1;
  }
}

export { describe };
