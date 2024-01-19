module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'posts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userId: DataTypes.INTEGER,
      category: DataTypes.STRING,
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      paranoid: true,
    }
  );

  Post.associate = function (models) {
    Post.belongsTo(models.users, { foreignKey: 'userId', as: 'profile' });
    Post.hasMany(models.comments, { as: 'comments' });
  };
  return Post;
};
