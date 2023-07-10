import { MyContext, PrivacyType } from "../types/index";
import { Community, UserCommunity } from "../entities";
import { Arg, Int, Query, Resolver, Mutation, InputType, Field, Ctx, UseMiddleware, FieldResolver, Root, ObjectType, registerEnumType } from "type-graphql";
import { isAuth } from "../middleware/isAuth";

registerEnumType(PrivacyType, {
    name: 'PrivacyType'
})

@InputType()
class CommunityInput {
    @Field()
    name: string
    @Field()
    privacyType: PrivacyType
}


@InputType()
class CommunityUpdateInput {
    @Field({ nullable: true })
    name?: string
    @Field({ nullable: true })
    privacyType?: PrivacyType
    @Field({ nullable: true })
    description?: string
    @Field({ nullable: true })
    communityIconUrl?: string
}

@ObjectType()
class CommunityResponse {
    @Field(() => String, { nullable: true })
    errors?: String
    @Field(() => Community, { nullable: true })
    community?: Community
}

@Resolver(_of => Community)
export class CommunityResolver {


    // @FieldResolver(() => User)
    // async user(@Root() root: Post,
    //     @Ctx() { dataLoaders: { userLoader } }: MyContext
    // ) {
    //     return await userLoader.load(root.ownerId)
    // }

    // @FieldResolver(() => Community)
    // async community(@Root() root: Post,
    //     @Ctx() { dataLoaders: { communityLoader } }: MyContext
    // ) {
    //     return await communityLoader.load(root.communityId)
    // }

    @FieldResolver(() => Boolean)
    async hasJoined(@Root() root: Community,
        @Ctx() { req }: MyContext) {
        if (!req.session.userId) { return false }
        const record = await UserCommunity.findOne({ where: { communityId: root.id, userId: req.session.userId } })
        return record ? true : false
    }

    @Query(() => Community, { nullable: true })
    async community(
        @Arg("communityName", () => String) communityName: string
    ): Promise<Community | null> {
        const community = await Community.findOne({ where: { name: communityName } })
        if (!community) {
            return null
        }
        return community
    }

    // @Query(() => Post, { nullable: true })
    // async post(@Arg("id") id: number): Promise<Post | null> {
    //     return await AppDataSource.getRepository(Post).findOneBy({ id })
    //     // Post.findOne({ where: { id } })
    // }

    @Mutation(() => CommunityResponse)
    @UseMiddleware(isAuth)
    async createCommunity(
        @Arg("input") input: CommunityInput,
        @Ctx() { req }: MyContext
    ): Promise<CommunityResponse> {
        // Check name valid and name must be < 3-21 characters
        const regex = new RegExp(/^[a-zA-Z0-9_]*$/)
        if (input.name.length > 21 || input.name.length < 3 ||
            !regex.test(input.name)) { return { errors: 'Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores.' } }

        // Check community name exists
        const community = await Community.findOne({ where: { name: input.name } })

        if (community) {
            return { errors: 'Community already exists' }
        } else {
            // Create community
            const community = Community.create({
                ...input,
                creatorId: req.session.userId
            })
            try {
                await community.save()
                // Update record in table UserCommunity
                const user_community = UserCommunity.create({
                    userId: req.session.userId,
                    communityId: community.id,
                    isModerator: true
                })
                await user_community.save()
                return { community }
            } catch (err) {
                console.log(err)
                return { errors: "Fail to create community!" }
            }
        }
    }

    @Mutation(() => CommunityResponse)
    @UseMiddleware(isAuth)
    async updateCommunity(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => CommunityUpdateInput) input: CommunityUpdateInput,
        @Ctx() { req }: MyContext)
        : Promise<CommunityResponse> {

        const community = await Community.findOne({ where: { id } })
        if (!community) {
            return { errors: 'No community found!' }
        }
        if (req.session.userId !== community.creatorId) {
            return { errors: 'You are not allowed to modify this community information!' }
        }
        // update field respectively
        try {
            if (input.communityIconUrl) { community.communityIconUrl = input.communityIconUrl }
            if (input.name) { community.name = input.name }
            if (input.description) { community.description = input.description }
            if (input.privacyType) { community.privacyType = input.privacyType }
            await community.save()
            return { community }
        } catch (err) {
            console.log(err)
            return { errors: "Fail to update community!" }
        }
    }

    // Join Community


    // Leave Community

}