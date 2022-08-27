function createHistory() {
  // if history array not defined
  if (!global.$astoundHistory) global.$astoundHistory = [];
}

export interface historyData {
  type: 'expect' | 'start-describe' | 'end-describe';
  title?: string;
  result?: boolean;
  data?: {
    expected: string;
    received: string;
  };
}

export function pushHistory(data: historyData) {
  createHistory();

  global.$astoundHistory.push(JSON.stringify(data));
}

export function getHistory(): string[] {
  createHistory();

  return global.$astoundHistory;
}

export function resetHistory() {
  createHistory();

  global.$astoundHistory = [];
}
