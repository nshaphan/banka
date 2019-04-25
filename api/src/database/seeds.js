import db from '../helpers/queryHelper'
import bcrypt from 'bcrypt'

/**
 * Insert multiple values in table
 * @param {String} query 
 * @param {Array} values 
 */
const insert = async (query, values) => {
    values.map(async (item) => {
        try {
            const { rows } = await db.query(query, item);
            console.log(rows);
        } catch(error) {
            console.log(error);
        }
    });
};

/**
 * Initialize database with data
 * @returns void
 */
const initializeDB = async () => {

    //password hash
    var passwordHash = bcrypt.hashSync('1234567@Bk', 10);

    // User SQL query
    const userQuery = `INSERT INTO 
    users(email, firstname, lastname, password, type, isAdmin)
    VALUES($1, $2, $3, $4, $5, $6) returning *`

    const users = [[
            'admin@banka.com',
            'kwizera',
            'eric',
            passwordHash,
            'staff',
            true
        ],
        [
            'cashier@banka.com',
            'Angel',
            'Umutoni',
            passwordHash,
            'staff',
            false
        ],
        [
            'user@banka.com',
            'Shaphan',
            'Nzabonimana',
            passwordHash,
            'client',
            false
        ]];
    
    // Insert users into the database
    await insert(userQuery, users);

    const accountQuery = `INSERT INTO 
    accounts(accountNumber, createdOn, owner, type, status, balance)
    VALUES($1, $2, $3, $4, $5, $6) returning *`;

    const accounts = [[
            '20183444095',
            '12-05-2018',
            8,
            'current',
            'active',
            2000,
        ],
        [
            '20183444096',
            '12-05-2018',
            8,
            'current',
            'active',
            2000,
        ]];
    
    // insert accounts into the database
    await insert(accountQuery, accounts);


    const transactions = [[
           '12-05-2018',
            'debit',
            '20183444095',
            1,
            3000,
            5000,
            2000
        ]];

    const transactionQuery = `INSERT INTO 
    transactions(createdOn, type, accountNumber, cashier, amount, oldBalance, newBalance)
    VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;

    // insert transactions into the database
    await insert(transactionQuery, transactions);
    
}

export { initializeDB, db, bcrypt };

require('make-runnable');