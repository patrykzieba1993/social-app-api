const Joi = require('joi');
const NotificationController = require('../controllers/notification');

function setupRoute(server, options, next) {
  const notificationController = new NotificationController({ server });
  
  server.bind(notificationController);
  
  const routes = [
    {
      method: 'POST',
      path: '/postNotification',
      config: {
        handler: notificationController.createPostNotification,
        description: 'New post notification creation',
        notes: 'Create new post notification',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            userId: Joi.number()
              .integer()
              .required()
              .description('User id, ex: 1'),
            postId: Joi.number()
              .integer()
              .required()
              .description('Post id, ex: 1'),
          }),
        },
      },
    },
    {
      method: 'POST',
      path: '/commentNotification',
      config: {
        handler: notificationController.createCommentNotification,
        description: 'New comment notification creation',
        notes: 'Create new comment notification',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            userId: Joi.number()
              .integer()
              .required()
              .description('User id, ex: 1'),
            commentId: Joi.number()
              .integer()
              .required()
              .description('Comment id, ex: 1'),
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