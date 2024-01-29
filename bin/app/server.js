const project = require('../../package.json');
const configs = require('../helpers/configs/global_config');
const { GracefulShutdown, livenessProbe, readinessProbe } = require('../helpers/components/system/graceful_shutdown');
const observers = require('./observers');
const multer = require("multer");
const upload = multer({ dest: configs.get("/storage").location });
const express = require('express');
const bodyParser = require('body-parser');

class AppServer {

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(upload.any());

    this.app.get('/', (req, res) => {
      res.json({ status: true, data: null, message: 'server is running...', code: 200 })
    });

    this.init();
  }

  async listen(port, cb) {
    this.server = this.app.listen(port, cb);
  }

  async init() {
    // Initiation
    try {
      await Promise.all([observers.init()]);

      const gs = new GracefulShutdown(configs.get('/system/shutdownDelay'));
      gs.enable(this.server);
      this.app.get('/healthz', livenessProbe(gs));
      this.app.get('/readyz', readinessProbe(gs));
      this.app.use((req, res) => {
        res.status(404).json({ status: false, data: null, message: 'invalid request', code: 404 });
      });
    } catch (err) {
      this.server.close();
      throw err;
    }
  }
}

module.exports = AppServer;
