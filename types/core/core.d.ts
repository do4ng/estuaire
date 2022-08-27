import 'colors';
import { Config } from '../config';
export declare function progressWithHistory(file: string): {
    pass: number;
    failed: number;
};
export declare function core(config: Config): Promise<void>;
