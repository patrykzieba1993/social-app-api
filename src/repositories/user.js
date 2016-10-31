const Repository = require('./repository');

class UserRepository extends Repository {
  getUserInfo(id) {
    const findOpts = {
      where: { id },
      attributes: {
        exclude: ['password', 'updatedAt', 'deletedAt'],
      },
    };
    return this.models.Users.findAll(findOpts)
  }
}

module.exports = UserRepository;
