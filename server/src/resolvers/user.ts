import { Community, User } from "../entities";
import { MyContext } from "../types";
import { Arg, Ctx, Resolver, Mutation, InputType, Field, ObjectType, Query, UseMiddleware } from "type-graphql";
import argon2 from 'argon2'
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../constants";
import { getEmailTemplate, sendEmail } from "../utils/sendEmail";
import { isAuth } from "../middleware/isAuth";
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

@ObjectType()
class PartialUser implements Partial<User> {
    @Field()
    username!: string;
    @Field({ nullable: true })
    profileUrl!: string;
    @Field(() => String)
    createdAt: Date;
}
@ObjectType()
class UserCommonInfoResponse {
    @Field(() => String, { nullable: true })
    errors?: string
    @Field(() => PartialUser, { nullable: true })
    user?: Partial<User>
    @Field(() => [Community], { nullable: true })
    moderators?: Community[]
}

@ObjectType()
class ForgotPasswordResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]
    @Field(() => String, { nullable: true })
    message?: string
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

    @Query(() => UserCommonInfoResponse)
    async userCommonInfo(
        @Arg('userName', () => String) userName: string): Promise<UserCommonInfoResponse> {
        const user = await User.findOne({ where: { username: userName } })

        if (!user) {
            return { errors: "No user found with this name!" }
        }

        const { username, createdAt, profileUrl } = user

        // Get communities where user is moderator
        const communities = await Community.findBy({ creatorId: user.id })

        return { user: { username, createdAt, profileUrl }, moderators: communities }

    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async updateUserProfile(
        @Arg("profileUrl", () => String) profileUrl: string,
        @Ctx() { req }: MyContext): Promise<UserResponse> {
        const userId = req.session.userId
        if (!userId) {
            return {
                errors: [{
                    field: '', message: "You're not allowed to perform this action"
                }]
            }
        }
        const user = await User.findOne({ where: { id: userId } })
        if (!user) {
            return {
                errors: [{
                    field: '', message: "No user found!"
                }]
            }
        }

        if (profileUrl === '') {
            return {
                errors: [{
                    field: '', message: "Profile image can't be empty!"
                }]
            }
        }

        user.profileUrl = profileUrl

        await user.save()
        return { user }
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

    @Mutation(() => ForgotPasswordResponse)
    async forgotPassword(
        @Arg('email', () => String) email: string,
        @Ctx() { redisClient }: MyContext): Promise<ForgotPasswordResponse> {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return { errors: [{ field: "email", message: "Sorry, No account associated with this address!" }] }
        }
        try {
            const token = uuidv4()
            await redisClient.set(FORGOT_PASSWORD_PREFIX + token, user.id, {
                EX: 10 * 60 * 1000,
            }) // 10 mins
            const emailContent = getEmailTemplate(token)

            await sendEmail(email, emailContent)
            return {
                message: "Thanks! If your MiniReddit username and email address match, you'll get an email with a link to reset your password shortly"
            }
        } catch (error) {
            return { errors: [{ field: "email", message: "Error sending forgot password intructions to your email!" }] }
        }
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