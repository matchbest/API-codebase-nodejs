const validate = require('validate.js');

const data = (data, meta = {}) => ({ err: null, data, meta });

const error = (err, data = null) => ({ err, data });

const response = (res, type, result, message = '', code = 200) => {
  let status = true;
  let data = result.data || null;
  if(type === 'fail'){
    status = false;
    data = result.data || null;
    message = result.err.message || message;
    code = result.err.statusCode || 500;
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
