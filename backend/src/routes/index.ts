import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import CMiddleware from '../Controllers/CMiddleware';
import CResponse from '../Controllers/CResponse';
import CJWT from '../Controllers/CJWT';
import GetDatabase from '../Factories/FDatabase';
import CError from '../Controllers/CError';
import {RESPONSE_TYPES} from '../Interfaces/IResponse';
import {CBCrypt} from '../Controllers/CBCrypt';
import {user, userCreationAttributes} from '../models/user';
import CPermissions from '../Controllers/CPermissions';
import {IPERMISSIONS} from '../Interfaces/IPermissions';
import {JwtPayload} from 'jsonwebtoken';

const indexRouter = express.Router();


indexRouter.get('/debug/login', (req: Request, res: Response) => {

});


interface ILoginParams extends Request {
    body: {
        wallet: string;
        username: string;
        password: string;

    };
}


indexRouter.post('/register',

);

indexRouter.post('/login',
    body('wallet').notEmpty().isEthereumAddress().isString(),
    body('username').notEmpty().isAlphanumeric().isString(),
    body('password').notEmpty().isAlphanumeric().isString(),
    CMiddleware.checkErrors,
    async (req: ILoginParams, res: Response) => {

        // Grab the values
        const {wallet, username, password} = req.body;
        // Go grab the user
        const db = GetDatabase();
        const foundUser = await db.models.user.findOne({
            where: {
                username,
            },
        }) as user;
        if (!foundUser) {
            return new CError(res)
                .setStatus(RESPONSE_TYPES.NOT_FOUND)
                .setMainContent(`User ${username} not found.`)
                .send();
        }

        if (foundUser.wallet !== wallet) {
            return new CError(res)
                .setStatus(RESPONSE_TYPES.FORBIDDEN)
                .setMainContent(`User ${username} not found.`)
                .send();
        }

        const combinedPassword = password + wallet;

        const isCorrectPassword = await CBCrypt.compare(combinedPassword, foundUser.password.toString());

        if (!isCorrectPassword) {
            return new CError(res)
                .setStatus(RESPONSE_TYPES.FORBIDDEN)
                .setMainContent(`Incorrect password.`)
                .send();
        }

        const signed = await CJWT.sign({wallet, username});
        return new CResponse(res)
            .setStatus(200)
            .setMainContent({jwt: signed})
            .send();
    });

export default indexRouter;