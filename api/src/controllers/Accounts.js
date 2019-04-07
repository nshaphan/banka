import banka from '../db/db';
import accountHelper from "../helpers/AccountHelper";

class AccountsController {

    // create new bank account
    accountCreate(req, res) {

        var account = req.body;
        var users = banka.users;

        // incrementing account id for new account
        account.id = banka.accounts.length + 1;

        // Generate new Account Number
        account.accountNumber = accountHelper.make();
        
        account.createdOn = new Date();
        account.status = 'active';

        // find user using access_token
        const accountOwner = users.find((user) => user.token === req.query.token);

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
        let accountNumber = req.params.accountNumber;
        let accounts = banka.accounts;

        // find account index using account number
        const accountIndex = accounts.findIndex((account) => account.accountNumber === accountNumber);
        
        // updating account based on account index
        if(banka.accounts[accountIndex].status == 'active') {
            banka.accounts[accountIndex].status = 'dormant';
        } else {
            banka.accounts[accountIndex].status = 'active';
        }  

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

    deleteAccount(req, res) {
        // getting account number from url
        let accountNumber = req.params.accountNumber;
        let accounts = banka.accounts;

        // find account index using account number
        const accountIndex = accounts.findIndex((account) => account.accountNumber === accountNumber);
        
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