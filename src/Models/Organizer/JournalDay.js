import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Journal from './Journal'
import Todo from './Todo'



class JournalDay extends Sequelize.Model{}
JournalDay.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    journalId: {
        type: Sequelize.INTEGER,
        
    },
    day: {
        type: Sequelize.DATEONLY,
       
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: true
    }
},{
    indexes: [{
        unique: true,
        fields: ['day', 'journalId']
    }],
    sequelize: database,
    modelName: 'journalDay',
})

JournalDay.hasMany(Todo, {as: 'todos', foreignKey: 'journalDayId', onDelete: 'cascade', onUpdate: 'cascade'})


export default JournalDay