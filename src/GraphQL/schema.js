
import { merge } from 'lodash';
import {makeExecutableSchema} from 'graphql-tools'

import { resolvers as UserResolvers, typeDef as UserTypeDef } from './User/User'
import { resolvers as JournalResolvers, typeDef as JournalTypeDef } from './Journal/Journal'


const resolvers = {
    Query: {
        hello: () => 'Hola chaval',
        greet(root, {name}){
            
            return name
        },
    },
    Mutation: {
    }
}



const typeDefs = `
    type Query {
        hello: String,
        greet(name: String!): String
    }

    type Mutation{
        greet(greet: String): String
    }

`

export default makeExecutableSchema({
    typeDefs: [typeDefs, UserTypeDef, JournalTypeDef],
    resolvers: merge(resolvers, UserResolvers, JournalResolvers)
})

