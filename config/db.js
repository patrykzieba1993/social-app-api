require('dotenv').load({ silent: true });

const config = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
};

module.exports = config;
