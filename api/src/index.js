import express from 'express';
import router from './routes/index';
import { json, urlencoded } from 'body-parser';

var app = express();

const PORT = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({extended: true}));
app.use(router);

app.listen( PORT, () => {
    console.log( 'Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.' );
});

export default app;