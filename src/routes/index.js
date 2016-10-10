const baseRoute = require('./base');

function setupRouting(server, options, next) {
  const routes = [
    {
      register: baseRoute,
    },
  ];

  server.register(routes)
    .then(() => next())
    .catch(e => server.log('error', e));
}

exports.register = setupRouting;

exports.register.attributes = {
  name: 'routes',
  version: '1.0.1',
};
