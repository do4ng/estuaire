export interface historyData {
    type: 'expect' | 'start-describe' | 'end-describe';
    title?: string;
    result?: boolean;
    data?: {
        expected: string;
        received: string;
    };
}
export declare function pushHistory(data: historyData): void;
export declare function getHistory(): string[];
export declare function resetHistory(): void;
