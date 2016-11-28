function Posts(sequelize, DataTypes) {
  const fields = {
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
  }

  const PostsModel = sequelize.define('Posts', fields, {
    classMethods: {
      associate: models => {
        PostsModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user'});
        PostsModel.hasMany(models.PostsNotifications, { foreignKey: 'postId', as: 'post' });
        PostsModel.hasMany(models.Comments, { foreignKey: 'postId', as: 'post' });
      },
      getPosts: (ids) => {
        const models = PostsModel.sequelize.models;
        const findOpts = {
          where: {
            $or: ids.map(id => { return { userId: id} }),
          },
          include: {
            model: models.Users,
            as: 'user',
            attributes: ['firstName', 'lastName', 'login'],
          },
          attributes: ['id', 'userId', 'content', 'createdAt'],
          order: '"Posts"."createdAt" DESC',
        };
        return PostsModel.findAll(findOpts);
      },
    },
  });
  return PostsModel;
}

module.exports = Posts;

