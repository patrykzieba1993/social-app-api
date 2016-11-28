const Joi = require('joi');
const NotificationController = require('../controllers/notification');

function setupRoute(server, options, next) {
  const notificationController = new NotificationController({ server });
  
  server.bind(notificationController);
  
  const routes = [
    {
      method: 'GET',
      path: '/postsAndComments/{userId}',
      config: {
        handler: notificationController.getPostsAndCommentsNotifications,
        description: 'Post and comments notifications.',
        notes: 'Return posts and comments notifications for specific user',
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
    {
      method: 'PATCH',
      path: '/postsAndComments/{userId}',
      config: {
        handler: notificationController.inactivatePostsAndCommentsNotifications,
        description: 'Inactivate post and comments notifications.',
        notes: 'Inactivate posts and comments notifications for specific user',
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
    {
      method: 'GET',
      path: '/messages/{userId}',
      config: {
        handler: notificationController.getMessagesNotifications,
        description: 'Messages notifications.',
        notes: 'Return messages notifications for specific user',
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
    {
      method: 'PATCH',
      path: '/messages/{userId}',
      config: {
        handler: notificationController.inactivateMessagesNotifications,
        description: 'Inactivate messages notifications.',
        notes: 'Inactivate messages notifications for specific user',
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
    {
      method: 'GET',
      path: '/friendships/{userId}',
      config: {
        handler: notificationController.getFriendshipsNotifications,
        description: 'Friendships notifications.',
        notes: 'Return friendships notifications for specific user',
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
    {
      method: 'PATCH',
      path: '/friendships/{userId}',
      config: {
        handler: notificationController.inactivateFriendshipsNotifications,
        description: 'Inactivate friendships notifications.',
        notes: 'Inactivate friendships notifications for specific user',
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
    {
      method: 'PATCH',
      path: '/friendships/accept/{id}',
      config: {
        handler: notificationController.acceptFriendship,
        description: 'Accept friendship.',
        notes: 'Accept specific friendsip',
        tags: ['api'],
        validate: {
          params: Joi.object().keys({
            id: Joi.number()
              .integer()
              .required()
              .description('Friendship id, ex: 1'),
          }),
        },
      },
    },
    {
      method: 'PATCH',
      path: '/friendships/reject/{id}',
      config: {
        handler: notificationController.rejectFriendship,
        description: 'Reject friendship.',
        notes: 'Reject specific friendsip',
        tags: ['api'],
        validate: {
          params: Joi.object().keys({
            id: Joi.number()
              .integer()
              .required()
              .description('Friendship id, ex: 1'),
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
  name: 'routes-notification',
  version: '1.0.1',
};