import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import User from '../User/User'
import JournalDay from './JournalDay'



class Journal extends Model{}


Journal.init({
    createdBy: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startDate: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: true
    }
}, {
    sequelize: database,
    modelName: 'journal',
})

Journal.hasMany(JournalDay, {as: 'journalDay', foreignKey: 'journalId', onDelete: 'cascade', onUpdate: 'cascade'})

Journal.belongsTo(User, {foreignKey: 'createdBy' , targetKey: 'username', })

export default Journal