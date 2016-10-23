function PostsNotifications(sequelize, DataTypes) {
  const fields = {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  }

  const PostsNotificationsModel = sequelize.define('PostsNotifications', fields, {
    classMethods: {
      associate: models => {
        PostsNotificationsModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user'});
        PostsNotificationsModel.belongsTo(models.Comments, { foreignKey: 'commentId', as: 'comment'});
      },
    },
  });
  return PostsNotificationsModel;
}

module.exports = PostsNotifications;