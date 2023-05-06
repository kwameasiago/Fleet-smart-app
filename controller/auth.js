import express from 'express';
import Authentication from '../services/auth';

const userRoute = express.Router();

const auth = new Authentication();
const { register, login, userInfo } = auth;

userRoute.post('/signup', async (req, res) => {
    const {body} = req;
    const data = await  register(body);
    console.log(data)
    res.status(200).send({
        ...data
    })
});

userRoute.post('/signin', async (req, res) => {
    const {body} = req;
    const data = await  login(body);
    console.log(data)
    res.status(200).send({
      ... data,  
    })
});

userRoute.get('/info', async (req, res) => {
    const {headers} = req;
    const data = await  userInfo(headers);
    res.status(200).send({
        ...data
    })
});


export default userRoute;