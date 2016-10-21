const RouteController = require('./route');

class DashboardController extends RouteController {
  createPost(request, reply) {
    const post = request.payload;
    this.repositories.Dashboard.createPost(post)
      .then((inserted) => reply(inserted).code(201))
      .catch((e) => reply(this.handleError(e)));
  }

  createComment(request, reply) {
    const comment = request.payload;
    this.repositories.Dashboard.createComment(comment)
      .then((insertedId) =>
        this.repositories.Dashboard.getComment(insertedId)
          .then(comment => comment))
      .then((data) => reply(data).code(201))
      .catch((e) => reply(this.handleError(e)));
  }
  
  getPostsWithComments(request, reply) {
    const id = request.params.id;
    this.repositories.Dashboard.getPosts(id)
      .then((posts) => {
        const results = [];
        const postsIds = posts.map(post => post.id);
        return this.repositories.Dashboard.getComments(postsIds)
          .then(comments => {
            posts.forEach(post => {
              let item = {
                id: post.id,
                author: post.userId,
                content: post.content,
                comments: comments.filter(comment => comment.postId === post.id),
              };
              results.push(item);
            })
          })
          .then(() => results)
      })
      .then((result) => reply(result).code(200))
      .catch((e) => reply(this.handleError(e)));
  }
}

module.exports = DashboardController;
