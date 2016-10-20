const COMMENTS_TABLE_NAME = require('../const/tableNames').COMMENTS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const CommentsTable = {
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
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id',
        },
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.createTable(COMMENTS_TABLE_NAME, CommentsTable);
  },

  down: (queryInterface) =>
    queryInterface.dropTable(COMMENTS_TABLE_NAME),
};
