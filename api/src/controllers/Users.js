import banka from '../db/db'
import shortid from 'shortid'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import db from '../helpers/queryHelper'

class UsersController {

    getUsers(req, res) {
        let users = banka.users;
        res.send(users);
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
            return res.status(200).send({
                status: 400,
                message: "Unable to retieve users, try again"
            });
        }
        
       
        

        let user = {};

        // Increment user id for new user
        user.id = banka.users.length + 1;
        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = password;

        if(req.body.user) {
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

    signin(req, res) {
        var { email, password } = req.body;


        // find user with provided credentials 
        var user = banka.users.find((user) => user.email == email 
                                                && user.password == password);

        if(!user) {
            res.status(401).json({
                status: 401,
                token: null,
                auth: false,
                error: "invalid username or password"
            });
        }
        
        var userIndex = banka.users.findIndex((user) => user.email == email && user.password == password);

        var role = user.type;

        if(user.isadmin == true) {
            role = 'admin';
        } else if(user.type == 'staff') {
            role = 'cashier';
        }


        let token = jwt.sign({id: user.id, role: role }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        banka.users[userIndex].token = token;
        
        // sign in response specifications
        var response = {
            status: 200,
            data: {
                token: token,
                id: user.id,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email
            }
        };

        res.json(response);
    }    
}

const usersController = new UsersController();
export default usersController;