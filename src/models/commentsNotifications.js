function CommentsNotifications(sequelize, DataTypes) {
  const fields = {
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
  }

  const CommentsNotificationsModel = sequelize.define('CommentsNotifications', fields, {
    classMethods: {
      associate: models => {
        CommentsNotificationsModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user'});
        CommentsNotificationsModel.belongsTo(models.Comments, { foreignKey: 'commentId', as: 'comment'});
      },
    },
  });
  return CommentsNotificationsModel;
}

module.exports = CommentsNotifications;