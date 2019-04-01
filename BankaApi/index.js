var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var db = {
    users: [
        {
            id : 1,
            email: 'user@banka.com',
            firstname: 'Shaphan',
            lastname: 'Nzabonimana',
            password: '123@bk',
            type: 'client',
            isAdmin: false
        }
    ]
}

app.get('/', function(req, res) {
    res.json(db.users);
});

app.post('/auth/signup', function(req, res) {
    var user = {
        id : req.body.id,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        type: req.body.type,
        isAdmin: req.body.isAdmin
    }

    db.users.push(user);

    var response = {
        status: 200,
        data: {
            token: '45erkjherht45495783',
            id: db.users.length - 1,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        }
    }
    res.json(response);
});

app.post('/auth/signin',function(req, res){
    var credentials = {
        email: req.body.email,
        password: req.body.password
    }

    var signin_spec = {
        status : 200,
        data : {
            token : '45erkjherht45495783',
            id : 1,
            firstName : 'Emmanuel' ,
            lastName : 'Twahirwa' ,
            email : 'emmy@banka.com'
        }
    }

    db.users.forEach(user => {
        if(user.email == credentials.email && user.password == credentials.password) {
            res.json(user);
        }
    });
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});

module.exports = app;