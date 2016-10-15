const Repository = require('./repository');

class AuthorizationRepository extends Repository {
  createUser(personalData) {
    return this.models.Users.create(personalData);
  }
}

module.exports = AuthorizationRepository;
