const mongodbConn = require('../../../../helpers/components/mongodb/connection');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const createError = require('http-errors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

class CommandRepository {
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

  async addUser(email, password) {
    const ctx = 'cmd-repo-addUser';
    try {
      const { data:db } = await this.getDB();
      const document = {
        userId: uuidv4(),
        email,
        password,
        createdAt: moment().format(),
      };
      const recordset = await db.insertOne(document);
      if (!recordset.acknowledged)
        return wrapper.error(new createError.InternalServerError(`Failed insert data to mongodb`));

      return wrapper.data(document);
    } catch (err) {
      logger.log(ctx, err.message, 'Failed insert data to mongodb');
      return wrapper.error(new createError.InternalServerError(`Failed insert data to mongodb: ${err.message}`));
    }
  }
};

module.exports = CommandRepository;
