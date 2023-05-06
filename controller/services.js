import express from 'express';
import Services from '../services/services';

const serviceRouter = express.Router();
const {createService} = new Services()


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

export default serviceRouter;