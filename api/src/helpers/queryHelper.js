import { Pool } from 'pg';

let connString = process.env.DATABASE_URL;

if(process.env.NODE_ENV === 'testing') {
    connString = process.env.TEST_DB_URL;
}
console.log(connString);
// if(process.env.NODE_ENV === 'staging') {
//     connString = process.env.TEST_DB_URL;
// }

const pool = new Pool({
    connectionString: connString
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
