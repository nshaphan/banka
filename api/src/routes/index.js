import express from 'express'
import usersController from '../controllers/Users';
import accountsController from '../controllers/Accounts';
import transactionsController from '../controllers/Transactions';

const router = express.Router();

const api_version = 'v1';

const base_url = '/api/'+ api_version;

router.get(base_url +'/users', usersController.getUsers);
router.post(base_url +'/auth/signup', usersController.signup);
router.post(base_url +'/auth/signin', usersController.signin);

router.post(base_url +"/accounts", accountsController.accountCreate);
router.patch(base_url +'/account/:accountNumber', accountsController.toggleStatus);
router.delete(base_url +'/accounts/:accountNumber', accountsController.deleteAccount);

router.post(base_url +'/transactions/:accountNumber/debit', transactionsController.debitAccount);
router.post(base_url +'/transactions/:accountNumber/credit', transactionsController.creditAccount);


export default router;