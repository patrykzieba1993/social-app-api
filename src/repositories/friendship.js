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

  getFriendsWithData(userId) {
    return this.models.Users.getLogin(userId)
      .then(raw => this.models.Friendships.getFriendsWithData(userId, raw ? raw.login : null));
  }
}

module.exports = FriendshipRepository;
