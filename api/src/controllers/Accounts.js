import banka from '../db/db';
import accountHelper from "../helpers/AccountHelper";
import db from "../helpers/queryHelper";

class AccountsController {

    /**
     * Get all bank accounts
     * @param {Object} req 
     * @param {Object} res 
     */
    async getAccounts(req, res) {

        const accountsQuery = "SELECT * FROM accounts";
        try {
            // query database for accounts
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
    async accountCreate(req, res) {
        let { type } = req.body;
        type = type.toLowerCase();

        // check if valid account type is sent
        if(type != 'current' && type != 'savings') {
            res.status(400).json({
                status: 400,
                error: "invalid account type, type can be either savings or current"
            });
        }

        // find logged in user
        let user = {};
        const userQuery = "SELECT * FROM users WHERE id = $1"; 
        try {
            let { rows, rowCount } = await db.query(userQuery, [req.body.user.id]);
            user = rows[0];            
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Problem with server, try again"
            });
        }
        const accountOwner = user;
        
        let account = {};

        // Generate new Account Number
        account.accountNumber = accountHelper.make();
        account.type = type;
        account.balance = 0;
        account.createdOn = new Date();
        account.status = 'active';

        account.owner = accountOwner.id;

        const accountQuery = `INSERT INTO 
        accounts(accountNumber, createdOn, owner, type, status, balance)
        VALUES($1, $2, $3, $4, $5, $6) returning *`;
        const values = [
            account.accountNumber,
            account.createdOn,
            account.owner,
            account.type,
            account.status,
            account.balance
        ];

        let result = [];
        try {
            // insert a new bank account into db
            const { rows } = await db.query(accountQuery, values); 
            result = rows[0];
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to save user, try again"
            });
        }

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
    async toggleStatus(req, res) {
        
        // getting account number from url
        let { accountNumber } = req.params;
        let { status } = req.body;
        
        let account = {}
        // find account index using account number
        const accountQuery = "SELECT * FROM accounts WHERE accountNumber = $1"; 
        try {
            let { rows, rowCount } = await db.query(accountQuery, [accountNumber]);
            if(rowCount <= 0) {
                return res.status(400).json({
                    status: 400,
                    error: "Invalid account number"
                });
            }
            account = rows[0];            
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Problem with server, try again"
            });
        }

        // changing status case to lower for compatibility
        status = status.toLowerCase();

        let accountStatus = account.status;
        if(status != 'active' && status != 'dormant') {
            return res.json({
                error: 400,
                message: "Account can be either active or dormant "
            });
        }
        
        // Alerting user when sent status is like current account status
        if(status == accountStatus) {
            return res.json({
                error: 400,
                message: "Account is already "+ status
            });
        }

        // updating account status
        const statUpQuery = `UPDATE account SET status = $1 WHERE accountNumber = $2`;
        const values = [
            status,
            accountNumber
        ];

        try {
            // insert a new bank account into db
            const { rows } = await db.query(statUpQuery, values); 
            result = rows[0];
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to update account status, try again later"
            });
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