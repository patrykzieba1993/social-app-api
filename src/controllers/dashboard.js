const RouteController = require('./route');

class DashboardController extends RouteController {
  createPost(request, reply) {
    const post = request.payload;
    this.repositories.Dashboard.createPost(post)
      .then(() => reply().code(201))
      .catch((e) => reply(this.handleError(e)));
  }
  
  getPosts(request, reply) {
    const id = request.params.id;
    this.repositories.Dashboard.getPosts(id)
      .then((res) => reply(res).code(200))
      .catch((e) => reply(this.handleError(e)));
  }
}

module.exports = DashboardController;
