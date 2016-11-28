const Repository = require('./repository');

class FriendshipRepository extends Repository {
  getFriendsWithData(userId, accepted) {
    return this.models.Users.getLogin(userId)
      .then(raw => this.models.Friendships.getFriendsWithData(userId, raw ? raw.login : null, accepted));
  }
  createFriendship(userId, friendId) {
    return this.models.Friendships.create({userId, friendId})
      .then(inserted => this.models.FriendshipsNotifications.create({ friendshipId: inserted.id, userId: friendId }));
  }
  acceptFriendship(id) {
    return this.models.FriendshipsNotifications.find({ where: { friendshipId: id } })
      .then(row => row.destroy())
      .then(() => this.models.Friendships.update({ accepted: 'true' }, {where: { id } }));
  }
  rejectFriendship(id) {
    return this.models.FriendshipsNotifications.find({ where: { friendshipId: id } })
      .then(row => row.destroy())
      .then(() => this.models.Friendships.find({ where: { id } }))
      .then(row => row.destroy());
  }
}

module.exports = FriendshipRepository;

