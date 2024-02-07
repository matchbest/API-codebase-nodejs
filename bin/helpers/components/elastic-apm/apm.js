const apm = require('elastic-apm-node');
const project = require('../../../../package.json');
const configs = require('../../../infra/configs/global_config');

const init = () => {
  if(configs.get('/elasticApm/isEnable')) {
    const options = {
      serviceName: project.name,
      serviceVersion: project.version,
      serverUrl: configs.get('/elasticApm/serverUrl'),
      secretToken: configs.get('/elasticApm/secretToken'),
      apiKey: configs.get('/elasticApm/apiKey'),
    };
    options = { ...options, ...configs.get('/elasticApm/options') };
    apm.start(options);
  }
};

module.exports = {
  init
};
