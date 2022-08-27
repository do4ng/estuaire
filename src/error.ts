import 'colors';

export function occurError(received: any, expected: any) {
  if (received instanceof Object) received = JSON.stringify(received);
  if (expected instanceof Object) expected = JSON.stringify(expected);

  console.log(` + expected: ${String(expected).bold}`.green);
  console.log(` - received: ${String(received).bold}`.red);
}
