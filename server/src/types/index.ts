import { Request, Response } from "express"
import { Session } from "express-session";
import { RedisClientType } from "redis";

export type MyContext = {
    req: Request & { session: Session & { userId: number } }
    res: Response
    redisClient: RedisClientType
}

export enum VoteType {
    UPVOTE = 1,
    DOWNVOTE = -1
}