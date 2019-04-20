import banka from '../db/db';
import accountHelper from "../helpers/AccountHelper";
import db from "../helpers/queryHelper";
 
class AccountsController {

    async getAccounts(req, res) {

        const accountsQuery = "SELECT * FROM accounts";
    
        try {
            const { rows, rowCount } = await db.query(accountsQuery);
            return res.status(200).send({ 
                status: 200,
                rows: rowCount,
                data: rows   
            });
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to retieve accounts, try again"
            });
        }
    }
    // create new bank account
    accountCreate(req, res) {

        var { type } = req.body;
        type = type.toLowerCase();

        if(type != 'current' && type != 'savings') {
            res.status(400).json({
                status: 400,
                error: "invalid account type, type can be either savings or current"
            });
        }

        var users = banka.users;
        // find logged in user
        const accountOwner = users.find((user) => user.id == req.body.user.id);
        
        let account = {};
        // incrementing account id for new account
        account.id = banka.accounts.length + 1;

        // Generate new Account Number
        account.accountNumber = accountHelper.make();
        account.type = type;
        account.balance = 0;
        account.createdOn = new Date();
        account.status = 'active';

        account.owner = accountOwner.id;
        banka.accounts.push(account);

        let response = {
            status: 200,
            data: {
                accountNumber: account.accountNumber,
                firstname: accountOwner.firstname,
                lastname: accountOwner.lastname,
                email: accountOwner.email,
                type: account.type,
                openingBalance: account.balance

            }
        }

        res.status(200).json(response);
    
    }

    // change account status from active to dormant and vice-versa
    toggleStatus(req, res) {
        
        // getting account number from url
        let { accountNumber } = req.params;
        let { status } = req.body;
        let { accounts } = banka;

        // find account index using account number
        const accountIndex = accounts.findIndex((account) => account.accountNumber === accountNumber);
        
        if(accountIndex < 0) {
            res.status(400).json({
                status: 400,
                error: "invalid user account"
            });
        }

        status = status.toLowerCase();
        let accountStatus = banka.accounts[accountIndex].status;
        
        if(status != 'active' && status != 'dormant') {
            res.json({
                error: 400,
                message: "Account can be either active or dormant "
            });
        }
        
        if(status == accountStatus) {
            res.json({
                error: 400,
                message: "Account is already "+ status
            });
        }

        // updating account based on account index
        banka.accounts[accountIndex].status = status; 

        // response object
        let response = {
            status: 200,
            data: {
                accountNumber: banka.accounts[accountIndex].accountNumber,
                status: banka.accounts[accountIndex].status
            }
        }

        res.status(200).json(response);
    }

    // Delete a user account
    deleteAccount(req, res) {
        // getting account number from url
        let { accountNumber } = req.params;
        let accounts = banka.accounts;

        // find account index using account number
        const accountIndex = accounts.findIndex((account) => account.accountNumber === accountNumber);
        
        if(accountIndex < 0) {
            res.status(400).json({
                status: 400,
                error: "invalid user account"
            });
        }

        let isAccountDeleted = banka.accounts[accountIndex].deletedAt;

        if(isAccountDeleted) {
            res.status(400).json({
                status: 400,
                error: "Account doesn't exist"
            });
        }

        // updating deletedAt Account property
        banka.accounts[accountIndex].deletedAt = new Date();
            

        let response = {
            status: 200,
            message: "Account successfully deleted"
        }

        res.json(response);
    }
    
}

const accountsController = new AccountsController();
export default accountsController;