const FRIENDSHIPS_NOTIFICATIONS_TABLE = require('../const/tableNames').FRIENDSHIPS_NOTIFICATIONS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const notificationsTable = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      friendshipId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Friendships',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
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
    return queryInterface.createTable(FRIENDSHIPS_NOTIFICATIONS_TABLE, notificationsTable);
  },

  down: (queryInterface) =>
    queryInterface.dropTable(FRIENDSHIPS_NOTIFICATIONS_TABLE),
};
