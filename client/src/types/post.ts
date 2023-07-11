// eslint-disable-next-line import/prefer-default-export
export enum VoteStatusValues {
    Upvote = 1,
    Downvote = -1
}

export const FETCH_LIMIT = 10

export type PostInfo = { __typename?: 'Post', id: number, title: string, text: string, points: number, textSnippet: string, ownerId: number, createdAt: string, updatedAt: string, voteStatus: number, urlLink: string, imageUrl: string, numComments: number, communityId: number, user: { __typename?: 'User', username: string }, community: { __typename?: 'Community', name: string, hasJoined: boolean, communityIconUrl: string } }