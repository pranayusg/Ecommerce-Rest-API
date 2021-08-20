const morgan = require('morgan');
const logger = require('../lib/logger');

const stream = {
  write: (message) =>
    logger.http(message.slice(0, -1).replace(/\u001b\[[0-9]{1,2}m/g, '')),
};

const morganMiddleware = morgan('dev', { stream });

module.exports = morganMiddleware;
