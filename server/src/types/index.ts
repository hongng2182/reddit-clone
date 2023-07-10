import { Request, Response } from "express"
import { Session } from "express-session";
import { RedisClientType } from "redis";
import { buildDataLoaders } from "src/utils/dataLoaders";

export type MyContext = {
    req: Request & { session: Session & { userId?: number } }
    res: Response
    redisClient: RedisClientType
    dataLoaders: ReturnType<typeof buildDataLoaders>
}

export enum VoteType {
    UPVOTE = 1,
    DOWNVOTE = -1
}

export enum PrivacyType {
    public = 'public',
    restricted = 'restricted',
    private = 'private'
}