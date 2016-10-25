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
}

module.exports = NotificationRepository;
