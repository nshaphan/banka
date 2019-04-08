import banka from '../db/db';
import shortid from 'shortid';

class UsersController {

    getUsers(req, res) {
        res.send(banka.users);
    }

    signup(req, res) {

        var user = req.body;
        
        // Increment user id for new user
        user.id = banka.users.length + 1;
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
        var credentials = req.body;

        // find user with provided credentials 
        var user = banka.users.find((user) => user.email == credentials.email 
                                                && user.password == credentials.password);
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