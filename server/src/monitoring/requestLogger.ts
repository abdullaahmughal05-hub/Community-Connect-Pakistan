
import { Request, Response, NextFunction } from "express";

export interface ApiLog {
  id: number;
  method: string;
  path: string;
  statusCode: number;
  responseTime: number;
  timestamp: string;
}

const MAX_LOGS = 500;
const apiLogs: ApiLog[] = [];

let totalRequests = 0;
let successfulRequests = 0;
let failedRequests = 0;

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Do not log monitoring polling requests.
  if (req.path.startsWith("/api/monitoring")) {
    return next();
  }

  const startTime = Date.now();

  totalRequests++;

  res.on("finish", () => {
    const responseTime = Date.now() - startTime;
    const statusCode = res.statusCode;

    if (statusCode >= 200 && statusCode < 400) {
      successfulRequests++;
    } else {
      failedRequests++;
    }

    const log: ApiLog = {
      id: totalRequests,
      method: req.method,
      path: req.path,
      statusCode,
      responseTime,
      timestamp: new Date().toISOString(),
    };

    apiLogs.unshift(log);

    if (apiLogs.length > MAX_LOGS) {
      apiLogs.pop();
    }

    console.log(
      `[API] ${req.method} ${req.path} | ${statusCode} | ${responseTime}ms`
    );
  });

  next();
};

export const getApiLogs = () => apiLogs;

export const getApiStats = () => ({
  totalRequests,
  successfulRequests,
  failedRequests,
  averageResponseTime:
    apiLogs.length > 0
      ? Math.round(
          apiLogs.reduce((sum, log) => sum + log.responseTime, 0) /
            apiLogs.length
        )
      : 0,
});
