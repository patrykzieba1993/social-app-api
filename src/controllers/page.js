const RouteController = require('./route');

class PageController extends RouteController {
  getPageData(request, reply) {
    let posts = [];
    let comments = [];
    let friends = [];
    let userData = null;

    const { userId, id } = request.params;

    const checkIfFriends = () => {
      let isFriend = false;
      friends.forEach(friend => {
        if (friend.userId === userId || friend.friendId === userId) {
          isFriend = true;
        }
      });
      return isFriend;
    };

    const prepareFriends = () =>
      friends.map(friend => {
        return {
          userId: friend.userId === id ? friend.friendId : friend.userId,
          login: friend.login,
          firstName: friend.firstName,
          lastName: friend.lastName,
        };
      });

    const connectCommentsWithPosts = () => {
      return posts.map(post => {
        const postsComments = comments.filter(comment => comment.postId === post.id);
        return Object.assign({
          id: post.id,
          userId: post.userId,
          content: post.content,
          createdAt: post.createdAt,
          firstName: post.user.firstName,
          lastName: post.user.lastName,
          login: post.user.login,
        },
        {
          comments: postsComments
        });
      });
    };

    const prepareResponse = () => {
      return {
        userData,
        isFriend: checkIfFriends(),
        postsWithComments: connectCommentsWithPosts(),
        friends: prepareFriends(),
      };
    }

    this.repositories.Dashboard.getPosts([id])
      .then(result => posts = result)
      .then(() => this.repositories.Dashboard.getComments(posts.map(post => post.id)))
      .then(result => comments = result)
      .then(() => this.repositories.Friendship.getFriendsWithData(id))
      .then(result => friends = result)
      .then(() => this.repositories.User.getUserInfo(id))
      .then(result => userData = result)
      .then(() => prepareResponse())
      .then(res => reply(res).code(200))
      .catch(e => reply(this.handleError(e)));
  }
}

module.exports = PageController;