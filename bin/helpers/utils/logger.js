const winston = require('winston');

let transports = [
  new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    colorize: true,
    format: winston.format.json(),
    stringify: (obj) => JSON.stringify(obj),
  }),
];

let logger = winston.createLogger({
  transports: transports,
  exitOnError: false
});

const log = (context, message, scope) => {
  const obj = {
    context,
    scope,
    message: message.toString()
  };
  logger.info(obj);
};

const info = (context, message, scope, meta) => {
  const obj = {
    context,
    scope,
    message: message.toString(),
    meta
  };
  logger.info(obj);
};

const error = (context, message, scope, meta) => {
  const obj = {
    context,
    scope,
    message: message.toString(),
    meta
  };
  logger.error(obj);
};

module.exports = {
  log,
  info,
  error,
};

