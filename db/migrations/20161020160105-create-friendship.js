const FRIENDSHIP_TABLE_NAME = require('../const/tableNames').FRIENDSHIPS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const friendshipsTable = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      friendId: {
        type: Sequelize.INTEGER,
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
    return queryInterface.createTable(FRIENDSHIP_TABLE_NAME, friendshipsTable);
  },

  down: (queryInterface) =>
    queryInterface.dropTable(FRIENDSHIP_TABLE_NAME),
};
