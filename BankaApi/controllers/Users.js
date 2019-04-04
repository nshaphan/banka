import db from '../db/db';

class UsersController {

    hello(req, res) {
        res.send("hello world");
    }
}

const usersController = new UsersController();
export default usersController;