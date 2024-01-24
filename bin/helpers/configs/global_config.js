require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  appEnv: process.env.APP_ENV,
  shutdownDelay: parseInt(process.env.SHUTDOWN_DELAY),
  storage: {
    location: process.env.STORAGE_LOCATION,
  },
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
