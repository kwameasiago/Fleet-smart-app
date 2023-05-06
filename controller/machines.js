import express from 'express';
import Machines from '../services/machines';

const machineRoute = express.Router();

const {createMachines, getMachines, getMachine, addParts} = new Machines();



machineRoute.post('/',async (req, res) => {
    try {
        const {body} = req;
        const data = await createMachines(body);
        res.status(200).send(data)

    } catch (error) {
        res.status(500).send({
            errorMsg: 'unable to create  machine',
            error
        })
    }
});

machineRoute.get('/', async (req, res) => {
    try {
        const data = await getMachines();
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            errorMsg: 'unable to create  machine',
            error
        })
    }
});


machineRoute.get('/:machineId', async (req, res) => {
    try {
        const {params: {machineId}} = req;
        const data = await getMachine(machineId);
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            errorMsg: 'unable to create  machine',
            error
        })
    }
});


machineRoute.post('/parts',async (req, res) => {
    try {
        const {body} = req;
        const data = await addParts(body);
        res.status(200).send(data)

    } catch (error) {
        res.status(500).send({
            errorMsg: 'unable to create  machine',
            error
        })
    }
});


export default machineRoute;