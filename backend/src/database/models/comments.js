module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'comments',
    {
      postId: DataTypes.UUID,
      userId: DataTypes.INTEGER,
      body: DataTypes.TEXT,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      deletedAt: DataTypes.DATE,
    },
    {
      paranoid: true,
    }
  );

  Comment.associate = function (models) {
    Comment.belongsTo(models.users, { foreignKey: 'userId', as: 'profile' });
    Comment.belongsTo(models.posts, { foreignKey: 'postId', as: 'posts' });
  };
  return Comment;
};
