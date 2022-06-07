import express, {Request, Response} from 'express';
import {v4 as uuid} from 'uuid';
import moment from 'moment';

const vaccineRouter = express.Router();

vaccineRouter.get('/add', (req: Request, res: Response) => {
    const id = uuid();
    const transactionTime = moment();
    return res.json({id, transactionTime});
});

vaccineRouter.post('/add', (req: Request, res: Response) => {

});


export default vaccineRouter;