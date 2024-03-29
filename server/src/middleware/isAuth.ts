import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";

const AUTHENTICATE_ERROR = 'NOT_AUTHENTICATED'
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error(AUTHENTICATE_ERROR)
    }
    return next()
}