const validate = require('validate.js');

const data = (data, meta = {}) => ({ err: null, data, meta });

const error = (err, data = null) => ({ err, data });

const response = (res, type, result, message = '') => {
  let status = true;
  let data = result.data || null;
  let code = 200;
  if(type === 'fail'){
    status = false;
    data = result.data || null;
    message = result.err.message || message;
  }
  const responseData = {
    success: status,
    code,
    message,
    data,
  };
  if(!validate.isEmpty(result.meta)) responseData.meta = result.meta;

  return res.status(code).json(responseData);
};

module.exports = {
  data,
  error,
  response,
};
