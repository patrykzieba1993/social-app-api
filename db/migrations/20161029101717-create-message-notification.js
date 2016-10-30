const MESSAGES_NOTIFICATIONS_TABLE = require('../const/tableNames').MESSAGES_NOTIFICATIONS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const notificationsTable = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      messageId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Messages',
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
    return queryInterface.createTable(MESSAGES_NOTIFICATIONS_TABLE, notificationsTable);
  },

  down: (queryInterface) =>
    queryInterface.dropTable(MESSAGES_NOTIFICATIONS_TABLE),
};
