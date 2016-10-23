const COMMENTS_NOTIFICATIONS_TABLE = require('../const/tableNames').COMMENTS_NOTIFICATIONS;

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(COMMENTS_NOTIFICATIONS_TABLE, 'status', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn(COMMENTS_NOTIFICATIONS_TABLE, 'status'),
};