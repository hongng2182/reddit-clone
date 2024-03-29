import 'reflect-metadata'
import { DataSource } from "typeorm"
import { COOKIE_NAME, __prod__ } from './constants'
import { typeOrmConfigDev, typeOrmConfigProd } from './type-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { CommunityResolver, PostResolver, UserResolver, CommentResolver } from './resolvers'
import RedisStore from "connect-redis"
import session from "express-session"
import { createClient } from "redis"
import cors from 'cors'
import { buildDataLoaders } from './utils/dataLoaders'
import { MyContext } from './types'

export const AppDataSource = new DataSource(__prod__ ? typeOrmConfigProd : typeOrmConfigDev)

const main = async () => {
    // Connect db
    await AppDataSource.initialize()

    if (__prod__) {
        console.log('migration run')
        await AppDataSource.runMigrations()
    }


    const app = express()

    // Initialize client.
    let redisClient = __prod__ ? createClient({
        url: process.env.REDIS_DB_URL
    }) : createClient()
    redisClient.connect().catch(console.error)
    // Initialize store.
    let redisStore = new RedisStore({
        client: redisClient,
        prefix: "reddit-clone:",
        disableTouch: true
    })

    app.set("trust proxy", 1);

    console.log('origin', process.env.CORS_ORIGIN)
    app.use(cors({
        origin: [`${process.env.CORS_ORIGIN}`, 'https://studio.apollographql.com'],
        credentials: true,
    }))
    // Initialize sesssion storage.
    app.use(
        session({
            name: COOKIE_NAME,
            store: redisStore,
            resave: false, // required: force lightweight session keep alive (touch)
            saveUninitialized: false, // recommended: only save session when data exists
            secret: process.env.SESSION_SECRET as string,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                httpOnly: true,
                secure: __prod__, // cookie only works in https
                sameSite: __prod__ ? 'none' : 'lax', // csrf
            },
        })
    )

    const apolloServer = new ApolloServer<MyContext>({
        schema: await buildSchema({
            resolvers: [PostResolver, UserResolver, CommunityResolver, CommentResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res, redisClient, dataLoaders: buildDataLoaders() })
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app, cors: false })

    app.listen(process.env.PORT || 8080, () => {
        console.log('server is listening on localhost:8080')
    })
}

main().catch((err) => {
    console.error("SERVER ERROR", err);
});