import { parseError } from '../log';

export default function getLine(err: Error) {
  if (!err.stack) return { x: -1, y: -1 };

  const splitted = parseError(err)[1].loc.slice(1, -1).split(':');

  return {
    x: Number(splitted[splitted.length - 1]),
    y: Number(splitted[splitted.length - 2]),
  };
}
