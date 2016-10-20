const RouteController = require('./route');

class AuthorizationController extends RouteController {
  createUser(request, reply) {
    const personalData = request.payload;
    this.repositories.Authorization.createUser(personalData)
      .then(() => reply().code(201))
      .catch((e) => reply(this.handleError(e)));
  }
  loginUser(request, reply) {
    const loginData = request.payload;
    this.repositories.Authorization.loginUser(loginData)
      .then((result) => {
        if(result) {
          return reply(result).code(200);
        }
        return reply().code(401);
      })
      .catch((e) => reply(this.handleError(e)));
  }
}

module.exports = AuthorizationController;
