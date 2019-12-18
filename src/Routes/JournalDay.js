import {Router} from 'express'
const router = Router();
// Modelos
import Journal from '../Models/Organizer/Journal'
import JournalDay from '../Models/Organizer/JournalDay';


import genericHandler from '../Controllers/genericHandler'
import checkOnlyOne from '../Controllers/CheckOnlyOne'

/* ----- JournalDay ------ */


// Get all days of Journal
router.get('/:journalId/days', async (req, res, next) => {
    const {journalId} = req.params
    const {username} = res.locals.session
    await checkOnlyOne({model: Journal, whereCondition: {id: journalId, createdBy: username}}, res, next)
}, genericHandler({model: JournalDay, action: genericHandler.READ_BY_PARAMS}))


// Get journalDay with the params id
router.get('/:journalId/days/:id', async(req, res, next) => {
    const {journalId} = req.params
    const {username} = res.locals.session
    await checkOnlyOne({model: Journal, whereCondition: {id: journalId, createdBy: username}}, res, next)
}, genericHandler({model: JournalDay, action: genericHandler.READ_BY_ID}))


// Post new journalDay with the params journalId
router.post('/:journalId/days', async (req, res, next) => {
    const {journalId} = req.params
    const {username} = res.locals.session
    await checkOnlyOne({model: Journal, whereCondition: {id: journalId, createdBy: username}}, res, next)
        
}, genericHandler({model: JournalDay, action: genericHandler.CREATE}))



// Delete 
router.delete('/:journalId/days/:id', async(req, res, next ) => {
    const {journalId, id} = req.params
    const {username} = res.locals.session
    await checkOnlyOne({model: Journal, whereCondition: {id: journalId, createdBy: username}}, res, next)
}, genericHandler({model: JournalDay, action: genericHandler.DELETE_BY_PARAMS}))





export default router