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

// routes 

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});

export default app;