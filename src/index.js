import express from 'express'

import {json} from 'body-parser'
import {join} from 'path'
import database from './Database/database'
import graphqlHTTP from 'express-graphql'

import isAuth from './Middlewares/Auth'

import schema from './GraphQL/schema'


const app = express()
const PORT = 3000
app.use((req, res, next) => {
    res.locals.session = {
        username: 'leonel'
    }
    next()
})


// Verify is user is login
app.use(isAuth)

app.use('/graphql', graphqlHTTP((request, response, graphQLParams) => ({
    schema,
    graphiql: true,
    
})))



// Rutas
import User from './Routes/User'
import Journal from './Routes/Journal'
import JournalDay from './Routes/JournalDay'
import Todo from './Routes/Todo'






//Midleware
app.use(json())

app.use('/journals', Journal)
app.use('/journals', JournalDay)
app.use('/todos', Todo)
app.use('/users', User)


app.use(express.static(join(__dirname, '../public')))

app.use('*', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'))
})

//database.sync({force: true})


app.listen(PORT, () => {console.log('Server iniciado')})