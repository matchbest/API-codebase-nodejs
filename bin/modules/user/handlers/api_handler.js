const wrapper = require('../../../helpers/utils/wrapper');
const validator = require('../../../helpers/utils/validator');

const commandValidation = require('../services/commands/command_validation');
const commandDomain = require('../services/commands/command_domain');

const commandUser = new commandDomain();

const registerUser = async (req, res) => {
  const message = 'Register User';
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandValidation.registerUser);
  const postRequest = async (result) => {
    return result.err ? result : commandUser.registerUser(result.data);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result, message)
      : wrapper.response(res, 'success', result, message);
  };
  sendResponse(await postRequest(validatePayload));
};

const authUser = async (req, res) => {
  const message = 'Authenticate User';
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandValidation.authUser);
  const postRequest = async (result) => {
    return result.err ? result : commandUser.authUser(result.data);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result, message)
      : wrapper.response(res, 'success', result, message);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  registerUser,
  authUser,
};
