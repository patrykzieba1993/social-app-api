function Users(sequelize, DataTypes) {
  const fields = {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    sex: DataTypes.ENUM('male', 'female'),
  }

  const UsersModel = sequelize.define('Users', fields, {
    classMethods: { 
      associate: models => {
        UsersModel.hasMany(models.Comments, { foreignKey: 'userId', as: 'comment'});
        UsersModel.hasMany(models.Posts, { foreignKey: 'userId', as: 'post'});
        UsersModel.hasMany(models.CommentsNotifications, { foreignKey: 'userId', as: 'commentNotification'});
        UsersModel.hasMany(models.PostsNotifications, { foreignKey: 'userId', as: 'postNotification'});
        UsersModel.hasMany(models.Friendships, { foreignKey: 'userId', as: 'friendship'});
        UsersModel.hasMany(models.Messages, { foreignKey: 'userId', as: 'message'});
      },
      getLogin: (id) => {
        const findOpts = {
          attributes: ['login'],
          where: {
            id,
          },
        };
        
        return UsersModel.find(findOpts);
      },
      searchUsers: (query) => {
        const findOpts = {
          attributes: ['id', 'firstName', 'lastName', 'login'],
          where: {
            $or: [
              {
                login: {
                  $iLike: `%${query}%`,
                },
              },
              {
                firstName: {
                  $iLike: `%${query}%`,
                },
              },
              {
                lastName: {
                  $iLike: `%${query}%`,
                },
              },
              sequelize.where(sequelize.fn('concat', sequelize.col('firstName'), ' ', sequelize.col('lastName')), {
                $iLike: `%${query}%`,
              }),
            ]
          }
        };
        return UsersModel.findAll(findOpts);
      },
    },
  });
  return UsersModel;
}

module.exports = Users;