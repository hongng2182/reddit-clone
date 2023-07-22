import { MyContext, PrivacyType } from "../types/index";
import { Community, UserCommunity } from "../entities";
import { Arg, Int, Query, Resolver, Mutation, InputType, Field, Ctx, UseMiddleware, FieldResolver, Root, ObjectType, registerEnumType } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { Raw } from "typeorm";

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
    displayName?: string
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
@ObjectType()
class UserCommunities {
    @Field(() => Boolean)
    isModerator?: boolean
    @Field(() => Community)
    community?: Community
}


@ObjectType()
class SearchResponse {
    @Field(() => String, { nullable: true })
    errors?: string
    @Field(() => [Community], { nullable: true })
    communities?: Community[]
    @Field(() => Int, { nullable: true })
    totalCount?: number
}


@Resolver(_of => Community)
export class CommunityResolver {


    @FieldResolver(() => Int)
    async numMembers(@Root() root: Community,
        @Ctx() { dataLoaders: { numMembersLoader } }: MyContext) {
        // const [_, totalCount] = await UserCommunity.findAndCountBy({ communityId: root.id })
        // return totalCount
        return await numMembersLoader.load(root.id)
    }

    @FieldResolver(() => Boolean)
    async hasJoined(@Root() root: Community,
        @Ctx() { req, dataLoaders: { userCommunityLoader } }: MyContext) {
        if (!req.session.userId) { return false }
        const record = await userCommunityLoader.load({ communityId: root.id, userId: req.session.userId })
        return record ? true : false
    }

    @Query(() => [UserCommunities], { nullable: true })
    async userCommunities(
        // @Arg("userId", () => Int) userId: number,
        @Ctx() { req }: MyContext
    ): Promise<UserCommunities[]> {
        const record = await UserCommunity.find({
            relations: {
                community: true,
            }, where: { userId: req.session.userId }
        })
        const commuity = record.map(item => ({
            community: item.community,
            isModerator: item.isModerator
        }))

        return commuity
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

    @Query(() => SearchResponse, { nullable: true })
    async searchCommunities(
        @Arg("keyword", () => String) keyword: string,
        @Arg("limit", () => Int, { nullable: true }) limit?: number
    ): Promise<SearchResponse> {
        if (!keyword) { return { errors: 'Invalid query' } }
        // Find community includes keyword
        const [result, totalCount] = await Community.findAndCount({
            where: {
                name: limit ? Raw(alias => `LOWER(${alias}) Like '${keyword.toLowerCase()}%'`) : Raw(alias => `LOWER(${alias}) Like '%${keyword.toLowerCase()}%'`)
            },
            take: limit
        })
        return {
            communities: result,
            totalCount
        }
    }

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
                displayName: input.name,
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
            if (input.displayName) { community.displayName = input.displayName }
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
    @Mutation(() => CommunityResponse)
    @UseMiddleware(isAuth)
    async joinCommunity(
        @Arg("communityName", () => String) communityName: string,
        @Ctx() { req }: MyContext)
        : Promise<CommunityResponse> {
        // find Community
        const community = await Community.findOne({ where: { name: communityName } })
        if (!community) {
            return { errors: 'No community found!' }
        }
        // update table user-community and increment community members
        try {
            const user_community = UserCommunity.create({
                userId: req.session.userId,
                communityId: community.id
            })
            await user_community.save()
            return { community }
        } catch (err) {
            console.log(err)
            return { errors: "Fail to join community!" }
        }
    }

    // Leave Community
    @Mutation(() => CommunityResponse)
    @UseMiddleware(isAuth)
    async leaveCommunity(
        @Arg("communityName", () => String) communityName: string,
        @Ctx() { req }: MyContext)
        : Promise<CommunityResponse> {
        // find Community
        const community = await Community.findOne({ where: { name: communityName } })
        if (!community) {
            return { errors: 'No community found!' }
        }
        if (community.creatorId === req.session.userId) {
            return { errors: "Can't leave community cause you are the moderator!" }
        }
        // update table user-community and minus community members
        try {
            await UserCommunity.delete({
                userId: req.session.userId,
                communityId: community.id,
                isModerator: false
            })
            return { community }
        } catch (err) {
            console.log(err)
            return { errors: "Fail to leave community!" }
        }
    }
}