const RouteController = require('./route');

class AuthorizationController extends RouteController {
  createUser(request, reply) {
    const personalData = request.payload;
    this.repositories.Authorization.createUser(personalData)
      .then(() => reply().code(201))
      .catch((e) => this.handleError(e));
  }
}

module.exports = AuthorizationController;
