// eslint-disable-next-line import/prefer-default-export
export enum VoteStatusValues {
    Upvote = 1,
    Downvote = -1
}

export type PostInfo = { __typename?: 'Post', id: number, title: string, text?: string | null, points: number, textSnippet?: string | null, ownerId: number, createdAt: string, updatedAt: string, voteStatus: number, urlLink?: string | null, imageUrl?: string | null, numComments: number, communityId: number, user: { __typename?: 'User', username: string }, community: { __typename?: 'Community', name: string, hasJoined: boolean, communityIconUrl?: string | null } }