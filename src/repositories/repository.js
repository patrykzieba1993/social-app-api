const Database = require('./../services/db');

class Repository {
  constructor(opts) {
    const plugins = opts.server.plugins;
    const dbClient = plugins[Database.register.attributes.name].db.sequelize;
    this.models = dbClient.models;
  }
}

module.exports = Repository;
