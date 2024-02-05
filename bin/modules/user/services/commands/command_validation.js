const joi = require('joi');

const registerUser = joi.object({
  email: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().required(),
});

const authUser = joi.object({
  email: joi.string().required(),  
  password: joi.string().required(),
});

module.exports = {
  registerUser,
  authUser,
};
