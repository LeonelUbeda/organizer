import User from '../../Models/User/User'
import JWT from 'jsonwebtoken'
import SHA256 from 'crypto-js/sha256'
export const typeDef = `

    extend type Query{
        users(username: String): [User]
    }

    type User {
        id: ID
        username: String!
        password: String!
        firstName: String!
        lastName: String
        email: String
    }

    type AuthData {
        token: String!
        username: String
    }


    input UserInput {
        username: String!
        password: String!
        firstName: String!
        lastName: String
        email: String
    }

    input UserDelete{
        username: String!
    }
    
    extend type Mutation {
        createUser(input: UserInput): User
        deleteUser(input: UserDelete): String
        login(email: String!, password: String!): AuthData
    }


`;


export const resolvers = {
    Query: {
        users: (root, search) => {
            return User.findAll({where: search})
        }
    },
    Mutation: {
        login: async(_, {email, username}, request) => {
            console.log(request.isAuth)
            let user = await User.findOne({where: {email}})
            if(!user){
                throw new Error('Username does not exist')
            }
            let passwordHash = SHA256(password).toString()

            if(passwordHash !== user.password){
                throw new Error('Incorrect password')
            }

            let token = await JWT.sign({username: user.username, email: user.email}, 'secret')
            return {token: token, username: user.username}
        },
        createUser: async (_, { input }) => {
            let user = await User.findOne({where: {email: input.email}})
            if(user){
                throw new Error('That email is already in use')
            }
            input.password = SHA256(input.password).toString()
            input.email = input.email.toLowerCase()
            
            return User.create(input)
        },
        deleteUser(_, {input}){
            return User.destroy({where: input})
        },
        
    }
}