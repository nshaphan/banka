import express from 'express'
import usersController from '../controllers/Users';
import accountsController from '../controllers/Accounts';
import transactionsController from '../controllers/Transactions';
import userValidator from '../middlewares/userValidator'
import signinValidator from '../middlewares/signinValidator'
import verifyToken from '../middlewares/verifyToken'
import roles from '../helpers/roles'
import authorize from '../middlewares/authorize'
import verifySuperToken from '../middlewares/verifySuperToken'

const router = express.Router();

const api_version = 'v1';

const base_url = '/api/'+ api_version;

const userSignUpRequest = userValidator();
const signinRequest = signinValidator();

router.get('/', (req, res) => res.redirect(base_url +'/docs'));
router.get('/api/v1', (req, res) => res.redirect(base_url +'/docs'));

router.get(base_url +"/users", verifyToken, authorize([
    roles.cashier, 
    roles.admin
]), usersController.getUsers);

router.get(base_url +'/user/:email/accounts', verifyToken, authorize([
    roles.client
]), accountsController.getAccountsByEmail);

router.post(base_url +'/auth/signup', verifySuperToken, authorize([
    roles.public,
    roles.superuser,
    roles.admin
]), userSignUpRequest, usersController.signup);

router.post(base_url +'/auth/signin', signinRequest, usersController.signin);
router.post(base_url +'/auth/admin/setup', usersController.firstTimeSetup)

router.get(base_url +"/accounts", verifyToken, authorize([
    roles.cashier, 
    roles.admin,
    roles.client
]), accountsController.getAccounts);

router.get(base_url +"/accounts/:accountNumber", verifyToken, authorize([
    roles.cashier, 
    roles.admin,
    roles.client
]), accountsController.accountDetails);

router.post(base_url +"/accounts", verifyToken, authorize([
    roles.client
]), accountsController.accountCreate);

router.patch(base_url +'/account/:accountNumber', verifyToken, authorize([
    roles.cashier, 
    roles.admin,
    roles.cashier
]), accountsController.toggleStatus);

router.delete(base_url +'/accounts/:accountNumber', verifyToken, authorize([
    roles.cashier, 
    roles.admin
]), accountsController.deleteAccount);

router.patch(base_url +'/accounts/:accountNumber/undelete', verifyToken, authorize([
    roles.cashier, 
    roles.admin
]), accountsController.undelete);

router.get(base_url +'/accounts/:accountNumber/transactions', verifyToken, authorize([
    roles.cashier, 
    roles.admin,
    roles.client
]), transactionsController.getAccountTransactions);

router.get(base_url +'/transactions', verifyToken, authorize([
    roles.cashier, 
    roles.admin
]), transactionsController.getTransactions);

router.get(base_url +'/transactions/:transactionId', verifyToken, authorize([
    roles.cashier, 
    roles.admin,
    roles.client
]), transactionsController.getTransactionById);

router.post(base_url +'/transactions/:accountNumber/debit', verifyToken, authorize([
    roles.cashier
]), transactionsController.debitAccount);

router.post(base_url +'/transactions/:accountNumber/credit', verifyToken, authorize([
    roles.cashier
]), transactionsController.creditAccount);

// OOP Demos
//router.get('/demo/oop', Device.demo);

export default router;