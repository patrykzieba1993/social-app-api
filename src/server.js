require('dotenv').load({ silent: true });

const EXTENSIONS = require('./utils/const').EXTENSIONS;
const Hapi = require('hapi');
const StaticFileHandler = require('inert');
const TemplateRenderer = require('vision');
const LogService = require('./services/logs');
const Database = require('./services/db');
const Repositories = require('./repositories');
const Routing = require('./routes');
const cfg = require('./../config/app');
const parseHeaders = require('./extensions/parseHeaders');
const createPublicationConfigs = require('./../src/utils/configs').createPublicationConfigs;
const Verifier = require('./services/verifier/verifier');
const _ = require('lodash');

function setup(opts = {}) {
  const config = _.merge({}, opts, cfg, {
    publicationConfigs: createPublicationConfigs(process.env),
  });

  const server = new Hapi.Server({
    app: config,
  });

  const plugins = [
    StaticFileHandler,
    TemplateRenderer,
    {
      register: LogService.handler,
      options: {
        logger: LogService.logger,
      },
    },
    Database,
    Repositories,
    Verifier,
    Routing,
  ];

  server.connection({
    port: process.env.PORT || cfg.port || 3000,
    routes: {
      state: {
        parse: false,
        failAction: 'ignore',
      },
      cors: {
        additionalHeaders: [],
      },
    },
  });

  // server.ext(EXTENSIONS.ON_PRE, parseHeaders);

  server.register(plugins)
    .catch(e => server.log('error', e));

  return server;
}

module.exports = setup;
