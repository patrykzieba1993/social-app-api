function Messages(sequelize, DataTypes) {
  const fields = {
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    content: DataTypes.STRING,
  };
  
  const MessagesModel = sequelize.define('Messages', fields, {
    classMethods: {
      associate: (models) => {
        MessagesModel.belongsTo(models.Users, { foreignKey: 'senderId', as: 'user' });
        MessagesModel.hasMany(models.MessagesNotifications, { foreignKey: 'messageId', as: 'message'});
      },
      getMessages: (senderId, receiverId) => {
        const findOpts = {
          attributes: ['id', 'senderId', 'receiverId', 'content', 'createdAt'],
          where: {
            $or: [
              {
                senderId, receiverId,
              },
              {
                senderId: receiverId,
                receiverId: senderId,
              }
            ]
          },
          order: '"createdAt" ASC',
        };
        return MessagesModel.findAll(findOpts);
      },
    }
  });
  
  return MessagesModel;
}

module.exports = Messages;