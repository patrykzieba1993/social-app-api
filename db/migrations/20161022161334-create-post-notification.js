const POSTS_NOTIFICATIONS_TABLE = require('../const/tableNames').POSTS_NOTIFICATIONS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const notificationsTable = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
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
    return queryInterface.createTable(POSTS_NOTIFICATIONS_TABLE, notificationsTable);
  },

  down: (queryInterface) =>
    queryInterface.dropTable(POSTS_NOTIFICATIONS_TABLE),
};
