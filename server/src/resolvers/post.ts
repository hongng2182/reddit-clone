import { MyContext, VoteType } from "../types/index";
import { Community, Post, User, Vote } from "../entities";
import { Arg, Int, Query, Resolver, Mutation, InputType, Field, Ctx, UseMiddleware, FieldResolver, Root, ObjectType, registerEnumType } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { AppDataSource } from "../index";
import { UserInputError } from "apollo-server-express";

registerEnumType(VoteType, {
    name: 'VoteType'
})

@InputType()
class PostInput {
    @Field()
    title: string
    @Field()
    text: string
    //communityId, urlLink, imageUrl
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
    async user(@Root() root: Post,
        @Ctx() { dataLoaders: { userLoader } }: MyContext
    ) {
        return await userLoader.load(root.ownerId)
    }

    @FieldResolver(() => Community)
    async community(@Root() root: Post,
        @Ctx() { dataLoaders: { communityLoader } }: MyContext
    ) {
        return await communityLoader.load(root.communityId)
    }

    @FieldResolver(() => Int)
    async voteStatus(@Root() root: Post,
        @Ctx() { req, dataLoaders: { voteTypeLoader } }: MyContext) {

        if (!req.session.userId) { return 0 }
        // const voteStatus = await Vote.findOne({ where: { postId: root.id, userId: req.session.userId } })
        const voteStatus = await voteTypeLoader.load({ postId: root.id, userId: req.session.userId })

        return voteStatus ? voteStatus.value : 0
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
    async post(@Arg("id") id: number): Promise<Post | null> {
        return await AppDataSource.getRepository(Post).findOneBy({ id })
        // Post.findOne({ where: { id } })
    }

    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("input") input: PostInput,
        @Ctx() { req }: MyContext
    ): Promise<Post> {
        return Post.create({
            ...input,
            ownerId: req.session.userId,
            //urlLink
            //communityId
            // imageUrl
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
            await Vote.delete({ postId: id })
            await Post.delete({ id, ownerId: req.session.userId })
            return true
        } catch (e) {
            return false
        }
    }


    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async vote(
        @Arg("postId", () => Int) postId: number,
        @Arg("voteValue", () => VoteType) voteValue: VoteType,
        @Ctx() { req }: MyContext
    ): Promise<Post> {
        const { userId } = req.session
        return await AppDataSource.transaction(async (transactionalEntityManager) => {
            // find Post to add points
            let post = await transactionalEntityManager.findOne(Post, { where: { id: postId } })

            // if no post found, throw Error
            if (!post) {
                throw new UserInputError('No post found')
            }

            // check if user has voted post
            const existingVote = await transactionalEntityManager.findOne(Vote, {
                where: {
                    postId,
                    userId
                }
            })

            // Case: user has voted and now change voteType : save new vote and update points
            if (existingVote && existingVote.value !== voteValue) {
                await transactionalEntityManager.save(Vote, {
                    ...existingVote,
                    value: voteValue
                })
                post = await transactionalEntityManager.save(Post, {
                    ...post,
                    points: post.points + 2 * voteValue
                })
            }

            // Case: user not voted before: create new record in Vote table + update points
            if (!existingVote) {
                const newVote = transactionalEntityManager.create(Vote, {
                    userId,
                    postId,
                    value: voteValue
                })
                await transactionalEntityManager.save(newVote)
                post.points = post.points + voteValue
                post = await transactionalEntityManager.save(post)

            }

            return post

        })
    }
}