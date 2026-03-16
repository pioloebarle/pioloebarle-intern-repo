import { log } from "./debugLogger";

interface NetworkLog {
  method: string;
  url: string;
  status?: number;
  duration: number;
  timestamp: string;
}

const requestLogs: NetworkLog[] = [];
const maxLogs = 50;

export const networkDebugger = {
  logRequest: (method: string, url: string) => {
    const timestamp = new Date().toLocaleTimeString();
    log.network(method, url);
    return { startTime: Date.now(), timestamp };
  },

  logResponse: (
    method: string,
    url: string,
    status: number,
    startTime: number,
  ) => {
    const duration = Date.now() - startTime;
    log.network(method, url, status);
    log.debug(`Network`, `⏱️ Response time: ${duration}ms`);

    addLog({
      method,
      url,
      status,
      duration,
      timestamp: new Date().toLocaleTimeString(),
    });
  },

  logError: (method: string, url: string, error: any, startTime: number) => {
    const duration = Date.now() - startTime;
    log.error(`Network: ${method} ${url}`, error);
    addLog({
      method,
      url,
      duration,
      timestamp: new Date().toLocaleTimeString(),
    });
  },

  getLogs: () => requestLogs,

  clearLogs: () => {
    requestLogs.length = 0;
    log.info("Network logs cleared");
  },
};

function addLog(log: NetworkLog) {
  requestLogs.push(log);
  if (requestLogs.length > maxLogs) {
    requestLogs.shift(); // Remove oldest log
  }
}

export default networkDebugger;
