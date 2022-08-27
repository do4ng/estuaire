import type esbuild from 'esbuild';
export declare type OutFiles = `out${string}`;
export interface EsbuildConfig extends Omit<esbuild.BuildOptions, 'entryPoints' | 'entryNames' | OutFiles> {
}
export interface Config {
    esbuild?: EsbuildConfig;
    nodeExternal?: boolean;
    includes?: Array<string>;
    excludes?: Array<string>;
    watch?: boolean;
}
export declare const defaultConfig: Config;
export declare const configTargets: string[];
export declare function defineConfig(c: Config): Config;
export declare function getConfig(): Promise<Config>;
