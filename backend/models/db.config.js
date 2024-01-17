import { DataTypes, Sequelize } from 'sequelize';


export const sequelize = new Sequelize('dev_test114', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})

