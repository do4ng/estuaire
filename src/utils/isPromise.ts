export default function isPromise(fn: Function) {
  return fn.constructor.name === 'AsyncFunction';
}
