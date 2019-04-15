import banka from '../db/db';
import shortid from 'shortid';

class UsersController {

    getUsers(req, res) {
        res.send(banka.users);
    }

    signup(req, res) {

        var {email, firstname, lastname, password, type, isadmin} = req.body;
        
        // Increment user id for new user
        user.id = banka.users.length + 1;
        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = password,
        user.type = type;
        user.isadmin = isadmin;
        user.token = shortid.generate();

        // Adding new user to database
        banka.users.push(user);
        
        // generating response object
        var response = {
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
        
        var userIndex = banka.users.findIndex((user) => user.email == email && user.password == password);

        // nbanka.users[userIndex].token
        if(!user) {
            res.status(400).json({
                status: 400,
                error: "invalid username or password"
            });
        }
        // sign in response specifications
        var response = {
            status : 200,
            data : {
                token : user.token,
                id : user.id,
                firstName : user.firstname,
                lastName : user.lastname,
                email : user.email
            }
        };

        res.json(response);
    }    
}

const usersController = new UsersController();
export default usersController;