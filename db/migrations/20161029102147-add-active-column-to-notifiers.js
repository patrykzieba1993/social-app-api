const TABLE_NAMES = require('../const/tableNames');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const add = (table) => queryInterface.addColumn(table, 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
    
    return Promise.all(
      [
        TABLE_NAMES.COMMENTS_NOTIFICATIONS,
        TABLE_NAMES.POSTS_NOTIFICATIONS,
        TABLE_NAMES.MESSAGES_NOTIFICATIONS,
        TABLE_NAMES.FRIENDSHIPS_NOTIFICATIONS,
      ].map(table => add(table))
    );
  },

  down: () => {}
};
