import banka from '../db/db';

class AccountsController {
    accountCreate(req, res) {
        
        banka.users.forEach(user => {
            if(user.token == req.params.token) {

                var account = req.body;

                account.id = banka.accounts.length + 1;
                account.accountNumber = '20183444094';
                account.createdOn = new Date();
                account.status = 'active';

                account.owner = user.id;

                banka.accounts.push(account);

                res.json(account);
                
            }
        });
    } 
}

const accountsController = new AccountsController();
export default accountsController;