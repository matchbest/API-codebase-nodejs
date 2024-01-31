const joi = require('joi');

const registerUser = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

module.exports = {
  registerUser,
};
