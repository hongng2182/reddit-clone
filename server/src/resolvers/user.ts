import { User } from "../entities";
import { MyContext } from "../types";
import { Arg, Ctx, Resolver, Mutation, InputType, Field, ObjectType, Query } from "type-graphql";
import argon2 from 'argon2'
import { COOKIE_NAME } from "../constants";

@InputType()
class UserInfoInput {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]
    @Field(() => User, { nullable: true })
    user?: User
}

@Resolver()
export class UserResolver {

    @Query(() => User, { nullable: true })
    async me(
        @Ctx() { em, req }: MyContext) {
        if (!req.session.userId) {
            return null
        }
        const user = await em.findOne(User, { id: req.session.userId })
        return user
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options', () => UserInfoInput) options: UserInfoInput,
        @Ctx() { em, req }: MyContext): Promise<UserResponse> {
        if (options.username.length <= 8) {
            return {
                errors: [{ field: "username", message: "Username must be at least 8 characters" }]
            }
        }
        const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

        if (!regex.test(options.password)) {
            return {
                errors: [{ field: "password", message: "Password must be at least eight characters, one uppercase letter, one lowercase letter, one number and one special character" }]
            }
        }
        const hashedPassword = await argon2.hash(options.password)
        const user = em.create(User, { username: options.username, password: hashedPassword, createdAt: new Date(), updatedAt: '' })
        try {
            await em.persistAndFlush(user);
        } catch (err) {
            if (err.code === '23505') {
                return { errors: [{ field: "username", message: "Username already exists!" }] }
            }
            console.error(err)
        }
        req.session.userId = user.id
        return { user }
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options', () => UserInfoInput) options: UserInfoInput,
        @Ctx() { em, req }: MyContext): Promise<UserResponse> {
        const user = await em.findOne(User, { username: options.username })
        if (!user) {
            return {
                errors: [{
                    field: "username",
                    message: "Username doesn't exists"
                }]
            }
        }
        const validUser = await argon2.verify(user.password, options.password)
        if (!validUser) {
            return {
                errors: [{ field: "password", message: "Incorect password!" }]
            }
        }

        req.session.userId = user.id

        return {
            user
        }
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
        return new Promise((resolve, _reject) => {
            res.clearCookie(COOKIE_NAME)
            req.session.destroy(error => {
                if (error) {
                    console.log("Error destroy cookie", error)
                    resolve(false)
                    return;
                }
                resolve(true)
            })

        })
    }

}