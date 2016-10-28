const MESSAGE_TABLE_NAME = require('../const/tableNames').MESSAGES;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const MessageTable = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      senderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      receiverId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      content: {
        type: Sequelize.STRING,
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
    return queryInterface.createTable(MESSAGE_TABLE_NAME, MessageTable);
  },

  down: (queryInterface) =>
    queryInterface.dropTable(MESSAGE_TABLE_NAME),
};
