function Friendships(sequelize, DataTypes) {
  const fields = {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER,
  }

  const FriendshipsModel = sequelize.define('Friendships', fields, {
    classMethods: {
      associate: models => {
        FriendshipsModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' })
      },
    },
  });
  return FriendshipsModel;
}

module.exports = Friendships;