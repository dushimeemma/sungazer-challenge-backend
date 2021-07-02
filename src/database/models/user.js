const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: { type: DataTypes.STRING },
      username: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
    },
    {}
  );
  User.associate = (models) => { 
    User.hasMany(models.Transaction, { foreignKey: 'user' });
  };
  return User;
};

export default UserModel;
