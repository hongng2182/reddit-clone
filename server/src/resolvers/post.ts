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
    communityId: number
    @Field({ nullable: true })
    text?: string
    @Field({ nullable: true })
    urlLink?: string
    @Field({ nullable: true })
    imageUrl?: string
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

@ObjectType()
class PostResponse {
    @Field(() => String, { nullable: true })
    errors?: string
    @Field(() => Post, { nullable: true })
    post?: Post
}

@Resolver(_of => Post)
export class PostResolver {

    @FieldResolver(() => String, { nullable: true })
    textSnippet(@Root() root: Post) {
        return root.text ? root.text.slice(0, 50) : null
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
    @FieldResolver(() => Int)
    numComments() {
        return 0
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

    @Query(() => PaginatedPosts)
    async getCommunityPosts(
        @Arg("after", () => String, { nullable: true }) after: string | null,
        @Arg("first", () => Int) first: number,
        @Arg("communityName", () => String) communityName: string
    ): Promise<PaginatedPosts | { errors: String }> {

        // Calculate offset and limit based on the "after" and "first" parameters
        const offset = after ? parseInt(Buffer.from(after, 'base64').toString(), 10) : 0;
        const limit = Math.min(20, first);
        const community = await Community.findOne({ where: { name: communityName } })

        if (!community) {
            return { errors: "No community found with this name!" }
        }
        // Get posts with pagination
        const [posts, totalCount] = await AppDataSource.getRepository(Post).findAndCount({
            order: { createdAt: 'DESC' },
            skip: offset,
            take: limit,
            where: { communityId: community.id }
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

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("input") input: PostInput,
        @Ctx() { req }: MyContext
    ): Promise<PostResponse> {
        const { title, communityId } = input
        const community = await Community.findOne({ where: { id: communityId } })
        // Check validity of communityId and Post title
        if (!community) {
            return { errors: "Sorry, you can't post in this community!" }
        }
        if (title === '') {
            return { errors: "Title cant't be empty" }
        }
        // Append field if has to create new post
        let form: PostInput = { title, communityId }

        if (input.text) {
            if (input.text === '') { return { errors: "Post content cant't be empty" } }
            form = { ...form, text: input.text }
        }
        if (input.imageUrl) {
            if (input.imageUrl === '') { return { errors: "Sorry, something wrong happend this your post image!" } }
            form = { ...form, imageUrl: input.imageUrl }
        }
        if (input.urlLink) {
            if (input.urlLink === '') { return { errors: "Sorry, your post's link cant't be empty" } }
            form = { ...form, urlLink: input.urlLink }
        }
        // Create new record in db
        try {
            const post = Post.create({
                ownerId: req.session.userId,
                ...form
            })
            await post.save()
            // update Vote Table 
            const upvote = await Vote.create({ userId: req.session.userId, postId: post.id, value: 1 })
            await upvote.save()
            return { post }
        } catch (err) {
            console.log("Error in createPost", err)
            return { errors: 'Fail to create post!' }
        }
    }

    @Mutation(() => Post, { nullable: true })
    @UseMiddleware(isAuth)
    async updatePost(
        @Arg("id", () => Int) id: number,
        @Arg("text", () => String) text: string): Promise<Post | null> {
        const post = await Post.findOne({ where: { id } })
        if (!post) {
            return null
        }

        if (text === '') {
            return null
        }

        post.text = text

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