import db from '../helpers/queryHelper';
require('dotenv').config();

const createTables = async () => {
    const userTable = `CREATE TABLE IF NOT EXISTS
        users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            isAdmin BOOLEAN NOT NULL
        )`;

    try {
        const res = await db.query(userTable);
        console.log(res);
    } catch(error) {
        console.log(error);
    }
    
    const accountTable = `CREATE TABLE IF NOT EXISTS 
    accounts(
        id SERIAL PRIMARY KEY,
        accountNumber VARCHAR(25) NOT NULL,
        createdOn DATE NOT NULL,
        owner INT NOT NULL,
        type VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        balance FLOAT NOT NULL
    )`;

    try {
        const res = await db.query(accountTable);
        console.log(res);
    } catch(error) {
        console.log(error);
    }

    const transactionTable = `CREATE TABLE IF NOT EXISTS
    transactions(
        id SERIAL PRIMARY KEY,
        createdOn DATE NOT NULL,
        type VARCHAR(255) NOT NULL,
        accountNumber VARCHAR(255) NOT NULL,
        cashier INT NOT NULL,
        amount FLOAT NOT NULL,
        oldBalance FLOAT NOT NULL,
        newBalance FLOAT NOT NULL
    )`;

    try {
        const res = await db.query(transactionTable);
        console.log(res);
    } catch(error) {
        console.log(error);
    }
    
};


// Drop tables
const dropTables = async () => {
  const userTable = 'DROP TABLE IF EXISTS users';
    try {
        const res = await db.query(userTable);
        console.log(res);
    } catch(error) {
        console.log(error);
    }
}

// export pool and createTables
export { createTables, db };

require('make-runnable');
