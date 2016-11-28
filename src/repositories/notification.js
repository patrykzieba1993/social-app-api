const Repository = require('./repository');

class NotificationRepository extends Repository {
  createPostNotifications(usersIds, postId) {
    const notifications = usersIds.map(userId => { return { postId, userId} });
    return this.models.PostsNotifications.bulkCreate(notifications);
  }
  createCommentsNotifications(usersIds, commentId) {
    const notifications = usersIds.map(userId => { return { commentId, userId} });
    return this.models.CommentsNotifications.bulkCreate(notifications);
  }
  createMessagesNotifications(userId, messageId) {
    return this.models.MessagesNotifications.create({ userId, messageId });
  }
  getCommentsNotifications(userId) {
    return this.models.CommentsNotifications.getCommentsNotifications(userId);
  }
  getPostsNotifications(userId) {
    return this.models.PostsNotifications.getPostsNotifications(userId);
  }
  getMessagesNotifications(userId) {
    return this.models.MessagesNotifications.getMessagesNotifications(userId);
  }
  getFriendshipsNotifications(userId) {
    return this.models.FriendshipsNotifications.getFriendshipsNotifications(userId);
  }
  inactivatePostAndComments(userId) {
    return this.models.PostsNotifications.update({ active: false }, { where: { userId } })
      .then(() => this.models.CommentsNotifications.update({ active: false }, { where: { userId } }));
  }
  inactivateMessages(userId) {
    return this.models.MessagesNotifications.update({ active: 'false' }, { where: { userId } });
  }
  inactivateFriendships(userId) {
    return this.models.FriendshipsNotifications.update({ active: 'false' }, { where: { userId } });
  }
}

module.exports = NotificationRepository;
