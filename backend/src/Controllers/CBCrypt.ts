import bcrypt from 'bcrypt';

export class CBCrypt {

    static hash = (toHash: string, saltRounds: number = 10) => {
        return new Promise<string>((resolve, reject) => {
            bcrypt.hash(toHash, saltRounds, (err, hash) => {
                err ? reject(err) : resolve(hash);
            });
        });
    };

    static compare = (plain: string, hash: string) => {
        return new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(plain, hash, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    };
}