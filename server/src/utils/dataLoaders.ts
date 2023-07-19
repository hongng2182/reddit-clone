import DataLoader from 'dataloader'
import { Vote, User, Community, UserCommunity, Comment } from '../entities'
import { In } from 'typeorm'

interface VoteTypeCondition {
    postId: number
    userId: number
}

interface UserCommunityCondition {
    communityId: number
    userId: number
}

const batchGetUsers = async (userIds: number[]) => {
    const users = await User.findBy({ id: In(userIds) })
    return userIds.map(userId => users.find(user => user.id === userId))
}

const batchGetCommunities = async (communityIds: number[]) => {
    const communities = await Community.findBy({ id: In(communityIds) })
    return communityIds.map(communityId => communities.find(community => community.id === communityId))
}

const batchGetComments = async (postIds: number[]) => {
    const comments = await Comment.find({
        where: { postId: In(postIds) },
        relations: { user: true }
    })
    return postIds.map(postId => comments.filter(comment => comment.postId === postId))
}

const batchGetTotalNumOfComments = async (postIds: number[]) => {
    const counts = await Comment.createQueryBuilder('comment')
        .select('comment.postId', 'postId')
        .addSelect('COUNT(comment.id)', 'count')
        .where('comment.postId IN (:...postIds)', { postIds })
        .groupBy('comment.postId')
        .getRawMany();

    const countMap = new Map<number, number>();
    counts.forEach((count: { postId: number; count: number }) => {
        countMap.set(count.postId, count.count);
    });

    return postIds.map((postId) => countMap.get(postId) || 0);
}

const batchGetTotalNumOfMembers = async (communityIds: number[]) => {
    const counts = await UserCommunity.createQueryBuilder('userCommunity')
        .select('userCommunity.communityId', 'communityId')
        .addSelect('COUNT(userCommunity.userId)', 'count')
        .where('userCommunity.communityId IN (:...communityIds)', { communityIds })
        .groupBy('userCommunity.communityId')
        .getRawMany();

    const countMap = new Map<number, number>();
    counts.forEach((count: { communityId: number; count: number }) => {
        countMap.set(count.communityId, count.count);
    });

    return communityIds.map((communityId) => countMap.get(communityId) || 0);
}


const batchGetVoteTypes = async (voteTypeConditions: VoteTypeCondition[]) => {
    const voteTypes = await Vote.findByIds(voteTypeConditions)
    return voteTypeConditions.map(voteTypeCondition =>
        voteTypes.find(
            voteType =>
                voteType.postId === voteTypeCondition.postId &&
                voteType.userId === voteTypeCondition.userId
        )
    )
}

const batchGetUserCommunities = async (userCommunityConditions: UserCommunityCondition[]) => {
    const userCommunities = await UserCommunity.findByIds(userCommunityConditions)
    return userCommunityConditions.map(userCommunityCondition =>
        userCommunities.find(
            record =>
                record.communityId === userCommunityCondition.communityId &&
                record.userId === userCommunityCondition.userId
        )
    )
}


export const buildDataLoaders = () => ({
    userLoader: new DataLoader<number, User | undefined>(userIds =>
        batchGetUsers(userIds as number[])
    ),
    voteTypeLoader: new DataLoader<VoteTypeCondition, Vote | undefined>(
        voteTypeConditions =>
            batchGetVoteTypes(voteTypeConditions as VoteTypeCondition[])
    ),
    communityLoader: new DataLoader<number, Community | undefined>(communityIds =>
        batchGetCommunities(communityIds as number[])
    ),
    userCommunityLoader: new DataLoader<UserCommunityCondition, UserCommunity | undefined>(
        userCommunityConditions =>
            batchGetUserCommunities(userCommunityConditions as UserCommunityCondition[])
    ),
    commentLoader: new DataLoader<number, Comment[] | undefined>(postIds =>
        batchGetComments(postIds as number[])
    ),
    numCommentsLoader: new DataLoader<number, number | undefined>(postIds =>
        batchGetTotalNumOfComments(postIds as number[])
    ),
    numMembersLoader: new DataLoader<number, number | undefined>(communityIds =>
        batchGetTotalNumOfMembers(communityIds as number[])
    ),
})