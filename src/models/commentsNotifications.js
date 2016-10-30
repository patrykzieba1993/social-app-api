function CommentsNotifications(sequelize, DataTypes) {
  const fields = {
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      set: function(value) {
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        this.setDataValue('active', value)
      }
    }
  }

  const CommentsNotificationsModel = sequelize.define('CommentsNotifications', fields, {
    classMethods: {
      associate: models => {
        CommentsNotificationsModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user'});
        CommentsNotificationsModel.belongsTo(models.Comments, { foreignKey: 'commentId', as: 'comment'});
      },
      getCommentsNotifications: (userId) => {
        const models = CommentsNotificationsModel.sequelize.models;
        const findOpts = {
          include: {
            model: models.Comments,
            as: 'comment',
            attributes: ['id'],
            include: [{
              model: models.Users,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'login'],
            },
            {
              model: models.Posts,
              as: 'post',
              attributes: ['id'],
              include: {
                model: models.Users,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName', 'login'],
              },
            }],
          },
          attributes: ['createdAt', 'active'],
          where: {
            userId,
          },
        };
        return CommentsNotificationsModel.findAll(findOpts);
      },
    },
  });
  return CommentsNotificationsModel;
}

module.exports = CommentsNotifications;