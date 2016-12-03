const RouteController = require('./route');

class DashboardController extends RouteController {
  verifierTest(request, reply) {
    const { text } = request.payload;
    reply().code(200);
  }

  getUserData(request, reply) {
    const { id } = request.params;

    this.repositories.User.getUserInfo(id)
      .then((raw) => {
        return {
          firstName: raw[0].firstName,
          lastName: raw[0].lastName,
          id: raw[0].id,
          login: raw[0].login,
        };
      })
      .then((data) => reply(data).code(200))
      .catch(e => reply(this.handleError(e)));
  }

  createPost(request, reply) {
    const post = request.payload;
    this.repositories.Dashboard.createPost(post)
      .then((inserted) => {
        return this.repositories.Friendship.getFriendsWithData(post.userId)
          .then((friendsData) => {
            const friends = friendsData.map(friend =>
              friend.userId === post.userId ? friend.friendId : friend.userId);
            return this.repositories.Notification.createPostNotifications(friends, inserted.id)
              .then(() => this.repositories.User.getUserInfo(post.userId))
              .then(userData => {
                return {
                  friends,
                  id: inserted.id,
                  userData,
                };
              });
          })
      })
      .then((data) => reply(data).code(201))
      .catch((e) => reply(this.handleError(e)));
  }

  createComment(request, reply) {
    const comment = request.payload;
    this.repositories.Dashboard.createComment(comment)
      .then((insertedId) => {
        return this.repositories.Friendship.getFriendsWithData(comment.userId)
          .then((friendsData) => {
            const friends = friendsData.map(friend =>
              friend.userId === comment.userId ? friend.friendId : friend.userId);
            return this.repositories.Notification.createCommentsNotifications(friends, insertedId)
              .then(() => {
                return this.repositories.Dashboard.getComment(insertedId)
                  .then(comment => {
                    return {
                      comment,
                      friends,
                    };
                  });
              });
          })
      })
      .then((data) => reply(data).code(201))
      .catch((e) => reply(this.handleError(e)));
  }
  
  getPostsWithComments(request, reply) {
    const id = request.params.id;
    this.repositories.Friendship.getFriendsWithData(id)
      .then(friends => {
        const ids = friends.map(friend =>
          friend.userId === id ? friend.friendId : friend.userId);

          return this.repositories.Dashboard.getPosts([...ids, id])
            .then((posts) => {
              const results = [];
              const postsIds = posts.map(post => post.id);
              return this.repositories.Dashboard.getComments(postsIds)
                .then(comments => {
                  posts.forEach(post => {
                    let item = {
                      id: post.id,
                      author: post.userId,
                      firstName: post.user.firstName,
                      lastName: post.user.lastName,
                      login: post.user.login,
                      content: post.content,
                      createdAt: post.createdAt,
                      comments: comments.filter(comment => comment.postId === post.id),
                    };
                    results.push(item);
                  })
                })
                .then(() => results)
            })
      })
      .then((result) => reply(result).code(200))
      .catch((e) => reply(this.handleError(e)));
  }
}

module.exports = DashboardController;
