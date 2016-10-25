const Repository = require('./repository');

class FriendshipRepository extends Repository {
  getFriends(userId) {
    const findOpts = {
      where: {
        userId,
      }
    }
    return this.models.Friendships.findAll(findOpts);
  }
}

module.exports = FriendshipRepository;
