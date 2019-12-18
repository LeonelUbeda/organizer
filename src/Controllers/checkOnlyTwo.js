
// Verify if exist parent with the condition


/* 
checkOnlyTwo({
    child: JournalDay, 
    whereConditionChild: {id: journalDayId}, 
    parent: Journal, 
    whereConditionParent: {createdBy: username, $id: 'journalId'}
    
}, res, next)

$id: 'journalId'
its the same as id: JournalDay.journalId

So...

let responseChild = JournalDay.findOne({where: {id: 3}})
let responseParent = Parent.findOne({where: {createdBy: 'admin', id: responseChild.journalId }})

then...

if responseParent !== null{
    next()
}else{
    error
}
*/
const checkOnlyTwo = async function({child, parent, whereConditionChild , whereConditionParent}, res = null , next = null){
    try {
        let search = await child.findOne({where: {...whereConditionChild}})
        search = JSON.parse(JSON.stringify(search))
        if(search === null){
            throw 'Vacio'
        }
        for(let prop in whereConditionParent){
            if(prop.includes('$')){
                whereConditionParent[prop.slice(1)] = search[whereConditionParent[prop]]
                delete whereConditionParent[prop]
            }
        }
        let parentSearch = await parent.findOne({where: { ...whereConditionParent}})

        if(parentSearch === null){        
            throw 'Vacio'
        }else{
            if(res === null ){
                return true
            }else{
                next()
            }
        }
    } catch (error) {
        console.log(error, 'Error: checkOnlyTwo.js')
        if(res === null){
            return false
        }else{
            res.status(403).send('FORBIDDEN').end()
        }
    }
}
export default checkOnlyTwo

