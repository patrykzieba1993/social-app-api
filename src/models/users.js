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
      associate: models => {},
    },
  });
  return UsersModel;
}

module.exports = Users;