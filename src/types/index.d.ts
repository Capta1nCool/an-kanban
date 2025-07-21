interface AmplenoteTask {
  uuid: string;
  content: string;
  deadline?: number;
  startAt?: number | null;
  endAt?: number;
  completedAt?: number;
  dismissedAt?: number;
  hideUntil?: number | null;
  important: boolean;
  urgent: boolean;
  noteUUID: string;
  score: number;
}

declare global {
  interface Window {
    callAmplenotePlugin: (method: string, uuid: string) => AmplenoteTask;
  }
}
