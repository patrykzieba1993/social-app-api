function PostsNotifications(sequelize, DataTypes) {
  const fields = {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
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

  const PostsNotificationsModel = sequelize.define('PostsNotifications', fields, {
    classMethods: {
      associate: models => {
        PostsNotificationsModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user'});
        PostsNotificationsModel.belongsTo(models.Posts, { foreignKey: 'postId', as: 'post'});
      },
      getPostsNotifications: (userId) => {
        const models = PostsNotificationsModel.sequelize.models;
        const findOpts = {
          include: {
            model: models.Posts,
            as: 'post',
            attributes: ['id'],
            include: {
              model: models.Users,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'login'],
            },
          },
          attributes: ['createdAt', 'active'],
          where: {
            userId,
          }
        };
        return PostsNotificationsModel.findAll(findOpts);
      },
    },
  });
  return PostsNotificationsModel;
}

module.exports = PostsNotifications;