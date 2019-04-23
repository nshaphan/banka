import jwt from 'jsonwebtoken'
import config from '../config/config'
import db from '../helpers/queryHelper'

class UsersController {

    async firstTimeSetup(req, res) {
        const userQuery = "SELECT * FROM users WHERE isadmin = true"; 
        try {
            let { rowCount } = await db.query(userQuery);
            
            if(rowCount > 0) {
                return res.status(401).json({ message: 'Unauthorized access, authenticate as asdmin, please!' });
            }

        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Authentication failed, try again"
            });
        }

        let email = req.body;

        let token = jwt.sign({ email }, config.secret, {
            expiresIn: 1800 // expires in 30 minutes
        });

        return res.json({
            status: 200,
            data: {
                email: email,
                token: token
            }
        })

    }
    async getUsers(req, res) {
        const usersQuery = "SELECT * FROM users";
        try {
            const { rows, rowCount } = await db.query(usersQuery);
            return res.status(200).send({ 
                status: 200,
                rows: rowCount,
                data: rows   
            });
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to retieve users, try again"
            });
        }
    }

    async signup(req, res) {
        let { email, firstname, lastname, password } = req.body;
        const userQuery = "SELECT email FROM users WHERE email = $1"; 
        try {
            let { rowCount } = await db.query(userQuery, [email]);
            if(rowCount > 0) {
                return res.status(400).json({
                    status: 400,
                    error: "User already exists"
                });
            }
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to retieve users, try again"
            });
        }

        let user = {};

        // Increment user id for new user
        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = password;

        if(req.body.user.superuser) {
            user.type = req.body.type;
            user.isadmin = req.body.isadmin;
        } else {
            user.type = 'client'
            user.isadmin = false;
        }
        

        // Generating token to authenticate the user
        var role = user.type;
        if(user.isadmin == true) {
            role = 'admin';
        } else if(user.type == 'staff') {
            role = 'cashier';
        }

        const newUserQuery = `INSERT INTO 
        users(email, firstname, lastname, password, type, isAdmin)
        VALUES($1, $2, $3, $4, $5, $6) returning *`;

        const values = [
            user.email,
            user.firstname,
            user.lastname,
            user.password,
            user.type,
            user.isadmin
        ]

        let result = [];
        try {
            const { rows } = await db.query(newUserQuery, values); 
            result = rows[0];
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Unable to save user, try again"
            });
        }

        let token = jwt.sign({id: result.id, role: role }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        
        // generating response object
        let response = {
            status: 200,
            data: {
                token: token,
                id: result.id,
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email
            }
        }

        res.json(response);
    }

    async signin(req, res) {
        const { email, password } = req.body;

        // find user with provided credentials 
        const userQuery = "SELECT * FROM users WHERE email = $1 AND password = $2"; 
        
        let user = {}
        try {
            let { rows, rowCount } = await db.query(userQuery, [email, password]);
            if(rowCount <= 0) {
                return res.status(400).json({
                    status: 400,
                    message: 'Invalid email or password'
                });
            }
            user = rows[0];            
        } catch(error) {
            console.log(error);
            return res.status(400).send({
                status: 400,
                message: "Problem with server, try again"
            });
        }
        
        let role = user.type;
        if(user.isadmin == true) {
            role = 'admin';
        } else if(user.type == 'staff') {
            role = 'cashier';
        }

        const token = jwt.sign({id: user.id, role: role }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        
        // sign in response specifications
        const response = {
            status: 200,
            data: {
                token: token,
                id: user.id,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email
            }
        };

        return res.json(response);
    }    
}

const usersController = new UsersController();
export default usersController;