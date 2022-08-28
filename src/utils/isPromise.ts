export default function isPromise(fn: any) {
  if (typeof fn !== 'function') {
    if (fn instanceof Promise) return true;
    return false;
  }

  return fn[Symbol.toStringTag] === 'AsyncFunction';
}
