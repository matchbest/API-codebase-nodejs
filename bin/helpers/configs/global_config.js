require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  appEnv: process.env.APP_ENV,
  system: {
    shutdownDelay: parseInt(process.env.SYSTEM_SHUTDOWN_DELAY) || 500,
  },
  storage: {
    location: process.env.STORAGE_LOCATION,
  },
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
