const RouteController = require('./route');

class NotificationController extends RouteController {

  getPostsAndCommentsNotifications(request, reply) {
    const result = [];

    const { userId } = request.params;

    const prepareCommentsNotifications = (notifications) =>
      notifications.map(notification => {
        return {
          type: 'comment',
          who: {
            id: notification.comment.user.id,
            firstName: notification.comment.user.firstName,
            lastName: notification.comment.user.lastName,
            login: notification.comment.user.login,
          },
          whom: {
            id: notification.comment.post.user.id,
            firstName: notification.comment.post.user.firstName,
            lastName: notification.comment.post.user.lastName,
            login: notification.comment.post.user.login,
          },
          when: notification.createdAt,
          active: notification.get('active'),
        }
      });


    const preparePostsNotifications = (notifications) =>
      notifications.map(notification => {
        return {
          type: 'post',
          who: {
            id: notification.post.user.id,
            firstName: notification.post.user.firstName,
            lastName: notification.post.user.lastName,
            login: notification.post.user.login
          },
          when: notification.createdAt,
          active: notification.get('active'),
        }
      });

    const sortResult = () => {
      result.sort((a,b) => a.when < b.when ? 1 : -1);
    }

    this.repositories.Notification.getCommentsNotifications(userId)
      .then(raw => prepareCommentsNotifications(raw))
      .then(comments => result.push(...comments))
      .then(() => this.repositories.Notification.getPostsNotifications(userId))
      .then(raw => preparePostsNotifications(raw))
      .then(posts => result.push(...posts))
      .then(() => sortResult())
      .then(() => reply(result).code(200))
      .catch(e => reply(this.handleError(e)));
  }

  getMessagesNotifications(request, reply) {
    const { userId } = request.params;
    const prepareMessagesNotifications = notifications =>
      notifications.map(notification => {
        return {
          type: 'message',
          who: {
            id: notification.message.user.id,
            firstName: notification.message.user.firstName,
            lastName: notification.message.user.lastName,
            login: notification.message.user.login,
          },
          when: notification.createdAt,
          active: notification.get('active'),
        }
      });

    this.repositories.Notification.getMessagesNotifications(userId)
      .then(raw => prepareMessagesNotifications(raw))
      .then(result => reply(result).code(200))
      .catch(e => reply(this.handleError(e)));
  }

  getFriendshipsNotifications(request, reply) {
    const { userId } = request.params;

    const prepareFriendshipsNotifications = notifications =>
      notifications.map(notification => {
        return {
          id: notification.friendship.id,
          type: 'friendship',
          who: {
            id: notification.friendship.user.id,
            firstName: notification.friendship.user.firstName,
            lastName: notification.friendship.user.lastName,
            login: notification.friendship.user.login,
          },
          when: notification.createdAt,
          active: notification.get('active'),
        };
      });

    this.repositories.Notification.getFriendshipsNotifications(userId)
      .then(raw => prepareFriendshipsNotifications(raw))
      .then(result => reply(result).code(200))
      .catch(e => reply(this.handleError(e)));
  }

  inactivatePostsAndCommentsNotifications(request, reply) {
    const { userId } = request.params;
    this.repositories.Notification.inactivatePostAndComments(userId)
      .then(() => reply().code(204))
      .catch(e => reply(this.handleError(e)));
  }

  inactivateMessagesNotifications(request, reply) {
    const { userId } = request.params;
    this.repositories.Notification.inactivateMessages(userId)
      .then(() => reply().code(204))
      .catch(e => reply(this.handleError(e)));
  }
  inactivateFriendshipsNotifications(request, reply) {
    const { userId } = request.params;
    this.repositories.Notification.inactivateFriendships(userId)
      .then(() => reply().code(204))
      .catch(e => reply(this.handleError(e)));
  }
  acceptFriendship(request, reply) {
    const { id } = request.params;
    this.repositories.Friendship.acceptFriendship(id)
      .then(() => reply().code(204))
      .catch(e => reply(this.handleError(e)));
  }
  rejectFriendship(request, reply) {
    const { id } = request.params;
    this.repositories.Friendship.rejectFriendship(id)
      .then(() => reply().code(204))
      .catch(e => reply(this.handleError(e)));
  }
}

module.exports = NotificationController;