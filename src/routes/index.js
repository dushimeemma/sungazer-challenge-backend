import { Router } from 'express';

import auth from './auth';
import transactions from './transactions';

const router = Router();

router.use('/auth', auth);
router.use('/transactions', transactions);

export default router;
