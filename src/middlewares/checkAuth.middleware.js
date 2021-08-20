const jwt = require('jsonwebtoken');
const logger = require('../lib/logger');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    // eslint-disable-next-line max-len
    // jwt.verify verifies and returns decoded token while decode only returns decoded token for the provided input token
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    logger.debug(`Auth Success ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.locals.userData = decoded;
    next();
  } catch (error) {
    logger.error(
      `Auth failed ${req.originalUrl} - ${req.method} - ${req.ip} - ${req.path}`
    );
    return res.status(401).json({
      message: 'Auth failed',
    });
  }
};
