const baseRoute = require('./base');
const authorizationRoute = require('./authorization');
const dashboardRoute = require('./dashboard');

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
    {
      register: dashboardRoute,
      options: {
        prefix: '/dashboard',
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
