function setupRoute(server, options, next) {
  const routes = [
    {
      method: 'GET',
      path: '/robots.txt',
      handler: {
        file: 'robots.txt',
      },
    },
    {
      method: 'GET',
      path: '/favicon.ico',
      handler: {
        file: 'favicon.ico',
      },
    },
  ];

  server.route(routes);

  next();
}

exports.register = setupRoute;

exports.register.attributes = {
  name: 'routes-base',
  version: '1.0.1',
};
