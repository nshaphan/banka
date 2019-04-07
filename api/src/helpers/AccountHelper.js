import banka from "../db/db"

class AccountHelper {

    // A function to generate a random account number
    generate() {
        var randnumber = Math.random()
                            .toString()
                            .slice(2)
                            .substr(0, 6);

        var today = new Date();
        var year = today.getFullYear();

        return year + randnumber;
    }

    // A function to verify if account exist and return the unique account
    make() {

        let accountNumber = this.generate();
        if (!this.isAccountExisting(accountNumber)) {
            return accountNumber;
        }

        this.make();
    }

    // a function to check if a function already exist
    isAccountExisting(acc_number) {
        let accounts = banka.accounts;
        let foundAccount = accounts.find((account) => account.accountNumber === acc_number);

        return (! foundAccount) ? false : true;
    }
}

const accountHelper = new AccountHelper();
export default accountHelper;


