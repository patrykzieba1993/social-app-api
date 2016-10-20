const AuthorizationRepository = require('./authorization');
const DashboardRepository = require('./dashboard');

const Repositories = [
  AuthorizationRepository,
  DashboardRepository,
];

function setupRepositories(server, options, next) {
  const repositories = {};

  function init(Repository) {
    const name = Repository.name.replace('Repository', '');
    repositories[name] = new Repository({ server });
  }
  Repositories.forEach(init);
  server.expose('repositories', repositories);
  next();
}

exports.register = setupRepositories;

exports.register.attributes = {
  name: 'repositories',
  version: '1.0.0',
};
