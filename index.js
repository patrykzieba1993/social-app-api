const server = require('./src/server')();

server.start(() => server.log('info', `Server running at: ${server.info.uri}`));
