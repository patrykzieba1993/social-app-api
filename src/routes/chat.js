const Joi = require('joi');
const ChatController = require('../controllers/chat');

function setupRoute(server, options, next) {
  const chatController = new ChatController({ server });

  server.bind(chatController);

  const routes = [
    {
      method: 'GET',
      path: '/messages/{senderId}/{receiverId}',
      config: {
        handler: chatController.getMessages,
        description: 'Get messages',
        notes: 'Return messages',
        tags: ['api'],
        validate: {
          params: Joi.object().keys({
            senderId: Joi.number()
              .integer()
              .required()
              .description('Sender id, ex: 1'),
            receiverId: Joi.number()
              .integer()
              .required()
              .description('Receiver id, ex: 2'),
          }),
        },
      },
    },
    {
      method: 'POST',
      path: '/message',
      config: {
        handler: chatController.createMessage,
        description: 'New message creation',
        notes: 'Create new message',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            senderId: Joi.number()
              .integer()
              .required()
              .description('Sender id, ex: 1'),
            receiverId: Joi.number()
              .integer()
              .required()
              .description('Receiver id, ex: 2'),
            content: Joi.string()
              .required()
              .description('Content of message'),
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
  name: 'routes-chat',
  version: '1.0.1',
};