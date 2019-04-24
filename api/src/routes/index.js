import express from 'express'
import usersController from '../controllers/Users';
import accountsController from '../controllers/Accounts';
import transactionsController from '../controllers/Transactions';
import userValidator from '../middlewares/userValidator';
import signinValidator from '../middlewares/signinValidator';
import verifyToken from '../middlewares/verifyToken';
import banka from '../db/db'
import roles from '../helpers/roles';
import authorize from '../middlewares/authorize';
import verifySuperToken from '../middlewares/verifySuperToken';

// demo 
// import Device from '../demos/oop'; 
// import users from '../controllers/test';

const router = express.Router();

const api_version = 'v1';

const base_url = '/api/'+ api_version;

const userSignUpRequest = userValidator();
const signinRequest = signinValidator();


router.get(base_url +'/me', verifyToken, authorize([
    roles.client, 
    roles.admin, 
    roles.cashier
]), (req, res) => {
        let id = req.body.user.id;
        var userIndex = banka.users.findIndex((user) => user.id == id);
        res.json(banka.users[userIndex]);
    });

// router.get(base_url, users.create);

router.get(base_url +"/users", verifyToken, authorize([
    roles.cashier, 
    roles.admin
]), usersController.getUsers);



router.post(base_url +'/auth/signup', verifySuperToken, authorize([
    roles.public,
    roles.superuser
]), userSignUpRequest, usersController.signup);
router.post(base_url +'/auth/signin', signinRequest, usersController.signin);
router.post(base_url +'/auth/admin/setup', usersController.firstTimeSetup)

router.get(base_url +"/accounts", verifyToken, authorize([
    roles.cashier, 
    roles.admin
]), accountsController.getAccounts);

router.post(base_url +"/accounts", verifyToken, authorize([
    roles.client
]), accountsController.accountCreate);

router.post(base_url +"/accounts/:accountNumber/transactions", verifyToken, authorize([
    roles.client
]), accountsController.accountCreate);
router.patch(base_url +'/account/:accountNumber', verifyToken, authorize([
    roles.cashier, 
    roles.admin
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