import db from '../helpers/queryHelper'
import bcrypt from 'bcrypt'

let users = [];
let accounts = [];
let result = [];

/**
 * Insert multiple values in table
 * @param {String} query 
 * @param {Array} values 
 */
const insert = async (query, values) => {
    
    values.map(async (item) => {
        try {
            const { rows } = await db.query(query, item);
            // console.log(rows);
            result.push(rows[0]);
            // console.log(result); 
        } catch(error) {
            console.log(error);
        }
    });
    
    // console.log(result);
};

const initializeUsers = async () => {
    //password hash
    var passwordHash = bcrypt.hashSync('1234567@Bk', 10);

    // User SQL query
    const userQuery = `INSERT INTO 
    users(email, firstname, lastname, password, type, isAdmin)
    VALUES($1, $2, $3, $4, $5, $6) returning *`

    const usersValues = [[
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
    await insert(userQuery, usersValues);
    
};

const initializeAccounts = async () => {
    const accountQuery = `INSERT INTO 
    accounts(accountNumber, createdOn, owner, type, status, balance)
    VALUES($1, $2, $3, $4, $5, $6) returning *`;

    const accountsValues = [[
            '20183444095',
            '12-05-2018',
            3,
            'current',
            'active',
            2000,
        ],
        [
            '20183444096',
            '12-05-2018',
            3,
            'current',
            'active',
            2000,
        ]];
    
    // insert accounts into the database
    let rows = await insert(accountQuery, accountsValues);
    accounts = rows;
};

const initializeTransactions = async () => {

    const transactions = [[
        '12-05-2018',
         'debit',
         '20183444095',
         2,
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

let resetUsers = async () => {
    const userTable = 'TRUNCATE TABLE users';
    try {
        const res = await db.query(userTable);
        // console.log(res);
    } catch(error) {
        console.log(error);
    }
}

let resetAccounts = async () => {
    const accountTable = 'TRUNCATE TABLE accounts';
    try {
        const res = await db.query(accountTable);
        // console.log(res);
    } catch(error) {
        console.log(error);
    }
}

let resetTransactions = async () => {
    const transactionTable = 'TRUNCATE TABLE transactions';
    try {
        const res = await db.query(transactionTable);
        //console.log(res);
    } catch(error) {
        console.log(error);
    }
}

/**
 * Initialize database with data
 * @returns void
 */
const initializeDB = async () => {   
    initializeUsers();
    initializeAccounts();
    initializeTransactions();
}

const resetDB = async () => {
    resetUsers();
    resetAccounts();
    resetTransactions();
}


export { 
    db, 
    bcrypt, 
    resetUsers,
    resetAccounts,
    resetTransactions,
    initializeUsers,
    initializeAccounts,
    initializeTransactions,
    initializeDB,
    resetDB 
 };

require('make-runnable');