import { DataSourceOptions } from "typeorm";
import { __prod__ } from "./constants";
import { Post, User, Vote } from "./entities";
import path from "path";

require('dotenv').config()

const typeOrmConfigDev = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: "redditclone",
    entities: [Post, User, Vote],
    synchronize: true,
    logging: true,
} as DataSourceOptions


const typeOrmConfigProd = {
    type: "postgres",
    url: process.env.POSTGRES_URL,
    logging: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    ssl: true,
    entities: [Post, User, Vote],
    migrations: [path.join(__dirname, "./migrations/*")],
} as DataSourceOptions

export { typeOrmConfigDev, typeOrmConfigProd }