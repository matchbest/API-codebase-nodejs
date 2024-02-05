const mongodbConn = require('../../../../helpers/components/mongodb/connection');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const createError = require('http-errors');
const validate = require('validate.js');

class QueryRepository {
  constructor (config) {
    this.config = config;
    this.collectionName = 'users';
  }

  async getDB() {
    const ctx = 'cmd-repo-getDB';
    try {
      const {data: { connection: cacheConnection, dbName }} = await mongodbConn.fetchConnection(this.config);
      return wrapper.data(cacheConnection.db(dbName).collection(this.collectionName));
    } catch (err) {
      logger.error(ctx, err.message, 'Error get db connection');
      return wrapper.error(err);
    }
  };

  async getUserByEmail(email) {
    const ctx = 'qry-repo-getUserByEmail';
    try {
      const { data: db } = await this.getDB();
      const parameter = { email: email };
      const recordset = await db.findOne(parameter);
      if (validate.isEmpty(recordset)) {
        return wrapper.error(new createError.NotFound('Data not found'));
      }
      return wrapper.data(recordset);
    } catch (err) {
      logger.error(ctx, err.message, 'Error get data from mongodb');
      return wrapper.error(new createError.InternalServerError(`Error get data from mongodb: ${err.message}`));
    }
  }
};

module.exports = QueryRepository;
