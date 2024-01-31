const wrapper = require('../../../helpers/utils/wrapper');
const validator = require('../../../helpers/utils/validator');

const commandValidation = require('../services/commands/command_validation');

const registerUser = async (req, res) => {
  const message = 'Register User';
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandValidation.registerUser);
  const postRequest = async (result) => {
    return result.err ? result : wrapper.data({ isRegistered: true });
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
};
