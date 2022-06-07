import {Options, Sequelize} from 'sequelize';
import {initModels} from '../models/init-models';

export function GetDatabase(): Sequelize {
    const sequelizeOptions: Options = {
        host: 'proyecto-topicos-2.ckwhqhfzghju.us-east-2.rds.amazonaws.com',
        port: 3306,
        username: 'admin',
        password: 'Nw99JNGaQu3nWQUTGE9upZxoiaA6Cj66',
        dialect: 'mariadb',
        database: 'main'
    };

    const sequelize = new Sequelize(sequelizeOptions);
    initModels(sequelize);
    return sequelize;
}


export default GetDatabase;