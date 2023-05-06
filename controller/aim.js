import express from 'express';
import Aim from '../services/aim';
import {isAuthenticated, accessControl} from '../services/utils';

const aimRoute = express.Router();
const {
    activateFleetAccount, 
    login, 
    getUser, 
    createAccount, 
    getAccounts, 
    updateAccessControl, 
    createUser,
    getUsers
} = new Aim();

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


aimRoute.get('/user/:userId', isAuthenticated,  accessControl('view user'),async (req, res) => {
    const {params:{userId}} = req;
    try {
        const data = await getUser(userId)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            errorMsg: 'unable to get user',
            error
        })
    }
})

aimRoute.post('/account', isAuthenticated,  accessControl('create account'),async (req, res) => {
    const {body:{name, description}} = req;
    try {
        const data = await createAccount(name, description)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            errorMsg: 'unable to get user',
            error
        })
    }
})


aimRoute.get('/account', isAuthenticated,  accessControl('view account'),async (req, res) => {
    const {body:{name, description}} = req;
    try {
        const data = await getAccounts(name, description)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            errorMsg: 'unable to get user',
            error
        })
    }
});


aimRoute.put('/account', isAuthenticated,  accessControl('access control'),async (req, res) => {
    const {body:{status, accountType, accountDefinitions}} = req;
    try {
        const data = await updateAccessControl({status, accountType, accountDefinitions})
        res.status(200).send({data})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            errorMsg: 'unable to update access control',
            error
        })
    }
});


aimRoute.post('/user', isAuthenticated,  accessControl('create user'),async (req, res) => {
    const {body} = req;
    try {
        const data = await createUser(body)
        res.status(200).send({data})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            errorMsg: 'unable to update access control',
            error
        })
    }
});

aimRoute.get('/user', isAuthenticated , accessControl('view user'),async (req, res) => {
    try {
        const data = await getUsers()
        res.status(200).send({data})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            errorMsg: 'unable to update access control',
            error
        })
    }
});



export default aimRoute 