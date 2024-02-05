const QueryRepository = require('../queries/query_repository');
const CommandRepository = require('./command_repository');

const configs = require('../../../../helpers/configs/global_config');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const createError = require('http-errors');
const { createHash } = require('crypto');

class User {
  constructor () {    
    this.query = new QueryRepository(configs.get('/mongodb/url'));
    this.command = new CommandRepository(configs.get('/mongodb/url'));
  }

  async registerUser(payload) {
    const ctx = 'cmd-domain-registerUser';
    let { email, password } = payload;
    const checkUser = await this.query.getUserByEmail(email);
    if(checkUser.err && checkUser.err.message != 'Data not found') return checkUser;
    else if(checkUser.data) return wrapper.error(new createError.InternalServerError('User already exists'));

    password = createHash('sha256').update(password).digest('hex');
    const resAddUser = await this.command.addUser(email, password);
    if(resAddUser.err) {
      logger.error(ctx, 'Failed Register User', 'addUser', resAddUser);
      return resAddUser;
    }

    return wrapper.data('User registration has been successful');
  }

  async authUser(payload) {
    const ctx = 'cmd-domain-authUser';
    let { email, password } = payload;
    const checkUser = await this.query.getUserByEmail(email);
    if(checkUser.err) {
      logger.error(ctx, 'Invalid Email', 'check-user');
      return wrapper.error(new createError.Unauthorized('Invalid Email or Password'));
    }

    password = createHash('sha256').update(password).digest('hex');
    if(password != checkUser.data.password) {
      logger.error(ctx, 'Invalid Password', 'check-password');
      return wrapper.error(new createError.Unauthorized('Invalid Email or Password'));
    }

    return wrapper.data({ userId: checkUser.data.userId });
  }
};

module.exports = User;
