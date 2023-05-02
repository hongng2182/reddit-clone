import { __prod__ } from "./constants";
import { Post, User } from "./entities";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
require('dotenv').config()

console.log()
export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
    },
    allowGlobalContext: true,
    entities: [Post, User],
    dbName: 'reddit-clone',
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    debug: !__prod__,
    type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0]