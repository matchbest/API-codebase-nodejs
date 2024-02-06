require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  appEnv: process.env.APP_ENV,
  system: {
    shutdownDelay: parseInt(process.env.SYSTEM_SHUTDOWN_DELAY) || 500,
  },
  auth: {
    basic: {
      username: process.env.AUTH_BASIC_USERNAME,
      password: process.env.AUTH_BASIC_PASSWORD,
    }
  },
  storage: {
    location: process.env.STORAGE_LOCATION,
  },
  mongodb: {
    url: process.env.MONGODB_URL,
  },
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
