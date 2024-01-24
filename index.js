const AppServer = require('./bin/app/server');
const configs = require('./bin/helpers/configs/global_config');
const logger = require('./bin/helpers/utils/logger');
const appServer = new AppServer();
const port = process.env.PORT || configs.get('/port') || 1337;
const project = require('./package.json');

appServer.listen(port, () => {
  const ctx = 'app-listen';
  logger.log(ctx, `${project.name} started`, 'init-application');
});
