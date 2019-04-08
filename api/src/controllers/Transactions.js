import banka from '../db/db';

class Transaction {
    debitAccount(req, res) {
        // getting account number from url
        let accountNumber = req.params.accountNumber;
        let accounts = banka.accounts;
        let users = banka.users;

        // find user using access_token
        const cashier = users.find((user) => user.token === req.query.token);

        // find account index using account number
        const accountIndex = accounts.findIndex((account) => account.accountNumber === accountNumber);
        

        let transaction = {
            id: banka.users.length + 1,
            createOn: new Date(),
            type: 'debit',
            accountNumber: accountNumber,
            cashier: cashier.id,
            amount: req.body.amount,
            // retrieving existing old balance 
            oldBalance: banka.accounts[accountIndex].balance,
            // reducing transaction amount from existing balance
            newBalance: parseFloat(banka.accounts[accountIndex].balance) - parseFloat(req.body.amount)
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

        // find user using access_token
        const cashier = users.find((user) => user.token === req.query.token);

        // find account index using account number
        const accountIndex = accounts.findIndex((account) => account.accountNumber === accountNumber);
        

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