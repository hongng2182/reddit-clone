// eslint-disable-next-line import/prefer-default-export

export type CommentInfo = {
    __typename?: "Comment" | undefined;
    id: number;
    message: string;
    postId: number;
    parentId?: number | null | undefined;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    user: {
        __typename?: "User" | undefined;
        profileUrl?: string | null | undefined;
        username: string;
        id: number;
    };
}