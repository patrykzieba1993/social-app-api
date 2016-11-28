function FriendshipsNotifications(sequelize, DataTypes) {
  const fields = {
    userId: DataTypes.INTEGER,
    friendshipId: DataTypes.INTEGER,
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

  const FriendshipsNotificationsModel = sequelize.define('FriendshipsNotifications', fields, {
    classMethods: {
      associate: models => {
        FriendshipsNotificationsModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user'});
        FriendshipsNotificationsModel.belongsTo(models.Friendships, { foreignKey: 'friendshipId', as: 'friendship'});
      },
      getFriendshipsNotifications: userId => {
        const models = FriendshipsNotificationsModel.sequelize.models;
        const findOpts = {
          where: { userId },
          include: {
            model: models.Friendships,
            as: 'friendship',
            attributes: ['id'],
            include: {
              model: models.Users,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'login'],
            },
          },
          attributes: ['createdAt', 'active', 'id'],
        };
        return FriendshipsNotificationsModel.findAll(findOpts);
      },
    },
  });
  return FriendshipsNotificationsModel;
}

module.exports = FriendshipsNotifications;