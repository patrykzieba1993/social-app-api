function MessagesNotifications(sequelize, dataTypes) {
  const fields = {
    userId: dataTypes.INTEGER,
    messageId: dataTypes.INTEGER,
    active: {
      type: dataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      set: function(value) {
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        this.setDataValue('active', value)
      }
    }
  };
  
  const MessagesNotificationsModel = sequelize.define('MessagesNotifications', fields, {
    classMethods: {
      associate: models => {
        MessagesNotificationsModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user'});
        MessagesNotificationsModel.belongsTo(models.Messages, { foreignKey: 'messageId', as: 'message'});
      },
      getMessagesNotifications: (userId) => {
        const models = MessagesNotificationsModel.sequelize.models;
        const findOpts = {
          include: {
            model: models.Messages,
            as: 'message',
            attributes: ['id'],
            include: {
              model: models.Users,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'login']
            }
          },
          attributes: ['createdAt', 'active'],
          where: {
            userId,
          },
          order: '"createdAt" DESC',
        }
        return MessagesNotificationsModel.findAll(findOpts);
      },
    },
  });
  
  return MessagesNotificationsModel;
}

module.exports = MessagesNotifications