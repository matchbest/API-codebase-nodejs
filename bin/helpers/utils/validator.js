const createError = require('http-errors');
const validate = require('validate.js');
const wrapper = require('./wrapper');

const isValidPayload = (payload, schema) => {
  if(!payload) {
    return wrapper.error(new createError.BadRequest('payload is empty'));
  }
  const { value, error } = schema.validate(payload);
  if(!validate.isEmpty(error)) {
    const msg = error.details ? error.details[0].message : 'invalid parameters';
    return wrapper.error(new createError.BadRequest(msg));
  }
  return wrapper.data(value);
};

module.exports = {
  isValidPayload
};
