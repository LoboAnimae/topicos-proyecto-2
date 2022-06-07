import express, {Request, Response} from 'express';
import CDebug from '../Controllers/CDebug';
import {body} from 'express-validator';
import CJWT from '../Controllers/CJWT';
import GetDatabase from '../Factories/FDatabase';
import {user, userCreationAttributes} from '../models/user';
import CError from '../Controllers/CError';
import {RESPONSE_TYPES} from '../Interfaces/IResponse';
import CPermissions from '../Controllers/CPermissions';
import {IPERMISSIONS} from '../Interfaces/IPermissions';
import {CBCrypt} from '../Controllers/CBCrypt';

const userRouter = express.Router();

userRouter.post('/add', (req: Request, res: Response) => {
    body('wallet').notEmpty().isEthereumAddress().isString(),
        body('jwt').notEmpty().isJWT(),
        body('to').notEmpty().isAlphanumeric().isString(),
        // CMiddleware.checkErrors,
        async (req: Request, res: Response) => {

            const {wallet, username} = await CJWT.verify(req.body.jwt);

            const db = GetDatabase();
            const creatorUser = await db.models.user.findOne({where: {username}}) as user;
            if (!creatorUser) {
                return new CError(res)
                    .setStatus(RESPONSE_TYPES.NOT_FOUND)
                    .setMainContent(`User ${username} not found.`)
                    .send();
            }

            if (wallet !== creatorUser.wallet) {
                return new CError(res)
                    .setStatus(RESPONSE_TYPES.BAD_REQUEST)
                    .setMainContent(`Data discrepancy. Fallback.`)
                    .send();
            }

            // Check that the user has enough permissions
            const isAllowed = CPermissions.checkPermission(IPERMISSIONS.ADD_USERS, creatorUser.permissions);

            if (!isAllowed) {
                return new CError(res)
                    .setStatus(RESPONSE_TYPES.UNAUTHORIZED)
                    .setMainContent(`Insufficient permissions.`)
                    .send();
            }

            // TODO: Check that the wallet is unique
            const newUser: userCreationAttributes = {
                username: req.body.to,
                password: await CBCrypt.hash(req.body.password + req.body.wallet),
                wallet: req.body.wallet,
            };

            await db.models.user.create(newUser);
            return res.sendStatus(200);
        };
});


export default userRouter;