import banka from '../db/db';

class Transaction {
    getTransactions(req, res) {
        let transactions = banka.transactions;
        res.json(transactions);
    }

    debitAccount(req, res) {
        // getting account number from url
        let { accountNumber } = req.params;
        let { amount } = req.body;
        let { accounts } = banka;
        let { users } = banka;

        // find cashier
        const cashier = users.find((user) => user.id == req.body.user.id);

        // find account index using account number
        const accountIndex = accounts.findIndex((account) => account.accountNumber === accountNumber);
        
        if(accountIndex < 0) {
            res.status(400).json({
                status: 400,
                error: "invalid user account"
            });
        }
        let isAccountDeleted = banka.accounts[accountIndex].deletedAt;
        let isAccountDormant = banka.accounts[accountIndex].status != 'active' ? true : false;

        if(isAccountDeleted || isAccountDormant) {
            res.status(400).json({
                status: 400,
                error: "Account doesn't exist or it is deactivated"
            });
        }

        let oldBalance = parseFloat(banka.accounts[accountIndex].balance);
        amount = parseFloat(amount);
        
        if(oldBalance < amount) {
            res.status(400).json({
                status: 400,
                error: "insufficient balance"
            });
        }

        let transaction = {
            id: banka.users.length + 1,
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

        banka.accounts[accountIndex].balance = transaction.newBalance;

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
        res.json(response);
    }

    creditAccount(req, res) {
        // getting account number from url
        let accountNumber = req.params.accountNumber;
        let accounts = banka.accounts;
        let users = banka.users;

        // find cashier
        const cashier = users.find((user) => user.id == req.body.user.id);

        // find account index using account number
        const accountIndex = accounts.findIndex((account) => account.accountNumber === accountNumber);
        
        if(accountIndex < 0) {
            res.status(400).json({
                status: 400,
                error: "invalid user account"
            });
        }
        let isAccountDeleted = banka.accounts[accountIndex].deletedAt;
        let isAccountDormant = banka.accounts[accountIndex].status != 'active' ? true : false;

        if(isAccountDeleted || isAccountDormant) {
            res.status(400).json({
                status: 400,
                error: "Account doesn't exist or it is deactivated"
            });
        }

        let transaction = {
            id: banka.users.length + 1,
            createOn: new Date(),
            type: 'credit',
            accountNumber: accountNumber,
            cashier: cashier.id,
            amount: req.body.amount,
            // retrieving existing old balance 
            oldBalance: banka.accounts[accountIndex].balance,
            // reducing transaction amount from existing balance
            newBalance: parseFloat(banka.accounts[accountIndex].balance) + parseFloat(req.body.amount)
        }

        banka.accounts[accountIndex].balance = transaction.newBalance;

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
        res.json(response);
    }
}

const transactionsController = new Transaction();
export default transactionsController;