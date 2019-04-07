import banka from '../db/db';
import accountHelper from "../helpers/AccountHelper";

class AccountsController {
    accountCreate(req, res) {

        var account = req.body;
        var users = banka.users;

        // incrementing account id for new account
        account.id = banka.accounts.length + 1;

        // Generate new Account Number
        account.accountNumber = accountHelper.make();
        
        account.createdOn = new Date();
        account.status = 'active';

        const accountOwner = users.find((user) => user.token === req.query.token);

        account.owner = accountOwner.id;
        banka.accounts.push(account);

        let response = {
            status: 200,
            data: {
                accountNumber: account.account,
                firstname: accountOwner.firstname,
                lastname: accountOwner.lastname,
                email: accountOwner.email,
                type: account.type,
                openingBalance: account.balance

            }
        }

        res.status(200).json(response);
    
    } 
}

const accountsController = new AccountsController();
export default accountsController;