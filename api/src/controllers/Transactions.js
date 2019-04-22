import db from '../helpers/queryHelper'

class Transaction {

    /**
     * Get all transactions
     * @param {Object} req 
     * @param {Object} res 
     */
    async getTransactions(req, res) { 
        let transactionsQuery = "SELECT * FROM transactions";
        
        try {
            // query database for transactions
            const { rows, rowCount } = await db.query(transactionsQuery);

            return res.status(200).send({ 
                status: 200,
                rowCount: rowCount,
                data: rows   
            });
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to retrieve transactions, try again"
            });
        }
    }

    /**
     * Debit the account
     * @param {Object} req 
     * @param {Object} res 
     */
     async debitAccount(req, res) {
        // getting account number from url
        let { accountNumber } = req.params;
        let { amount } = req.body;
        
        // find logged in user
        let cashier = {};
        const userQuery = "SELECT * FROM users WHERE id = $1"; 
        try {
            let { rows } = await db.query(userQuery, [req.body.user.id]);
            cashier = rows[0];            
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Problem with server, try again"
            });
        }

        // find user bank account
        let account = {};
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
        let isAccountDormant = account.status != 'active' ? true : false;

        if(isAccountDeleted || isAccountDormant) {
            res.status(400).json({
                status: 400,
                error: "Account doesn't exist or it is deactivated"
            });
        }

        let oldBalance = parseFloat(account.balance);
        amount = parseFloat(amount);
        
        if(oldBalance < amount) {
            res.status(400).json({
                status: 400,
                error: "insufficient balance"
            });
        }

        let transaction = {
            createOn: new Date(),
            type: 'debit',
            accountNumber: accountNumber,
            cashier: cashier.id,
            amount: req.body.amount,
            // retrieving existing old balance 
            oldBalance: oldBalance,
            // reducing transaction amount from existing balance
            newBalance: oldBalance - amount
        }

        const transactionQuery = `INSERT INTO 
        transactions(createdOn, type, accountNumber, cashier, amount, oldBalance, newBalance)
        VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;
        
        const values = [
            transaction.createOn,
            transaction.type,
            transaction.accountNumber,
            transaction.cashier,
            transaction.amount,
            transaction.oldBalance,
            transaction.newBalance
        ];

        let result = {};
        try {
            // insert a new bank account into db
            const { rows } = await db.query(transactionQuery, values); 
            result = rows[0];
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to process transaction, try again"
            });
        }
        // update account balance
        const balUpQuery = `UPDATE accounts SET balance = $1 WHERE accountNumber = $2 returning *`;
        const upValues = [
            transaction.newBalance,
            accountNumber
        ];

        try {
            // updating bank account balance
            const { rows } = await db.query(balUpQuery, upValues); 
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to update account balance, try again later"
            });
        }

        let response = {
            status: 200,
            data: {
                transactionId: transaction.id,
                accountNumber: transaction.accountNumber,
                amount: transaction.amount,
                cashier: transaction.cashier,
                transactionType: transaction.type,
                accountBalance: transaction.newBalance
            }
        }

        // Send response object
        return res.json(response);
    }

    /**
     * Debit the account
     * @param {Object} req 
     * @param {Object} res 
     */
    async creditAccount(req, res) {
        // getting account number from url
        let accountNumber = req.params.accountNumber;
        let { amount } = req.body;
        
        // find logged in user
        let cashier = {};
        const userQuery = "SELECT * FROM users WHERE id = $1"; 
        try {
            let { rows, rowCount } = await db.query(userQuery, [req.body.user.id]);
            cashier = rows[0];            
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Problem with server, try again"
            });
        }

        // find user bank account
        let account = {};
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
        let isAccountDormant = account.status != 'active' ? true : false;

        if(isAccountDeleted || isAccountDormant) {
            res.status(400).json({
                status: 400,
                error: "Account doesn't exist or it is deactivated"
            });
        }

        amount = parseFloat(amount);

        let transaction = {
            createOn: new Date(),
            type: 'credit',
            accountNumber: accountNumber,
            cashier: cashier.id,
            amount: req.body.amount,
            // retrieving existing old balance 
            oldBalance: account.balance,
            // reducing transaction amount from existing balance
            newBalance: parseFloat(account.balance) + parseFloat(req.body.amount)
        }

        const transactionQuery = `INSERT INTO 
        transactions(createdOn, type, accountNumber, cashier, amount, oldBalance, newBalance)
        VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;
        
        const values = [
            transaction.createOn,
            transaction.type,
            transaction.accountNumber,
            transaction.cashier,
            transaction.amount,
            transaction.oldBalance,
            transaction.newBalance
        ];

        let result = {};
        try {
            // insert a new bank account into db
            const { rows } = await db.query(transactionQuery, values); 
            result = rows[0];
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to process transaction, try again"
            });
        }
        // update account balance
        const balUpQuery = `UPDATE accounts SET balance = $1 WHERE accountNumber = $2 returning *`;
        const upValues = [
            transaction.newBalance,
            accountNumber
        ];

        try {
            // updating bank account balance
            const { rows } = await db.query(balUpQuery, upValues); 
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to update account balance, try again later"
            });
        }

        let response = {
            status: 200,
            data: {
                transactionId: transaction.id,
                accountNumber: transaction.accountNumber,
                amount: transaction.amount,
                cashier: transaction.cashier,
                transactionType: transaction.type,
                accountBalance: transaction.newBalance
            }
        }

        // Send response object
        return res.json(response);
    }

    /**
     * Get specific account's transactions
     * @param {Object} req 
     * @param {Object} res 
     */
    async getAccountTransactions(req, res) {
        const { accountNumber } = req.params;
        const transactionsQuery = "SELECT * FROM transactions WHERE accountnumber = $1";

        const values = [
            accountNumber    
        ];

        try {
            const { rows, rowCount } = await db.query(transactionsQuery, values);
            return res.status(200).send({ 
                status: 200,
                rowCount: rowCount,
                data: rows   
            });
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to retrieve transactions, try again"
            });
        }
    }

    /**
     * Get Transaction details by id
     * @param {Object} req 
     * @param {Object} res 
     */
    async getTransactionById(req, res) {
        const { transactionId } = req.params;
        const transactionsQuery = "SELECT * FROM transactions WHERE id = $1";

        const values = [
            transactionId    
        ];

        try {
            const { rows } = await db.query(transactionsQuery, values);
            return res.status(200).send({ 
                status: 200,
                data: rows   
            });
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to retrieve transaction, try again"
            });
        }

    }
}

const transactionsController = new Transaction();
export default transactionsController;