import express from 'express';
import router from './routes/index.js';

import { json, urlencoded } from 'body-parser';


var app = express();

app.set('port', process.env.PORT || 3000);

app.use(json());
app.use(urlencoded({extended: true}));
app.use(router);

// routes 

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});

export default app;