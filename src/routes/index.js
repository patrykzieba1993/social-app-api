const baseRoute = require('./base');
const authorizationRoute = require('./authorization');
const dashboardRoute = require('./dashboard');
const notificationRoute = require('./notification');
const friendshipRoute = require('./friendship');

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
    {
      register: notificationRoute,
      options: {
        prefix: '/notification',
      },
    },
    {
      register: friendshipRoute,
      options: {
        prefix: '/friendship', 
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
