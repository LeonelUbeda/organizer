import {Router} from 'express'
const router = Router();
// Modelos
import Journal from '../Models/Organizer/Journal'
import JournalDay from '../Models/Organizer/JournalDay';
import Todo from '../Models/Organizer/Todo'


import checkOnlyTwo from '../Controllers/checkOnlyTwo'
import genericHandler from '../Controllers/genericHandler';



router.post('/:journalDayId', (req, res, next) => {
    const {username} = res.locals.session
    const {journalDayId} = req.params
    checkOnlyTwo({
        child: JournalDay, 
        whereConditionChild: {id: journalDayId}, 
        parent: Journal, 
        whereConditionParent: {createdBy: username, $id: 'journalId'}
    }, res, next)
}, genericHandler({model: Todo, action: genericHandler.CREATE}))





export default router