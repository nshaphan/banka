import db from '../helpers/queryHelper';

class Users {
    /**
     * Create a new user
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    async create(req, res) {
        const sql = `INSERT INTO 
        users(email, firstname, lastname, password, type, isAdmin)
        VALUES($1, $2, $3, $4, $5, $6) returning *`;

        const values = [
            'prosper@banka.com',
            'prosper',
            'Muhirwa',
            '1234567Bk',
            'client',
            'false'
        ];
        

        try {
            const { rows } = await db.query(sql, values);
            return res.status(201).send(rows);
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

let users = new Users();
export default users;
