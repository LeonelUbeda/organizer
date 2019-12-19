import User from '../../Models/User/User'
import JWT from 'jsonwebtoken'
import SHA256 from 'crypto-js/sha256'
import Journal from '../../Models/Organizer/Journal';
import JournalDay from '../../Models/Organizer/JournalDay';
export const typeDef = `

    extend type Query{
        journals(startDate: String, endDate: String, id: Int): [Journal] 
        journalDays(id: Int, journalId: Int): [JournalDay]
        todos(journalDayId: Int, id: Int): Todo
    }

    type JournalDay {
        id: ID
        journalId: Int
        day: String
        title: String
        todos: [Todo]
    }

    type Journal {
        id: ID
        createdBy: String
        title: String
        startDate: String
        endDate: String
        journalDay: [JournalDay]
    }

    

    type Todo {
        id: ID
        journalDayId: Int
        text: String
        completed: Boolean
        signifier: String
        order: Int
    }

    extend type Mutation {
        createJournal(title: String, startDate: String, endDate: String!): Journal
        updateJournal(id: Int!, title: String, startDate: String, endDate: String): Journal
        deleteJournal(id: Int!): String
        createJournalDay(journalId: Int!, day: String!, title: String): JournalDay
        updateJournalDay(id: Int!, day: String, title: String): JournalDay
        
    }


`;

export const resolvers = {
    Query: { // journals(startDate: String, endDate: String, id: Int): Journal 
        journals: async (root, arg, request) => {
            return await Journal.findAll({where: { createdBy: request.email ,...arg }, include: [ 
                {
                    model: JournalDay,
                    as: 'journalDay',
                    required: false 
                }
            ]})
        }
    },
    Mutation: {
        createJournal: async(_, {title, endDate, startDate, JournalDay}, request) => {
            try {
                let journal = await Journal.create({title, endDate, startDate, createdBy: request.email})
                return journal
            } catch (error) {
                console.log(error)
                throw new Error('Error')
            }
            
        },
        updateJournal: async (_, args, request) => {
            try {
                let id = args.id
                delete args.id
                let journal = await Journal.update({...args }, {
                    where: { id, createdBy: request.email }, 
                    returning: true,
                    plain: true
                })
                let journalUpdated = await Journal.findOne({where: { id, createdBy: request.email}})
                console.log(journalUpdated)
                return journalUpdated
            } catch (error) {
                console.log(error)
            }
        },
        deleteJournal: async (_, {id}, request) => {
            try {
                let journal = await Journal.destroy({where: {id, createdBy: request.email}})
                return journal
            } catch (error) {
                throw new Error('Error')
            }
        },
        createJournalDay: async (_, {journalId, day, title}, request) => {
            try {
                let findJournal = await Journal.findOne({where: {id: journalId, createdBy: request.email}})
                if(!findJournal){
                    throw new Error('Forbidden')
                }
                let journalDay = await JournalDay.create({journalId, day, title})
                return journalDay
            } catch (error) {
                throw new Error('Error')
            }
            
        },
        updateJournalDay: async (_, args, request) => {
            try {
                let id = args.id
                delete args.id
                let journalDay = await JournalDay.findOne({where: {id}})
                if(!journalDay){
                    throw new Error('Error')
                }
                let journal = Journal.findOne({where: {
                    id: journalDay.id, 
                    createdBy: request.email
                }})
                if(!journal){
                    throw new Error('Error')
                }
                //let journalDay = JournalDay.update({}, {where: {id, createdBy}})
            } catch (error) {
                console.log(error)
            }
        },
        deleteUser(_, {input}){
            return User.destroy({where: input})
        },
        
    }
}