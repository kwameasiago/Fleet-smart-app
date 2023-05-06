import express from 'express';
import Services from '../services/services';

const serviceRouter = express.Router();
const {createService, assignUsers, markAsComplete} = new Services()


serviceRouter.post('/',async (req, res) => {
    try {
        const {body} = req;
        const data = await createService(body);
        res.status(200).send(data)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            errorMsg: 'unable to create  machine',
            error
        })
    }
});

serviceRouter.post('/users',async (req, res) => {
    try {
        const {body} = req;
        const data = await assignUsers(body);
        res.status(200).send(data)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            errorMsg: 'unable to create  machine',
            error
        })
    }
});

serviceRouter.put('/users',async (req, res) => {
    try {
        const {body} = req;
        const data = await markAsComplete(body);
        res.status(200).send(data)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            errorMsg: 'unable to create  machine',
            error
        })
    }
});

export default serviceRouter;