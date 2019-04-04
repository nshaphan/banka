import db from '../db/db';

class UsersController {

    hello(req, res) {
        res.send("hello world");
    }

    signup(req, res) {

        var user = req.body;
        user.id = banka.users.length + 1;
        banka.users.push(user);
        
        var response = {
            status: 200,
            data: {
                token: '45erkjherht45495783',
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
    
        banka.users.forEach(user => {
            if(user.email == credentials.email && user.password == credentials.password) {
                
                var signin_spec = {
                    status : 200,
                    data : {
                        token : '45erkjherht45495783',
                        id : user.id,
                        firstName : user.firstname,
                        lastName : user.lastname,
                        email : user.email
                    }
                }
                
                res.json(signin_spec);
            }
        });
    }

    
}

const usersController = new UsersController();
export default usersController;