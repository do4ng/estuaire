export interface BoxOptions {
    padding: number;
}
export declare function removeAnsi(string: string): string;
export default function box(text: string, opts: BoxOptions): void;
