import express from 'express'
import mongoose from 'mongoose'
import {json} from 'body-parser'
import {join} from 'path'
import database from './Database/database'



const app = express()

app.use((req, res, next) => {
    res.locals.session = {
        username: 'leonel'
    }
    next()
})




// Rutas
import User from './Routes/User'
import Journal from './Routes/Journal'
import JournalDay from './Routes/JournalDay'
import Todo from './Routes/Todo'






//Midleware
app.use(json())

app.use('/journals', Journal)
app.use('/journals', JournalDay)
app.use('/todo', Todo)
app.use('/users', User)


app.use(express.static(join(__dirname, '../public')))

app.use('*', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'))
})

//database.sync({force: true})


app.listen(3000)