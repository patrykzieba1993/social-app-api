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
        UsersModel.hasMany(models.CommentsNotifications, { foreignKey: 'userId', as: 'commentNotification'});
        UsersModel.hasMany(models.PostsNotifications, { foreignKey: 'userId', as: 'postNotification'});
        UsersModel.hasMany(models.Friendships, { foreignKey: 'userId', as: 'friendship'});
      },
    },
  });
  return UsersModel;
}

module.exports = Users;