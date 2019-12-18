
// Verify if exist parent with the condition

const checkOnlyOne = async function({model, whereCondition}, res = null, next = null){
    try {
        let search = await model.findOne({where: {...whereCondition}})
        if(search !== null){
            if(res !== null){
                next()
            }else{
                return true
            }
        }else{
            if(res !== null){
                res.status(403).send('Forbidden').end() 
            }else{
                return false
            }
        }
    } catch (error) {
        console.log(error, 'ERROR EN CHECKONLY')
        if(res !== null){
            res.status(403).send('Forbidden').end() 
        }else{
            return false
        }
    }
}
export default checkOnlyOne

