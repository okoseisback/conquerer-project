const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'tokens',
    {
      token: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      expires: DataTypes.DATE,
    },
    {}
  );
  Token.associate = (models) => {
    Token.belongsTo(models.users, { foreignKey: 'userId', as: 'user' });
  };
  return Token;
};
