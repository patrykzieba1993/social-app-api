const baseRoute = require('./base');
const authorizationRoute = require('./authorization');

function setupRouting(server, options, next) {
  const routes = [
    {
      register: baseRoute,
    },
    {
      register: authorizationRoute,
      options: {
        prefix: '/authorization',
      },
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
