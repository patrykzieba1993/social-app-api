function Posts(sequelize, DataTypes) {
  const fields = {
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
  }

  const PostsModel = sequelize.define('Posts', fields, {
    classMethods: {
      associate: models => {},
    },
  });
  return PostsModel;
}

module.exports = Posts;