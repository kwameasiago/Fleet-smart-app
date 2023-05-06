import express from 'express';
import Aim from '../services/aim';

const aimRoute = express.Router();
const {activateFleetAccount} = new Aim();

aimRoute.post('/activate', async (req, res) => {
    const {body} = req
   try {
    const data = await activateFleetAccount(body)
    
    res.status(200).send({
        ...data
    })
   } catch (error) {
    console.log(error)
    res.status(500).send({
        errorMsg: 'unable to activate account',
        error
    })
   }
})


export default aimRoute