export type CommunityInfo = { __typename?: "Community" | undefined; id: number; name: string; displayName: string; description?: string | null | undefined; creatorId: number; numMembers: number; privacyType: string; communityIconUrl?: string | null | undefined; createdAt: string; hasJoined: boolean; }

export enum PrivacyType {
    public = 'public',
    restricted = 'restricted',
    private = 'private'
}

export type CommunityFragment = {
    __typename?: "Community" | undefined;
    id: number;
    name: string;
    communityIconUrl?: string | null | undefined;
    numMembers: number;
}

export type UserCommunities = {
    __typename?: "UserCommunities" | undefined;
    isModerator: boolean;
    community: CommunityFragment
}[]