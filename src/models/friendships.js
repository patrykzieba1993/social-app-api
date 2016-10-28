function Friendships(sequelize, DataTypes) {
  const fields = {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER,
  }

  const FriendshipsModel = sequelize.define('Friendships', fields, {
    classMethods: {
      associate: models => {
        FriendshipsModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
      },
      getFriendsWithData: (userId, login) => {
        return sequelize.query(`
          select "Friendships"."id", "userId", "friendId", "firstName", "lastName", "login"
          from "Friendships" 
          join "Users" on "Users"."id" = "Friendships"."userId" or "Users"."id" = "Friendships"."friendId"
          where login != :login and ("Friendships"."userId" = :userId or "Friendships"."friendId" = :userId)`,
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