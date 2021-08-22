const Sequelize = require('sequelize');

const logger = require('../lib/logger');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
    port: process.env.DB_PORT,
    logging: false,
    // pool: { maxConnections: 5, maxIdleTime: 30 },
  }
);

sequelize
  .authenticate()
  .then(() => {
    logger.debug('Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database: ', err);
  });

module.exports = sequelize;
