const Joi = require('joi');
const FriendshipController = require('../controllers/friendship');

function setupRoute(server, options, next) {
  const friendshipController = new FriendshipController({ server });

  server.bind(friendshipController);

  const routes = [
    {
      method: 'POST',
      path: '/',
      config: {
        handler: friendshipController.createFriendship,
        description: 'New friendship creation',
        notes: 'Create new friendship',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            userId: Joi.number()
              .integer()
              .required()
              .description('User id, ex: 1'),
            friendId: Joi.number()
              .integer()
              .required()
              .description('Another user id, ex: 2'),
          }),
        },
      },
    },
    {
      method: 'GET',
      path: '/{userId}',
      config: {
        handler: friendshipController.getFriends,
        description: 'Friends for specific user',
        notes: 'Return friends',
        tags: ['api'],
        validate: {
          params: Joi.object().keys({
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
  name: 'routes-friendship',
  version: '1.0.1',
};