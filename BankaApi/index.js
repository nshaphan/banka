var express = require('express');
var bodyParser = require('body-parser');
var shortid = require("shortid");

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('api_version', 'v1');
app.set('base_url', '/api/'+ app.get('api_version'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var db = {
    users: [
        {
            id: 1,
            email: 'user@banka.com',
            firstname: 'Shaphan',
            lastname: 'Nzabonimana',
            password: '123@bk',
            type: 'client',
            isAdmin: false,
            token: "45erkjherht45495783"
        }
    ],

    accounts: [
        {
            id: 1,
            accountNumber: '20183444095',
            createdOn: "12-05-2018",
            owner: 1,
            type: 'current',
            status: 'active',
            balance: '2000',
        }
    ]
}

var base_url = app.get('base_url');

console.log(base_url);

app.get(base_url, function(req, res) {
    res.send(shortid.generate());
});

app.post(base_url +'/auth/signup', function(req, res) {
    var user = req.body;

    user.id = db.users.length + 1;
    db.users.push(user);
    

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
});

app.post(base_url +'/auth/signin', function(req, res){
    var credentials = req.body;
    
    db.users.forEach(user => {
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
});


app.post(base_url +"/accounts", function(req, res){

    res.json(req.params.token);

    db.users.forEach(user => {
        if(user.token == req.params.token) {

            var account = req.body;

            account.id = db.accounts.length + 1;
            account.accountNumber = '20183444094';
            account.createdOn = new Date();
            account.status = 'active';

            account.owner = user.id;

            db.accounts.push(account);

            res.json(account);
            
        }
    });

});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});

module.exports = app;