function Comments(sequelize, DataTypes) {
  const fields = {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.STRING,
  }

  const CommentsModel = sequelize.define('Comments', fields, {
    classMethods: {
      associate: models => {
        CommentsModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user'});
        CommentsModel.hasMany(models.CommentsNotifications, { foreignKey: 'commentId', as: 'comment' });
      },
      getComment: commentId => {
        const models = CommentsModel.sequelize.models;
        const findOpts = {  
          include: {
            model: models.Users,
            as: 'user',
            attributes: ['firstName', 'lastName'],
          },
          where: {
            id: commentId,
          },
          attributes: {
            exclude: ['updateAt', 'deletedAt'],
          },
        };
        return CommentsModel.find(findOpts);
      },
      getComments: postsIds => {
        const models = CommentsModel.sequelize.models;
        const findOpts = {
          include: {
            model: models.Users,
            as: 'user',
            attributes: ['firstName', 'lastName'],
          },
          where: {
            $or: postsIds.map(post => { return { postId: post} })
          },
          attributes: {
            exclude: ['updatedAt', 'deletedAt'],
          },
          order: '"createdAt" ASC',
        };
        return CommentsModel.findAll(findOpts);
      },
    },
  });
  return CommentsModel;
}

module.exports = Comments;