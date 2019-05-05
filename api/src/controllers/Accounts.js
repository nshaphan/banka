import accountHelper from "../helpers/AccountHelper";
import db from "../helpers/queryHelper";

class AccountsController {

    /**
     * Get all bank accounts
     * @param {Object} req 
     * @param {Object} res 
     */
    async getAccounts(req, res) {
        let currentUser = req.body.user;

        let values =[];
        let accountsQuery = "SELECT accounts.*, users.firstname, users.lastname FROM accounts, users";
        let { status } = req.query;

        if(status && currentUser.role == 'client') {
            accountsQuery = accountsQuery + ` WHERE users.id = accounts.owner 
                                        AND accounts.status = $1 AND accounts.owner = $2`;
            values.push(status);
            values.push(currentUser.id);
        } else if (status) {
            accountsQuery = accountsQuery + ` WHERE users.id = accounts.owner 
                                        AND accounts.status = $1`;
            values.push(status);
        } else if(currentUser.role == 'client') {
            accountsQuery +=` WHERE users.id = accounts.owner 
                                AND  owner = $1`;
            values.push(currentUser.id);
        }
        // console.log(accountsQuery, values);
        try {
            // query database for accounts
            if(values.length <= 0) {
                const { rows, rowCount } = await db.query(accountsQuery);
                return res.status(200).send({ 
                    status: 200,
                    rows: rowCount,
                    data: rows   
                });
            } else {
                const { rows, rowCount } = await db.query(accountsQuery, values);
                return res.status(200).send({ 
                    status: 200,
                    rows: rowCount,
                    data: rows   
                });
            }  
            
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to retieve accounts, try again"
            });
        }
    }

    /**
     * Create new bank account
     * @param {Object} req 
     * @param {Object} res 
     */
    async accountCreate(req, res) {
        let { type } = req.body;
        type = type.toLowerCase();

        // check if valid account type is sent
        if(type != 'current' && type != 'savings') {
            return res.status(400).json({
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

        const allAccountsQuery = "SELECT accountNumber FROM accounts";

        let allAccounts = [];
        try {
            let { rows } = await db.query(allAccountsQuery);          
            rows.map(account => allAccounts.push(account.accountnumber));
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Problem with server, try again"
            });
        }
        
        // Generate new Account Number
        account.accountNumber = accountHelper.make(allAccounts);
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
                message: "Unable to add new account, try again"
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

    /**
     * Change account status from active to dormant and vice-versa
     * @param {Object} req 
     * @param {Object} res 
     */
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
        const statUpQuery = `UPDATE accounts SET status = $1 WHERE accountNumber = $2 returning *`;
        const values = [
            status,
            accountNumber
        ];

        let result = {};
        try {
            // updating bank account status
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
                accountNumber: result.accountNumber,
                status: result.status
            }
        }

        res.status(200).json(response);
    }

    /**
     * Delete a user account
     * @param {Object} req 
     * @param {Object} res 
     */
    async deleteAccount(req, res) {
        // getting account number from url
        let { accountNumber } = req.params;
        
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

        let isAccountDeleted = account.deletedat;

        if(isAccountDeleted) {
            return res.status(400).json({
                status: 400,
                error: "Account doesn't exist"
            });
        }

        // updating account status
        const accDelQuery = `UPDATE accounts SET deletedAt = $1 WHERE accountNumber = $2`;
        const values = [
            new Date(),
            accountNumber
        ];

        try {
            // Deleting bank account
            await db.query(accDelQuery, values);
            return res.json({
                status: 200,
                message: "Account successfully deleted"
            });
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to delete account, try again later"
            });
        }
    }
    
    /**
     * Restore Deleted account
     * @param {Object} req 
     * @param {Object} res 
     */
    async undelete(req, res) {
        let { accountNumber } = req.params;
        // updating account status
        const accDelQuery = `UPDATE accounts SET deletedAt = $1 WHERE accountNumber = $2`;
        const values = [
            null,
            accountNumber
        ];

        try {
            // Deleting bank account
            await db.query(accDelQuery, values);
            return res.json({
                status: 200,
                message: "Account successfully restored"
            });
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to delete account, try again later"
            });
        }
    }

    /**
     * Get all accounts by email
     * @param {Object} req 
     * @param {Object} res 
     */
    async getAccountsByEmail(req, res) {

        let currentUser = req.body.user;
        
        let accountsQuery = `SELECT accounts.* FROM accounts, users
        WHERE accounts.owner = users.id`;

        const { email } = req.params;
        let values = [
            email
        ];

        if(currentUser.role == 'client') {
            accountsQuery +=` AND ( users.email = $1 AND users.id = $2 ) `;
            values.push(currentUser.id);
        } else {
            accountsQuery += ` AND users.email = $1`;
        }

        try {
            // query database for accounts
            const { rows, rowCount } = await db.query(accountsQuery, values); 

            if(rowCount == 0) {
                return res.json({
                    status: 200,
                    data: rows
                })
            }
            return res.status(200).send({ 
                status: 200,
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

    /**
     * Get a specific account details
     * @param {Object} req
     * @param {Object} res 
     */
    async accountDetails(req, res) {
        let currentUser = req.body.user;
        let accountsQuery = `SELECT accounts.*, users.firstname, users.lastname FROM accounts,users WHERE accountNumber = $1` ;

        const { accountNumber } = req.params;
        const values = [
            accountNumber
        ];

        if(currentUser.role == 'client') {
            accountsQuery +=` AND owner = $2 `;
            values.push(currentUser.id);
        } else {
            accountsQuery + ` users.email = $1`;
        }
        try {
            // query database for accounts
            const { rows, rowCount } = await db.query(accountsQuery, values); 

            return res.status(200).send({ 
                status: 200,
                data: rows   
            });
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to retieve account, try again"
            });
        }
    }
 
}


const accountsController = new AccountsController();
export default accountsController;