const http = require('http');
const app = require('./app');
const logger = require('./src/lib/logger');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  logger.debug(`Server started and running on port : ${port}`);
});
