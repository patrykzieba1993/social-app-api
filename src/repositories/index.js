const AuthorizationRepository = require('./authorization');
const DashboardRepository = require('./dashboard');
const FriendshipRepository = require('./friendship');
const NotificationRepository = require('./notification');
const MessageRepository = require('./message');
const SearchRepository = require('./search');
const UserRepository = require('./user');

const Repositories = [
  AuthorizationRepository,
  DashboardRepository,
  FriendshipRepository,
  NotificationRepository,
  MessageRepository,
  SearchRepository,
  UserRepository,
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
