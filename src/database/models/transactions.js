const TransactionModel = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      description: { type: DataTypes.STRING },
      amount_withdrawn: { type: DataTypes.INTEGER },
      amount_deposited: { type: DataTypes.INTEGER },
      balance: { type: DataTypes.INTEGER },
      user: {
        type: DataTypes.INTEGER,
        references: { model: 'User', key: 'id' },
      },
    },
    {}
  );
  Transaction.associate = (models) => { 
    Transaction.belongsTo(models.User, {
      foreignKey: 'user',
      onDelete: 'CASCADE',
    });
  };
  return Transaction;
};

export default TransactionModel;
