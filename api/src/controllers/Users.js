import banka from '../db/db';
import shortid from 'shortid';
import jwt from 'jsonwebtoken';
import config from '../config/config'

class UsersController {

    getUsers(req, res) {
        res.send(banka.users);
    }

    signup(req, res) {
        let { email, firstname, lastname, password, type } = req.body;
        
        let isUserExist = banka.users.find((user) => user.email == email);
        if(isUserExist) {
            res.status(400).json({
                status: 400,
                error: "User already exists"
            });
        }

        let user = {};

        // Increment user id for new user
        user.id = banka.users.length + 1;
        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = password,
        user.type = 'client';
        user.isadmin = false;

        // Generating token to authenticate the user
        var role = user.type;

        if(user.isadmin == true) {
            role = 'admin';
        } else if(user.type == 'staff') {
            role = 'cashier';
        }


        let token = jwt.sign({id: user.id, role: type }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        user.token = token;

        // Adding new user to database
        banka.users.push(user);
        
        // generating response object
        let response = {
            status: 200,
            data: {
                token: user.token,
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
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