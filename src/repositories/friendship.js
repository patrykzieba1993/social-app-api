const Repository = require('./repository');

class FriendshipRepository extends Repository {
  getFriendsWithData(userId) {
    return this.models.Users.getLogin(userId)
      .then(raw => this.models.Friendships.getFriendsWithData(userId, raw ? raw.login : null));
  }
}

module.exports = FriendshipRepository;
