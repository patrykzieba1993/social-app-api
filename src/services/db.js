const glob = require('glob');
const path = require('path');
const cwd = process.cwd();
const Sequelize = require('sequelize');
const dbCfg = require('./../../config/db')[process.env.NODE_ENV];

const ERROR_MESSAGES = require('./../utils/const').ERROR_MESSAGES;

function setupDatabase(server, options, next) {
  if (!dbCfg) {
    throw new Error(ERROR_MESSAGES.NO_ENV_VAR);
  }

  const config = {
    logging: !process.env.DB_LOGGING_ENABLED ?
      (log) => server.log('debug', log) :
      false,
    dialect: 'postgres',
    dialectOptions: {
      ssl: !!process.env.FORCE_DB_SSL,
    },
    pool: {
      max: process.env.DB_POOL || 3,
    },
  };

  const sequelize = new Sequelize(dbCfg.url || '', config);
  const modelsPath = ['src/models/**/*.js'];

  function loadModels(patterns) {
    const files = patterns.reduce((arr, pattern) =>
      arr.concat(glob.sync(pattern, { nodir: true })), []);

    const db = files.reduce((obj, file) => {
      const associatedObj = obj;
      const filePath = path.isAbsolute(file) ? file : path.join(cwd, file);
      try {
        const model = sequelize.import(filePath);
        associatedObj[model.name] = model;
      } catch (e) {
        throw new Error(ERROR_MESSAGES.DB_LOAD_MODELS_ERROR
          .replace('{model}', filePath));
      }
      return associatedObj;
    }, {});

    Object.keys(db).forEach(modelName => {
      if ('associate' in db[modelName]) {
        try {
          db[modelName].associate(db);
        } catch (e) {
          throw new Error(ERROR_MESSAGES.DB_ASSOCIATE_MODELS_ERROR
            .replace('{message}', e.message || ''));
        }
      }
    });

    return db;
  }

  loadModels(modelsPath);

  const db = { sequelize, Sequelize };

  server.expose('db', db);

  next();
}

exports.register = setupDatabase;

exports.register.attributes = {
  name: 'database-boilerplate',
  version: '1.0.0',
};
