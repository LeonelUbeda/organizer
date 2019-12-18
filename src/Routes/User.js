import {Router} from 'express'
import genericHandler from '../Controllers/genericHandler'
import User from '../Models/User/User'

let router = Router()



router.get('/', genericHandler({model: User, action: genericHandler.READ}))

router.post('/', genericHandler({model: User, action: genericHandler.CREATE}))

router.put('/:username', genericHandler({model: User, action: genericHandler.UPDATE_BY_PARAMS}))

router.delete('/:username', genericHandler({model: User, action: genericHandler.DELETE_BY_PARAMS}))


export default router