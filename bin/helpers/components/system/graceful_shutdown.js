const logger = require('../../utils/logger');
const { sleep } = require('../../utils/common');

class GracefulShutdown {

  constructor(terminationDelay) {
    this.terminationDelay = terminationDelay;
    this.shutdown = false;
  }

  enable(server) {
    let handler = () => {
      logger.log('gs-enable', 'handler' , 'Termination signal received, try to shut down the server.');
      this.shutdown = true;

      // delay termination
      sleep(this.terminationDelay * 1000).then( () => {

        // close the server
        server.close(() => {
          logger.log('gs-enable', 'close', 'Server closed.');
          process.exit(0);
        });
      });
    };

    process.on('SIGINT', handler);
    process.on('SIGTERM', handler);
  }
}

const readinessProbe = (gs) => (req, res) => {
  if(gs.shutdown) {
    res.send(503, { status: false, data: null, message: 'server is shutting down', code: 503 });
  } else {
    res.send(200, { status: true, data: null, message: 'ok', code: 200 });
  }
};

const livenessProbe = (gs) => (req, res) => {
  res.send(200, { status: true, data: null, message: 'ok', code: 200 });
};

module.exports = {
  GracefulShutdown,
  readinessProbe,
  livenessProbe,
};
