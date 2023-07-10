export type CommunityInfo = { __typename?: 'Community', id: number, name: string, description: string, creatorId: number, numMembers: number, privacyType: string, communityIconUrl: string, createdAt: string, hasJoined: boolean }

export enum PrivacyType {
    public = 'public',
    restricted = 'restricted',
    private = 'private'
}