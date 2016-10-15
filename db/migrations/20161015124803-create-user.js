const USER_TABLE_NAME = require('../const/tableNames').USERS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const UserTable = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING(32),
      },
      lastName: {
        type: Sequelize.STRING(32),
      },
      email: {
        type: Sequelize.STRING(32),
      },
      login: {
        type: Sequelize.STRING(32),
      },
      password: {
        type: Sequelize.STRING(128),
      },
      birthDate: {
        type: Sequelize.DATE,
      },
      sex: {
        type: Sequelize.ENUM('male', 'female'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    };
    return queryInterface.createTable(USER_TABLE_NAME, UserTable);
  },

  down: (queryInterface) =>
    queryInterface.dropTable(USER_TABLE_NAME),
};
