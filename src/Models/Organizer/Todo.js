import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import JournalDay from './JournalDay'

class Todo extends Model{}

Todo.init({
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    journalDayId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    todoType: {
        type: Sequelize.ENUM({
            values: ['event', 'scheduled', 'task']
        }),
        defaultValue: 'task'
    },
    signifier: {
        type: Sequelize.ENUM({
            values: ['none', 'priority', 'inspiration', 'explore']
        }),
        defaultValue: 'none'
    },
    order: {
        type: Sequelize.INTEGER,
        allowNull: null
    }
},{
    sequelize: database,
    modelName: 'todo',
})





export default Todo
