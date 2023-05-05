import { Request, Response } from "express"
import { Session } from "express-session";
import { RedisClientType } from "redis";

export type MyContext = {
    req: Request & { session: Session & { userId: number } }
    res: Response
    redisClient: RedisClientType
}