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
      },
    },
  });
  return PostsModel;
}

module.exports = Posts;