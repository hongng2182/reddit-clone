import { DataSourceOptions } from "typeorm";
import { __prod__ } from "./constants";
import { Post, User, Vote } from "./entities";

require('dotenv').config()

export default {
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
