import 'reflect-metadata'
import { DataSource } from "typeorm"
import { COOKIE_NAME, __prod__ } from './constants'
import typeOrmConfig from './type-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { PostResolver, UserResolver } from './resolvers'
import RedisStore from "connect-redis"
import session from "express-session"
import { createClient } from "redis"
import cors from 'cors'


const main = async () => {
    // Connect db
    const AppDataSource = new DataSource(typeOrmConfig)
    await AppDataSource.initialize()

    const app = express()

    // Initialize client.
    let redisClient = createClient()
    redisClient.connect().catch(console.error)
    // Initialize store.
    let redisStore = new RedisStore({
        client: redisClient,
        prefix: "reddit-clone:",
        disableTouch: true
    })

    app.use(cors({
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true
    }))
    // Initialize sesssion storage.
    app.use(
        session({
            name: COOKIE_NAME,
            store: redisStore,
            resave: false, // required: force lightweight session keep alive (touch)
            saveUninitialized: false, // recommended: only save session when data exists
            secret: "aBckerl1dlfnHwYDmsdgjs284gdsgM",
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                secure: __prod__, // cookie only works in https
                sameSite: 'lax', // csrf
            },
        })
    )


    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, UserResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res, redisClient })
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app, cors: false })

    app.listen(4000, () => {
        console.log('server is listening on localhost:4000')
    })
}

main()