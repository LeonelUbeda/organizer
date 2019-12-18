import {Sequelize} from 'sequelize'
import CredencialesDatabase from './databaseCredentials'


const {database, user, password, host} = CredencialesDatabase;



const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: 'mysql'/*'mysql'*/,
    pool: {
        max: 5,
        min: 0,
        //acquire: 30000,
        idle: 10000
    },
    define: {
        // Evita que modifique el nombre de las tablas. Antes le añadia una 'S'
        freezeTableName: true, 
        timestamps: false
    },
    //logging: true
})



export default sequelize;