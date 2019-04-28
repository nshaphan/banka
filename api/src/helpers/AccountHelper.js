import db from "../helpers/queryHelper";

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
    make(allAccounts) {

        let accountNumber = this.generate();
        if (!this.isAccountExisting(accountNumber, allAccounts)) {
            return accountNumber;
        }

        this.make(allAccounts);
    }

    // a function to check if a function already exist
    isAccountExisting(acc_number, allAccounts) {
        let foundAccount = allAccounts.find((account) => account == acc_number);

        return (! foundAccount) ? false : true;
    }
}

const accountHelper = new AccountHelper();
export default accountHelper;


