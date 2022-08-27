import 'colors';
declare function parseError(err: Error): {
    at: string;
    loc: string;
}[];
declare function error(err: Error | string): void;
declare function warn(message: string): void;
declare function success(message: string): void;
declare function info(message: string): void;
declare const _default: {
    success: typeof success;
    info: typeof info;
    error: typeof error;
    warn: typeof warn;
    parseError: typeof parseError;
};
export default _default;
