const transliteration = require('transliteration');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
      },
      location: {
        type: DataTypes.JSON,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {}
  );

  User.beforeCreate(async (user) => {
    const baseUsername = transliteration.slugify(user.fullName, { lowercase: true, separator: '_' });
    let username = baseUsername;

    let count = 1;
    while (await User.findOne({ where: { userName: username } })) {
      username = `${baseUsername}${count.toString()}`;
      count++;
    }

    user.userName = username;
  });

  User.associate = (models) => {
    User.hasMany(models.tokens, { as: 'tokens' });
    User.hasMany(models.posts, { as: 'posts' });
    User.hasMany(models.comments, { as: 'comments' });
  };
  return User;
};
