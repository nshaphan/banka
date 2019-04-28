import { Pool } from 'pg';

let connString = process.env.DATABASE_URL;
let ssl = false;

if(process.env.NODE_ENV == 'testing') {
    connString = process.env.TEST_DB_URL;
}

if(process.env.NODE_ENV == 'staging') {
    connString = process.env.DATABASE_URL;
    ssl = true;
}

if(process.env.NODE_ENV == 'seeding') {
    connString = process.env.HEROKU_TEST_DB;
    ssl = true;
}
console.log(connString);
// if(process.env.NODE_ENV === 'staging') {
//     connString = process.env.TEST_DB_URL;
// }

const pool = new Pool({
    connectionString: connString,
    ssl: ssl
});

export default {

    /**
     * DB Query
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    query(sql, params = null) {
        return new Promise((resolve, reject) => {
            pool.query(sql, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}
