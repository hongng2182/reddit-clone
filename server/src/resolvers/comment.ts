import { Resolver, Mutation, UseMiddleware, Ctx, InputType, Field, Arg, ObjectType, Int } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { Comment, Post, User } from "../entities";
import { MyContext } from "../types";

@InputType()
class CreateCommentInput {
    @Field()
    message: string
    @Field()
    postId: number
    @Field({ nullable: true })
    parentId: number
}

@ObjectType()
class CommentResponse {
    @Field(() => String, { nullable: true })
    errors?: string
    @Field(() => Comment, { nullable: true })
    comment?: Comment
}


@Resolver(_of => Comment)
export class CommentResolver {
    @Mutation(() => CommentResponse)
    @UseMiddleware(isAuth)
    async createComment(
        @Arg("input") input: CreateCommentInput,
        @Ctx() { req }: MyContext
    ): Promise<CommentResponse> {
        const { message, postId, parentId } = input
        const post = await Post.findOne({ where: { id: postId } })
        if (!post) {
            return { errors: "No posts available!" }
        }
        if (message === '') {
            return { errors: "Comment message cant't be empty" }
        }

        // Create new record in db
        try {
            const comment = Comment.create({
                userId: req.session.userId,
                message,
                postId,
                parentId
            })
            await comment.save()
            const commentWithUser = await Comment.findOne({
                where: { id: comment.id },
                relations: { user: true }
            })
            if (!commentWithUser) {
                return { errors: "Can't find new comment" }
            }
            return { comment: commentWithUser }
        } catch (err) {
            console.log("Error in createComment", err)
            return { errors: 'Fail to create comment!' }
        }
    }

    @Mutation(() => CommentResponse, { nullable: true })
    @UseMiddleware(isAuth)
    async updateComment(
        @Arg("id", () => Int) id: number,
        @Arg("message", () => String) message: string,
        @Ctx() { req }: MyContext)
        : Promise<CommentResponse> {
        // Check user legit to allow make change to comment
        const { userId } = req.session
        const user = await User.findOne({ where: { id: userId } })
        if (!user) { return { errors: 'You must login to perform this action!' } }

        // Find comment in db
        const comment = await Comment.findOne({ where: { id } })
        if (!comment) { return { errors: 'No comment found!' } }

        // Check if user is comment owner
        const isCommentOwner = user?.id === comment.userId
        if (!isCommentOwner) { return { errors: 'You are not allowed to edit this comment!' } }

        // Update the comment
        comment.message = message
        await comment.save()
        const commentWithUser = await Comment.findOne({
            where: { id: comment.id },
            relations: { user: true }
        })
        if (!commentWithUser) {
            return { errors: "Can't find new comment" }
        }
        return { comment: commentWithUser }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteComment(
        @Arg("id", () => Int) id: number,
        @Ctx() { req }: MyContext
    ) {
        // Check user legit to allow delete comment
        const { userId } = req.session
        const user = await User.findOne({ where: { id: userId } })
        if (!user) { return { errors: 'You must login to perform this action!' } }

        // Find comment in db
        const comment = await Comment.findOne({ where: { id } })
        if (!comment) { return { errors: 'No comment found!' } }

        // Check if user is comment owner
        const isCommentOwner = user?.id === comment.userId
        if (!isCommentOwner) { return { errors: 'You are not allowed to delete this comment!' } }

        // Try delete comment
        try {
            comment.isDeleted = true
            await comment.save()
            return true
        } catch (e) {
            console.log('Error delete comment', e)
            return false
        }
    }

}


