const Joi = require('joi');
const DashboardController = require('../controllers/dashboard');

function setupRoute(server, options, next) {
  const dashboardController = new DashboardController({ server });

  server.bind(dashboardController);

  const routes = [
    {
      method: 'POST',
      path: '/verifier',
      config: {
        handler: dashboardController.verifierTest,
        description: 'Verifier test.',
        notes: 'Verifier test',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            text: Joi.string()
              .required()
              .description('Text'),
          }),
        },
      },
    },
    {
      method: 'GET',
      path: '/postsWithComments/{id}',
      config: {
        handler: dashboardController.getPostsWithComments,
        description: 'Posts return.',
        notes: 'Return posts for specific user',
        tags: ['api'],
        validate: {
          params: Joi.object().keys({
            id: Joi.number()
              .integer()
              .required()
              .description('User id, ex: 1'),
          }),
        },
      },
    },
    {
      method: 'POST',
      path: '/post',
      config: {
        handler: dashboardController.createPost,
        description: 'New post creation',
        notes: 'Create new post',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            userId: Joi.number()
              .integer()
              .required()
              .description('User id, ex: 1'),
            content: Joi.string()
              .required()
              .description('Content of comment, ex: Hello'),
          }),
        },
      },
    },
    {
      method: 'POST',
      path: '/comment',
      config: {
        handler: dashboardController.createComment,
        description: 'New comment creation',
        notes: 'Create new comment',
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
            content: Joi.string()
              .required()
              .description('Content of comment, ex: Hello'),
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
  name: 'routes-dashboard',
  version: '1.0.1',
};
