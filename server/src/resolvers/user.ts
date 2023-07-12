import { User } from "../entities";
import { MyContext } from "../types";
import { Arg, Ctx, Resolver, Mutation, InputType, Field, ObjectType, Query } from "type-graphql";
import argon2 from 'argon2'
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../utils/sendEmail";
import { v4 as uuidv4 } from 'uuid';

@InputType()
class UserInfoInput {
    @Field()
    email: string
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
        @Ctx() { req }: MyContext) {
        if (!req.session.userId) {
            return null
        }
        return User.findOne({ where: { id: req.session.userId } })
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options', () => UserInfoInput) options: UserInfoInput,
        @Ctx() { req }: MyContext): Promise<UserResponse> {
        const emailPattern = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
        if (!emailPattern.test(options.email)) {
            return {
                errors: [{ field: "email", message: "Invalid email!" }]
            }
        }
        if (options.username.length <= 8) {
            return {
                errors: [{ field: "username", message: "Username must be at least 8 characters" }]
            }
        }

        if (options.username.includes('@')) {
            return {
                errors: [{ field: "username", message: "Username can't include special characters" }]
            }
        }

        const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

        if (!regex.test(options.password)) {
            return {
                errors: [{ field: "password", message: "Password must be at least eight characters, one uppercase letter, one lowercase letter, one number and one special character" }]
            }
        }
        const hashedPassword = await argon2.hash(options.password)
        const user = User.create({ email: options.email, username: options.username, password: hashedPassword })
        try {
            await user.save()
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
        @Arg('usernameOrEmail', () => String) usernameOrEmail: string,
        @Arg('password', () => String) password: string,
        @Ctx() { req }: MyContext): Promise<UserResponse> {
        const user = await User.findOne({ where: usernameOrEmail.includes('@') ? { email: usernameOrEmail } : { username: usernameOrEmail } })
        const errors = [{
            field: "usernameOrEmail",
            message: "Incorect username or password!"
        },
        { field: "password", message: " " }]
        if (!user) {
            return { errors }
        }
        const validUser = await argon2.verify(user.password, password)
        if (!validUser) {
            return { errors }
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

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email', () => String) email: string,
        @Ctx() { redisClient }: MyContext): Promise<boolean> {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return true
        }
        const token = uuidv4()

        await redisClient.set(FORGOT_PASSWORD_PREFIX + token, user.id, {
            EX: 1000 * 20,
        }) // 1 day
        const emailContent = `<a href="http://localhost:3000/change-password/${token}">Reset your password</a>`

        await sendEmail(email, emailContent)
        return true
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token', () => String) token: string,
        @Arg('newPassword', () => String) newPassword: string,
        @Ctx() { redisClient, req }: MyContext): Promise<UserResponse> {
        const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

        if (!regex.test(newPassword)) {
            return {
                errors: [{ field: "newPassword", message: "Password must be at least eight characters, one uppercase letter, one lowercase letter, one number and one special character" }]
            }
        }

        const key = FORGOT_PASSWORD_PREFIX + token
        const userId = await redisClient.get(key)

        if (!userId) {
            return {
                errors: [{ field: "token", message: "Token expired!" }]
            }
        } else {
            const userIdInt = parseInt(userId)
            const user = await User.findOne({ where: { id: userIdInt } })

            if (!user) {
                return {
                    errors: [{ field: "token", message: "User no longer exists!" }]
                }
            }
            User.update({ id: userIdInt }, { password: await argon2.hash(newPassword) })

            await redisClient.del([key])
            // logIn user after change pasword
            req.session.userId = user.id
            return { user }
        }


    }


}