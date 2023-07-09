import DataLoader from 'dataloader'
import { Vote, User, Community } from '../entities'
import { In } from 'typeorm'

interface VoteTypeCondition {
    postId: number
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
})