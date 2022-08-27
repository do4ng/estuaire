export interface CustomMatcherOutput {
    pass: boolean;
    message?: string;
}
export interface Expect<T> {
    not: Expect<T>;
    toBeTruthy: () => void;
    toBeFalsy: () => void;
    toBeUndefined: () => void;
    toBeDefined: () => void;
    toBeNull: () => void;
    toBe: (expected: T) => void;
    toEqual: (expected: T) => void;
    toMatch: (expected: T) => void;
    toIncludes: (expected: T) => void;
    toContain: (expected: T) => void;
}
export interface MatchersObject {
    [key: string]: <T>(received: T | any, expected: T | any) => CustomMatcherOutput;
}
export declare let matchers: {};
declare function expectFunc<T>(received: T): Expect<T>;
declare namespace expectFunc {
    var extend: (matcher: MatchersObject) => void;
    var matchers: () => {};
}
export { expectFunc };
