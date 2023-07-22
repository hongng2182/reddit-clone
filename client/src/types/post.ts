// eslint-disable-next-line import/prefer-default-export
export enum VoteStatusValues {
    Upvote = 1,
    Downvote = -1
}

export type PostInfo = { __typename?: 'Post', id: number, title: string, text?: string | null, points: number, textSnippet?: string | null, ownerId: number, createdAt: string, updatedAt: string, voteStatus: number, urlLink?: string | null, imageUrl?: string | null, numComments: number, communityId: number, user: { __typename?: 'User', username: string }, community: { __typename?: 'Community', name: string, hasJoined: boolean, communityIconUrl?: string | null }, comments?: Array<{ __typename?: 'Comment', id: number, message: string, postId: number, parentId?: number | null, isDeleted: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', profileUrl?: string | null, username: string, id: number } }> | null }