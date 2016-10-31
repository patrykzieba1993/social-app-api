const Joi = require('joi');
const SearchController = require('../controllers/search');

function setupRoute(server, options, next) {
  const searchController = new SearchController({ server });

  server.bind(searchController);

  const routes = [
    {
      method: 'POST',
      path: '',
      config: {
        handler: searchController.searchUsers,
        description: 'Search users',
        notes: 'Return searched users',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            query: Joi.string()
              .required()
              .description('Query, ex: john'),
            userId: Joi.number()
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
  name: 'routes-search',
  version: '1.0.1',
};