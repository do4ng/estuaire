function createHistory() {
  // if history array not defined
  if (!global.$estuaireHistory) global.$estuaireHistory = [];
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

  global.$estuaireHistory.push(JSON.stringify(data));
}

export function getHistory(): string[] {
  createHistory();

  return global.$estuaireHistory;
}

export function resetHistory() {
  createHistory();

  global.$estuaireHistory = [];
}
