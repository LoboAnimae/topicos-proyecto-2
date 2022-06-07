import {NextFunction, Request, Response} from 'express';
import {validationResult} from 'express-validator';
import CError from './CError';
import {RESPONSE_TYPES} from '../Interfaces/IResponse';
import CJWT from './CJWT';
import FDatabase from '../Factories/FDatabase';
import {user} from '../models/user';

export class CMiddleware {
    static checkErrors(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new CError(res)
                .setMainContent(errors.mapped())
                .setMessage('Error while validating parameters')
                .setStatus(RESPONSE_TYPES.BAD_REQUEST)
                .send();
        }
        next();
    }

    static async extractRequester(req: Request, res: Response, next: NextFunction) {
        const {jwt} = req.body;
        const {username} = jwt;
        const db = FDatabase();
        const foundUser = await db.models.user.findOne({where: {username}}) as user;

        if (!foundUser) {
            return new CError(res)
                .setStatus(RESPONSE_TYPES.FORBIDDEN)
                .send();
        }

        req.body.requester = {wallet: jwt.wallet, username, permissions: foundUser.permissions};
        next();
    }

    static async extractJWT(req: Request, res: Response, next: NextFunction) {
        const {jwt} = req.body;
        if (!jwt) {
            return new CError(res)
                .setStatus(RESPONSE_TYPES.FORBIDDEN)
                .send();
        }
        req.body.jwt = await CJWT.verify(jwt);
        next();
    }

    static async barrier(res: Response, next: NextFunction, barrierFunction: () => boolean) {
        if (barrierFunction()) {
            next();
        }

        return new CError(res)
            .setStatus(RESPONSE_TYPES.FORBIDDEN)
            .send;
    }
}

export default CMiddleware;