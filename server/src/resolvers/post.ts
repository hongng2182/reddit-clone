import { MyContext } from "src/types";
import { Post, User } from "../entities";
import { Arg, Int, Query, Resolver, Mutation, InputType, Field, Ctx, UseMiddleware, FieldResolver, Root, ObjectType } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { AppDataSource } from "../index";

@InputType()
class PostInput {
    @Field()
    title: string
    @Field()
    text: string
}

@ObjectType()
class PageInfo {
    @Field(() => String, { nullable: true })
    endCursor: string | null

    @Field()
    hasNextPage: boolean


    @Field()
    hasPreviousPage: boolean
}


@ObjectType()
class PaginatedPosts {
    @Field(() => [Post])
    paginatedPosts: Post[]

    @Field()
    pageInfo: PageInfo
}
@Resolver(_of => Post)
export class PostResolver {

    @FieldResolver(() => String)
    textSnippet(@Root() root: Post) {
        return root.text.slice(0, 50)
    }

    @FieldResolver(() => User)
    async user(@Root() root: Post) {
        return await User.findOne({ where: { id: root.ownerId } })
    }

    @Query(() => PaginatedPosts)
    async posts(
        @Arg("after", () => String, { nullable: true }) after: string | null,
        @Arg("first", () => Int) first: number
    ): Promise<PaginatedPosts> {

        // Calculate offset and limit based on the "after" and "first" parameters
        const offset = after ? parseInt(Buffer.from(after, 'base64').toString(), 10) : 0;
        const limit = Math.min(20, first);

        // Get posts with pagination
        const [posts, totalCount] = await AppDataSource.getRepository(Post).findAndCount({
            order: { createdAt: 'DESC' },
            skip: offset,
            take: limit,
        })

        // Calculate endCursor, and encode 
        const hasNextPage = offset + limit < totalCount
        const endCursor = hasNextPage ? Buffer.from((offset + limit).toString()).toString('base64') : null

        // Calculate pageInfo
        const pageInfo = {
            endCursor,
            hasNextPage,
            hasPreviousPage: offset > 0,
        };

        return { paginatedPosts: posts, pageInfo: pageInfo }

    }

    @Query(() => Post, { nullable: true })
    post(@Arg("id") id: number): Promise<Post | null> {
        return Post.findOne({ where: { id } })
    }

    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("input") input: PostInput,
        @Ctx() { req }: MyContext
    ): Promise<Post> {
        return Post.create({
            ...input,
            ownerId: req.session.userId
        }).save()
    }

    @Mutation(() => Post, { nullable: true })
    @UseMiddleware(isAuth)
    async updatePost(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => PostInput) input: PostInput): Promise<Post | null> {
        const post = await Post.findOne({ where: { id } })
        if (!post) {
            return null
        }

        if (input.text === '' || input.title === '') {
            return null
        }

        post.title = input.title
        post.text = input.text

        await post.save()
        return post
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(
        @Arg("id", () => Int) id: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        try {
            await Post.delete({ id, ownerId: req.session.userId })
            return true
        } catch (e) {
            return false
        }
    }
}