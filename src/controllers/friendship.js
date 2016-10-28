const RouteController = require('./route');

class FriendshipController extends RouteController {
  createFriendship(request, reply) {
    
  }
  
  getFriends(request, reply) {
    const { userId } = request.params;

    const prepareResponse = raws =>
      raws.map(raw => {
        return {
          id: raw.userId === userId ? raw.friendId : raw.userId,
          login: raw.login,
          firstName: raw.firstName,
          lastName: raw.lastName,
        };
      });
    
    this.repositories.Friendship.getFriendsWithData(userId)
      .then(raws => prepareResponse(raws))
      .then(result => reply(result).code(200))
      .catch(e => reply(this.handleError(e)));
  }
}

module.exports = FriendshipController;