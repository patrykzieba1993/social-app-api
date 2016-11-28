const FRIENDSHIP_TABLE_NAME = require('../const/tableNames').FRIENDSHIPS;

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(FRIENDSHIP_TABLE_NAME, 'accepted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn(FRIENDSHIP_TABLE_NAME, 'accepted'),
};
