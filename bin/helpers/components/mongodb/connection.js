const { MongoClient } = require('mongodb');
const configs = require('../../configs/global_config');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');

let connectionPool = [];

const fetchConnection = async (config) => {
  const checkConnection = connectionPool.findIndex(c => c.config == config);
  if(checkConnection === -1) {
    try {
      const client = new MongoClient(config);
      const connection = await client.connect();
      const dbName = getDatabaseName(config);
      const pool = { config, connection, dbName };
      connectionPool.push(pool);
      return wrapper.data(pool);
    } catch (err) {
      logger.log('connection-createConnection', err, 'error');
      return wrapper.error(err.message);
    }
  }

  return wrapper.data(connectionPool[checkConnection]);
};

const getDatabaseName = (config) => {
  config = config.replace('//', '');
  const pattern = new RegExp('/([a-zA-Z0-9-]+)?');
  const dbNameFound = pattern.exec(config);
  return dbNameFound[1];
}

module.exports = {
  fetchConnection,
};
