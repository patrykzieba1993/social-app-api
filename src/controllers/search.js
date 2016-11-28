const RouteController = require('./route');

class SearchController extends RouteController {
  searchUsers(request, reply) {
    const { query, userId } = request.payload;
    console.log(query);
    console.log(userId);
    let searchedUsers = null;
    let friends = null;

    const prepareResponse = () => {
      const response = [];
      searchedUsers.forEach(user => {
        const isFriend = friends.find(friend => friend.userId === user.id || friend.friendId === user.id)

        response.push({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          login: user.login,
          isFriend: isFriend ? true : false,
        })
      });

      return response;
    }

    this.repositories.Search.searchUsers(query, userId)
      .then(result => searchedUsers = result)
      .then(() => this.repositories.Friendship.getFriendsWithData(userId, false))
      .then(result => friends = result)
      .then(() => prepareResponse())
      .then(res => reply(res).code(200))
      .catch(e => reply(this.handleError(e)));
  }
}

module.exports = SearchController;