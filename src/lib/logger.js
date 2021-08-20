const { createLogger, format, addColors, transports } = require('winston');

const { combine, timestamp, colorize, printf } = format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || 'dev';
  const isDev = env === 'dev';
  return isDev ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

addColors(colors);

const customFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const options = {
  console: {
    format: combine(colorize({ all: true }), customFormat),
  },
  error: {
    filename: 'logs/error.log',
    level: 'error',
    format: customFormat,
    decolorize: true,
  },
  all: {
    filename: 'logs/all.log',
    format: customFormat,
    decolorize: true,
  },
};

const customTransports = [
  new transports.Console(options.console),
  new transports.File(options.error),
  new transports.File(options.all),
];

const Logger = createLogger({
  level: level(),
  levels,
  transports: customTransports,
});

module.exports = Logger;
