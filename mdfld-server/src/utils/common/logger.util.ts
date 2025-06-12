import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { existsSync, mkdirSync } from 'fs';

// Set the log directory
const logDir = 'log';

// Create the directory if it does not exist (only in production)
if (process.env.NODE_ENV === 'PROD' && !existsSync(logDir)) {
  mkdirSync(logDir);
}

// Configure transport for daily rotating logs (only in production)
const transport =
  process.env.NODE_ENV === 'PROD'
    ? new DailyRotateFile({
        filename: `${logDir}/Application-error-%DATE%.log`,
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'error',
      })
    : null;

// Define the log formatter
const logFormatter = format.printf((info) => {
  let { timestamp, level, code, stack, message } = info;

  // Print out HTTP error code with a space if present
  code = code ? ` ${code}` : '';
  // Print the stack trace if available, otherwise print the message
  message = stack || message;

  return `${timestamp} ${level}${code}: ${message}`;
});

// Create the logger
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), logFormatter),
  transports: [
    new transports.Console(), // Always log to console
    ...(process.env.NODE_ENV === 'PROD' && transport ? [transport] : []),
  ],
});

export default logger;
