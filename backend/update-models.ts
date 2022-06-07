import {SequelizeAuto} from 'sequelize-auto';
import {Sequelize} from 'sequelize';

const sequelize = new Sequelize({
    host: 'proyecto-topicos-2.ckwhqhfzghju.us-east-2.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: 'Nw99JNGaQu3nWQUTGE9upZxoiaA6Cj66',
    dialect: 'mariadb'
});


const auto = new SequelizeAuto(sequelize, 'admin', 'Nw99JNGaQu3nWQUTGE9upZxoiaA6Cj66', {
    dialect: 'mariadb',
    host: 'proyecto-topicos-2.ckwhqhfzghju.us-east-2.rds.amazonaws.com',
    port: 3306,
    singularize: true,
    useDefine: true,
    directory: './src/models',
    lang: 'ts',
    additional: {
        timestamps: false,
    },
});


auto.run().then();