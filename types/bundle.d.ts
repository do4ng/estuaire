import { Config } from './config';
export declare function bundle(target: string, config?: Config, out?: string): Promise<{
    path: string;
    source: string;
}>;
