const Repository = require('./repository');

class DashboardRepository extends Repository {
  createPost(post) {
    return this.models.Posts.create(post)
      .then(inserted => { return { id: inserted.id } });
  }

  createComment(comment) {
    return this.models.Comments.create(comment)
      .then(inserted => inserted.id);
  }
  
  getPosts(id) {
    const findOpts = {
      where: {
        userId: id,
      },
      attributes: ['id', 'userId', 'content'],
      order: '"createdAt" DESC',
    };
    return this.models.Posts.findAll(findOpts);
  }

  getComment(commentId) {
    return this.models.Comments.getComment(commentId)
      .then(data => { return {
        id: data.id,
        content: data.content,
        createdAt: data.createdAt,
        postId: data.postId,
        user: {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
        },
        userId: data.userId,
      }});
  }
  
  getComments(postsIds) {
    return this.models.Comments.getComments(postsIds);
  }
}

module.exports = DashboardRepository;
