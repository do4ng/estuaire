export interface BoxOptions {
  padding: number;
}

const data = ['─', '│', '┌', '┐', '└', '┘'].map((d) => d.gray);

export function removeAnsi(string: string): string {
  // eslint-disable-next-line no-control-regex
  return string.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

export default function box(text: string, opts: BoxOptions): void {
  const texts = text.split('\n');

  let maxWidth = 0;

  texts.forEach((t) => {
    if (t.length > maxWidth) maxWidth = removeAnsi(t).length;
  });

  maxWidth += 2;

  console.log(`${data[2]}${data[0].repeat(maxWidth + opts.padding)}${data[3]}`);

  texts.forEach((t) => {
    const lastT = t;
    t = removeAnsi(t);
    console.log(
      `${data[1]}${' '.repeat(opts.padding)}${lastT}${' '.repeat(maxWidth + 2 - t.length - opts.padding)}${data[1]}`
    );
  });
  console.log(`${data[4]}${data[0].repeat(maxWidth + opts.padding)}${data[5]}`);
}
