const COMMENTS_NOTIFICATIONS_TABLE = require('../const/tableNames').COMMENTS_NOTIFICATIONS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const notificationsTable = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      commentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
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
    return queryInterface.createTable(COMMENTS_NOTIFICATIONS_TABLE, notificationsTable);
  },

  down: (queryInterface) =>
    queryInterface.dropTable(COMMENTS_NOTIFICATIONS_TABLE),
};
