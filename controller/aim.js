import express from 'express';
import Aim from '../services/aim';

const aimRoute = express.Router();
const {activateFleetAccount, login, getUser} = new Aim();

aimRoute.post('/activate', async (req, res) => {
    const {body} = req
   try {
    const data = await activateFleetAccount(body)
    
    res.status(200).send(data)
   } catch (error) {
    console.log(error)
    res.status(500).send({
        errorMsg: 'unable to activate account',
        error
    })
   }
});

aimRoute.post('/authenticate', async (req, res) => {
    const {body} = req;
    try {
        const data = await login(body)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            errorMsg: 'unable to login account',
            error
        })
    }
});


aimRoute.get('/user/:userId', async (req, res) => {
    const {params:{userId}} = req;
    try {
        const data = await getUser(userId)
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            errorMsg: 'unable to get user',
            error
        })
    }
})


export default aimRoute