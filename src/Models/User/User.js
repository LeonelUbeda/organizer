import Sequelize from 'sequelize'
import database from '../../Database/database'

class User extends Sequelize.Model{}

User.init({
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(64),
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    
}, {
    sequelize: database,
    modelName: 'User',
})


export default User