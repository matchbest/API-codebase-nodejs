
const configs = require('../configs/global_config');
const validate = require('validate.js');
const passport = require('passport');
const { BasicStrategy } = require('passport-http');


passport.use(new BasicStrategy((username, password, done) => {
  const basic = configs.get('/auth/basic');
  if(
    validate.isEmpty(basic)
    || (basic.username == username && basic.password == password)
  ) {
    return done(null, {});
  }
  return done(null, false);
}));

const authenticate = passport.authenticate('basic', { session: false });
const init = () => passport.initialize();

module.exports = {
  authenticate,
  init,
};
