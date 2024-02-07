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
  logstash: {
    isEnable: process.env.LOGSTASH_IS_ENABLE === 'true',
    host: process.env.LOGSTASH_BASE_URL,
    port: process.env.LOGSTASH_PORT_URL,
    ssl_enable: process.env.LOGSTASH_SSL_ENABLE === 'true',
    max_connect_retries: process.env.LOGSTASH_MAX_CONNECT_RETRIES,
  },
  elasticApm: {
    isEnable: process.env.ELASTIC_APM_IS_ENABLE === 'true',
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
    apiKey: process.env.ELASTIC_APM_API_KEY,
    options: (process.env.ELASTIC_APM_OPTIONS ? JSON.parse(process.env.ELASTIC_APM_OPTIONS) : {}),
  },
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
