import express from 'express';
import router from './routes/index';
import { json, urlencoded } from 'body-parser';

var app = express();
// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;

app.use(json());
app.use(urlencoded({extended: true}));
app.use(router);

app.listen(port, function(){
    console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});

export default app;