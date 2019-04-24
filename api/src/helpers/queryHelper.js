import { Pool } from 'pg';

let connString = process.env.DATABASE_URL;

if(process.env.NODE_ENV === 'testing') {
    connString = process.env.TEST_DB_URL;
}

if(process.env.NODE_ENV === 'staging') {
    connString = 'postgres://lwgvvnhnjwznxn:c40771d3f01dab3e29cb76d5ece5c0cdfadc1dfcf0c2c8a28b6b8d2f62c05554@ec2-54-243-241-62.compute-1.amazonaws.com:5432/d8jq1s1se94daa';
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
