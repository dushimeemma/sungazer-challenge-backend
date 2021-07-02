import { Transaction, User } from '../database/models';

class TransactionController {
  async getAll(req, res) {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'username', 'email'],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json({
      message: 'Transactions retrieved successfully',
      transactions,
    });
  }
  async getUsersTransactions(req, res) {
    const transactions = await Transaction.findAll({
      where: { user: req.user.id },
      include: [
        {
          model: User,
          attributes: ['name', 'username', 'email'],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json({
      message: 'Transactions retrieved successfully',
      transactions,
    });
  }
  async create(req, res) {
    const { description, amount } = req.body;

    let newTransaction;
    let user = req.user.id;

    const checkTransaction = await Transaction.findAll({
      where: { user },
      order: [['id', 'DESC']],
    });

    if (!checkTransaction.length) {
      newTransaction = {
        description,
        amount_withdrawn: 0,
        amount_deposited: amount,
        balance: amount,
        user,
      };
    } else if (checkTransaction.length) {
      newTransaction = {
        description,
        amount_withdrawn: checkTransaction[0].amount_withdrawn,
        amount_deposited: amount,
        balance: checkTransaction[0].balance + amount,
        user,
      };
    }

    await Transaction.create(newTransaction);

    res.status(200).json({
      message: 'Transaction done successfully',
      transaction: newTransaction,
    });
  }
  async withDraw(req, res) {
    const { description, amount } = req.body;

    let newTransaction;
    let user = req.user.id;

    const checkTransaction = await Transaction.findAll({
      where: { user },
      order: [['id', 'DESC']],
    });

    if (!checkTransaction.length) {
      return res.status(400).json({
        error: 'You have no balance yet, Please depose some amount first',
      });
    } else if (checkTransaction.length) {
      if (checkTransaction[0].balance == 0) {
        return res.status(400).json({
          error: 'You have O balance, Please depose some amount',
        });
      } else if (checkTransaction[0].balance < amount) {
        return res.status(400).json({
          error:
            'The amount you want to withdraw is above your current balance',
        });
      } else if (
        checkTransaction[0].balance > 0 &&
        checkTransaction[0].balance > amount
      ) {
        newTransaction = {
          description,
          amount_withdrawn: amount,
          amount_deposited: 0,
          balance: checkTransaction[0].balance - amount,
          user,
        };
      }
    }

    await Transaction.create(newTransaction);

    res.status(200).json({
      message: 'Transaction done successfully',
      transaction: newTransaction,
    });
  }
}

export default TransactionController;
