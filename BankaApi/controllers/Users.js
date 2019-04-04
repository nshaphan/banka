import db from '../db/db';

class UsersController {

    hello(req, res) {
        res.send("hello world");
    }

    signin(req, res) {

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
}

const usersController = new UsersController();
export default usersController;