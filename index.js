import express from 'express';
import bodyparser from 'body-parser'
import userRoute from "./controller/auth.js";
import db from './models/index.js';
import cors from 'cors';

const {sequelize} = db;
const app = express();
const port = process.env.PORT || 3000;
app.options( '*', cors());

if(process.env.NODE_ENV === 'development'){
    sequelize.authenticate()
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(err))
}

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/auth', userRoute);

app.use((req, res) => {
    res.status(404).send({
        error: 404
    })
});


app.listen( port, () =>
    console.log( `API listening on port ${port}!` )
);
