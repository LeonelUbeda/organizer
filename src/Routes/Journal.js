import {Router} from 'express'
const router = Router();
// Modelos
import Journal from '../Models/Organizer/Journal'
import JournalDay from '../Models/Organizer/JournalDay';
import Todo from '../Models/Organizer/Todo';


import genericHandler from '../Controllers/genericHandler'

import checkOnlyOne from '../Controllers/CheckOnlyOne'

/* ----- Journal ------ */


router.get('/', async (req, res, next) => {
    const {username} = res.locals.session
    req.params.$$createdBy = username
    next()
},genericHandler({model: Journal, action: genericHandler.READ_BY_PARAMS, include: [
    {
        model: JournalDay,
        as: 'journalDay',
        required: false,
        include: {
            required: false,
            model: Todo,
            as: 'todos'
        }
    }
]}))

router.get('/:id', (req, res, next) => {
    const {username} = res.locals.session
    const {id} = req.params
    checkOnlyOne({model: Journal, whereCondition: {createdBy: username, id}}, res, next)
},genericHandler({model: Journal, action: genericHandler.READ_BY_ID, include: [
    {
        model: JournalDay,
        as: 'journalDay',
        required: false,
        include: {
            required: false,
            model: Todo,
            as: 'todos'
        }
    }
]}))



router.post('/', (req, res, next) => {
    const {username} = res.locals.session
    req.body.createdBy = username
    next()
},genericHandler({model: Journal, action: genericHandler.CREATE}))


router.put('/:id',async (req, res, next) => {
    const {username} = res.locals.session
    const {id} = req.params
    checkOnlyOne({model: Journal, whereCondition: {createdBy: username, id}}, res, next)
}, genericHandler({model: Journal, action: genericHandler.UPDATE_BY_ID}))


router.delete('/:id', async (req, res, next) => {
    const {username} = res.locals.session
    const {id} = req.params
    checkOnlyOne({model: Journal, whereCondition: {createdBy: username, id}}, res, next)
}, genericHandler({model: Journal, action: genericHandler.DELETE_BY_ID}))

export default router