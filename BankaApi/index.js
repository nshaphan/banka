import express from 'express';
import banka from './db/db';

import { json, urlencoded } from 'body-parser';
import { generate } from "shortid";

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('api_version', 'v1');
app.set('base_url', '/api/'+ app.get('api_version'));

app.use(json());
app.use(urlencoded({extended: true}));


var base_url = app.get('base_url');

console.log(base_url);

app.get(base_url, function(req, res) {
    res.send(generate());
});

app.post(base_url +'/auth/signup', function(req, res) {
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
});

app.post(base_url +'/auth/signin', function(req, res){
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
});


app.post(base_url +"/accounts", function(req, res){

    res.json(req.params.token);

    banka.users.forEach(user => {
        if(user.token == req.params.token) {

            var account = req.body;

            account.id = banka.accounts.length + 1;
            account.accountNumber = '20183444094';
            account.createdOn = new Date();
            account.status = 'active';

            account.owner = user.id;

            banka.accounts.push(account);

            res.json(account);
            
        }
    });

});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});

export default app;