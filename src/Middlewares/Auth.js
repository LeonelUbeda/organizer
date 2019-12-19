import JWT from 'jsonwebtoken'

export default (req, res, next) => {

    req.isAuth = true
    req.username = 'leonel'
    req.email = 'carlos@hotmail.com'
    return next()
    
    // TEMPORAL



    req.isAuth = false
    const authHeader = req.get('Authorization')
    if (!authHeader){
        req.isAuth = false
        return next()
    }

    const token = authHeader.split(' ')[1]// Bearer TOKEN
    if(!token || token === ''){
        req.isAuth = false
        return next()
    }

    let decodedToken
    try {
        decodedToken = JWT.verify(token, 'secret')
    } catch (error) {
        req.isAuth = false
        return next()
    }

    if(!decodedToken){
        req.isAuth = false
        return next()
    }

    req.isAuth = true
    req.username = decodedToken.username
    req.email = decodedToken.email
    return next()
}