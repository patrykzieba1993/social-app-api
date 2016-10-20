const Repository = require('./repository');

class AuthorizationRepository extends Repository {
  createUser(personalData) {
    return this.models.Users.create(personalData);
  }
  loginUser(loginData) {
    const opts = {
      where: {
        login: loginData.login,
        password: loginData.password,
      },
      attributes: [
        'id', 'firstName', 'lastName',
      ],
    };
    return this.models.Users.find(opts)
  }
}

module.exports = AuthorizationRepository;
