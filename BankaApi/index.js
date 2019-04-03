var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('api_version', 'v1');
app.set('base_url', '/api/'+ api_version);

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

var api_version = app.get('api_version');
var base_url = app.get('base_url');

app.get(base_url, function(req, res) {
    res.json(db.users);
});

app.post(base_url +'/auth/signup', function(req, res) {
    var user = req.body;

    db.users.push(user);
    user.id = db.users.length;

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

app.post(base_url +'/auth/signin',function(req, res){
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

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});

module.exports = app;