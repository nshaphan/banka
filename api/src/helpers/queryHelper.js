import { Pool } from 'pg';

let connString = 'postgres://bankadb_admin:banka@127.0.0.1:5432/banka';
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
