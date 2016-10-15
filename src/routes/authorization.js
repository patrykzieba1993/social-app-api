const AuthorizationController = require('../controllers/authorization');

function setupRoute(server, options, next) {
  const authorizationController = new AuthorizationController({ server });

  server.bind(authorizationController);

  const routes = [
    {
      method: 'POST',
      path: '/register',
      config: {
        handler: authorizationController.createUser,
        description: 'New user creation',
        notes: 'Create new user',
        tags: ['api'],
      },
    },
  ];

  routes.forEach(route => Object.assign(route, { path: options.prefix + route.path }));

  server.route(routes);

  next();
}

exports.register = setupRoute;

exports.register.attributes = {
  name: 'routes-emojis',
  version: '1.0.1',
};
