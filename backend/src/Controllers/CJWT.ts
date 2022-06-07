import jwt, {JwtPayload} from 'jsonwebtoken';

// This is not a big app that will be commercially available.
const secret = '78qWM@w#C)H%*uG#dUQ857SD@ZVL4REfG2VWLB(j3FgY^HYD8R5jkgUBydmaQ+y#';

export class CJWT {
    static sign = (payload: any): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            return jwt.sign(payload, secret, (err: Error | null, token: string | undefined) => err ? reject(err) : resolve(token!),
            );
        });
    };

    static verify = (token: string): Promise<JwtPayload> => {
        return new Promise<JwtPayload>((resolve, reject) => {
            return jwt.verify(token, secret, (err, payload) => err ? reject(err) : resolve(payload! as JwtPayload));
        });
    };

}

export default CJWT;