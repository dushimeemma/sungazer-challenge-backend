import { Router } from 'express';

import Transactions from '../controllers/transactions';
import Auth from '../middlewares/auth/auth';
import AsyncHandler from '../middlewares/errors/async_handler';
import { AmountSchema } from '../middlewares/validations/transactions';

const router = Router();
const transactions = new Transactions();
const auth = new Auth();

router
  .post(
    '/depose',
    auth.verifyToken,
    AmountSchema,
    AsyncHandler(transactions.create)
  )
  .post(
    '/withdraw',
    auth.verifyToken,
    AmountSchema,
    AsyncHandler(transactions.withDraw)
  )
  .get('/', auth.verifyToken, AsyncHandler(transactions.getAll))
  .get(
    '/user/transactions',
    auth.verifyToken,
    AsyncHandler(transactions.getUsersTransactions)
  );

export default router;
