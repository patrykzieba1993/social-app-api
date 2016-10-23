const POSTS_NOTIFICATIONS_TABLE = require('../const/tableNames').POSTS_NOTIFICATIONS;

module.exports = {
  up: (queryInterface, Sequelize) =>
   queryInterface.addColumn(POSTS_NOTIFICATIONS_TABLE, 'status', {
     type: Sequelize.INTEGER,
     allowNull: false,
     defaultValue: 0,
   }),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn(POSTS_NOTIFICATIONS_TABLE, 'status'),
};
