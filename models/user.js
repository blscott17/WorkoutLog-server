module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true,
    },
    passwordhash: {
      type: DataTypes.STRING,
      allownull: false,
    },
  });
  return User;
};
