function Friendships(sequelize, DataTypes) {
  const fields = {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER,
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      set: function(value) {
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        this.setDataValue('accepted', value)
      }
    }
  }

  const FriendshipsModel = sequelize.define('Friendships', fields, {
    classMethods: {
      associate: models => {
        FriendshipsModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
        FriendshipsModel.hasMany(models.FriendshipsNotifications, { foreignKey: 'friendshipId', as: 'friendship' });
      },
      getFriendsWithData: (userId, login, accepted = true) => {
        return sequelize.query(`
          select "Friendships"."id", "userId", "friendId", "firstName", "lastName", "login", "accepted"
          from "Friendships" 
          join "Users" on "Users"."id" = "Friendships"."userId" or "Users"."id" = "Friendships"."friendId"
          where login != :login and ("Friendships"."userId" = :userId or "Friendships"."friendId" = :userId) and ${accepted ? 'accepted = TRUE' : '1=1' }`,
        {
          replacements: { userId, login },
          type: sequelize.QueryTypes.SELECT,
        });
      }
    },
  });
  return FriendshipsModel;
}

module.exports = Friendships;