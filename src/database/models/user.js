module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: {
      type: DataType.STRING,
    },
    email: {
      type: DataType.STRING,
    },
    password: {
      type: DataType.STRING,
    },
    image: {
      type: DataType.STRING,
    },
  });

  return User;
};