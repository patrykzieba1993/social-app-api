const Repository = require('./repository');

class DashboardRepository extends Repository {
  createPost(post) {
    return this.models.Posts.create(post);
  }
  getPosts(id) {
    const findOpts = {
      where: {
        userId: id,
      },
      attributes: ['id', 'userId', 'content'],
    };
    return this.models.Posts.findAll(findOpts);
  }
}

module.exports = DashboardRepository;
