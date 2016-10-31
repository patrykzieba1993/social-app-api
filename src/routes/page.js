const Joi = require('joi');
const PageController = require('../controllers/page');

function setupRoute(server, options, next) {
  const pageController = new PageController({ server });

  server.bind(pageController);

  const routes = [
    {
      method: 'GET',
      path: '/{userId}/{id}',
      config: {
        handler: pageController.getPageData,
        description: 'User page data',
        notes: 'Return data for user page',
        tags: ['api'],
        validate: {
          params: Joi.object().keys({
            userId: Joi.number()
              .integer()
              .required()
              .description('Logged user id, ex: 1'),
            id: Joi.number()
              .integer()
              .required()
              .description('User id, ex: 1'),
          }),
        },
      },
    },
  ];

  routes.forEach(route => Object.assign(route, { path: options.prefix + route.path }));

  server.route(routes);

  next();
}

exports.register = setupRoute;

exports.register.attributes = {
  name: 'routes-page',
  version: '1.0.1',
};