import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  children?: Maybe<Array<Comment>>;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  isDeleted: Scalars['Boolean'];
  message: Scalars['String'];
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['Float']>;
  post: Post;
  postId: Scalars['Float'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  comment?: Maybe<Comment>;
  errors?: Maybe<Scalars['String']>;
};

export type CommentSearchResponse = {
  __typename?: 'CommentSearchResponse';
  comments?: Maybe<Array<Comment>>;
  errors?: Maybe<Scalars['String']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Community = {
  __typename?: 'Community';
  communityIconUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  creatorId: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  hasJoined: Scalars['Boolean'];
  id: Scalars['Float'];
  name: Scalars['String'];
  numMembers: Scalars['Int'];
  privacyType: Scalars['String'];
};

export type CommunityInput = {
  name: Scalars['String'];
  privacyType: Scalars['String'];
};

export type CommunityResponse = {
  __typename?: 'CommunityResponse';
  community?: Maybe<Community>;
  errors?: Maybe<Scalars['String']>;
};

export type CommunityUpdateInput = {
  communityIconUrl?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  privacyType?: InputMaybe<Scalars['String']>;
};

export type CreateCommentInput = {
  message: Scalars['String'];
  parentId?: InputMaybe<Scalars['Float']>;
  postId: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createComment: CommentResponse;
  createCommunity: CommunityResponse;
  createPost: PostResponse;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  forgotPassword: ForgotPasswordResponse;
  joinCommunity: CommunityResponse;
  leaveCommunity: CommunityResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateComment?: Maybe<CommentResponse>;
  updateCommunity: CommunityResponse;
  updatePost?: Maybe<Post>;
  vote: Post;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateCommunityArgs = {
  input: CommunityInput;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationJoinCommunityArgs = {
  communityName: Scalars['String'];
};


export type MutationLeaveCommunityArgs = {
  communityName: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UserInfoInput;
};


export type MutationUpdateCommentArgs = {
  id: Scalars['Int'];
  message: Scalars['String'];
};


export type MutationUpdateCommunityArgs = {
  id: Scalars['Int'];
  input: CommunityUpdateInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationVoteArgs = {
  postId: Scalars['Int'];
  voteValue: VoteType;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  pageInfo: PageInfo;
  paginatedPosts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  comments?: Maybe<Array<Comment>>;
  community: Community;
  communityId: Scalars['Float'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  imageUrl?: Maybe<Scalars['String']>;
  numComments: Scalars['Int'];
  ownerId: Scalars['Float'];
  points: Scalars['Float'];
  text?: Maybe<Scalars['String']>;
  textSnippet?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  urlLink?: Maybe<Scalars['String']>;
  user: User;
  voteStatus: Scalars['Float'];
};

export type PostInput = {
  communityId: Scalars['Float'];
  imageUrl?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  urlLink?: InputMaybe<Scalars['String']>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
};

export type PostSearchResponse = {
  __typename?: 'PostSearchResponse';
  errors?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  community?: Maybe<Community>;
  getCommunityPosts: PaginatedPosts;
  getDownvotePosts: PostSearchResponse;
  getUpvotePosts: PostSearchResponse;
  getUserComments: CommentSearchResponse;
  getUserPosts: PostSearchResponse;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  searchCommunities?: Maybe<SearchResponse>;
  searchPosts?: Maybe<PostSearchResponse>;
  userCommunities?: Maybe<Array<UserCommunities>>;
};


export type QueryCommunityArgs = {
  communityName: Scalars['String'];
};


export type QueryGetCommunityPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  communityName: Scalars['String'];
  first: Scalars['Int'];
};


export type QueryGetDownvotePostsArgs = {
  username: Scalars['String'];
};


export type QueryGetUpvotePostsArgs = {
  username: Scalars['String'];
};


export type QueryGetUserCommentsArgs = {
  username: Scalars['String'];
};


export type QueryGetUserPostsArgs = {
  username: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};


export type QuerySearchCommunitiesArgs = {
  keyword: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchPostsArgs = {
  keyword: Scalars['String'];
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  communities?: Maybe<Array<Community>>;
  errors?: Maybe<Scalars['String']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  password: Scalars['String'];
  profileUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserCommunities = {
  __typename?: 'UserCommunities';
  community: Community;
  isModerator: Scalars['Boolean'];
};

export type UserInfoInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export enum VoteType {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE'
}

export type CommentInfoFragment = { __typename?: 'Comment', id: number, message: string, postId: number, parentId?: number | null, isDeleted: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', profileUrl?: string | null, username: string, id: number } };

export type CommunityInfoFragment = { __typename?: 'Community', id: number, name: string, displayName: string, description?: string | null, creatorId: number, numMembers: number, privacyType: string, communityIconUrl?: string | null, createdAt: string, hasJoined: boolean };

export type PostInfoFragment = { __typename?: 'Post', id: number, title: string, text?: string | null, points: number, textSnippet?: string | null, ownerId: number, createdAt: string, updatedAt: string, voteStatus: number, urlLink?: string | null, imageUrl?: string | null, numComments: number, communityId: number };

export type PostRelationsFragment = { __typename?: 'Post', user: { __typename?: 'User', username: string }, community: { __typename?: 'Community', name: string, hasJoined: boolean, communityIconUrl?: string | null }, comments?: Array<{ __typename?: 'Comment', id: number, message: string, postId: number, parentId?: number | null, isDeleted: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', profileUrl?: string | null, username: string, id: number } }> | null };

export type UserInfoFragment = { __typename?: 'User', id: number, username: string, email: string, profileUrl?: string | null };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, profileUrl?: string | null } | null } };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentResponse', errors?: string | null, comment?: { __typename?: 'Comment', id: number, message: string, postId: number, parentId?: number | null, isDeleted: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', profileUrl?: string | null, username: string, id: number } } | null } };

export type CreateCommunityMutationVariables = Exact<{
  input: CommunityInput;
}>;


export type CreateCommunityMutation = { __typename?: 'Mutation', createCommunity: { __typename?: 'CommunityResponse', errors?: string | null, community?: { __typename?: 'Community', id: number, name: string, displayName: string, description?: string | null, creatorId: number, numMembers: number, privacyType: string, communityIconUrl?: string | null, createdAt: string, hasJoined: boolean } | null } };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', errors?: string | null, post?: { __typename?: 'Post', id: number, community: { __typename?: 'Community', name: string } } | null } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentId: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type DeletePostMutationVariables = Exact<{
  deletePostId: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type JoinCommunityMutationVariables = Exact<{
  communityName: Scalars['String'];
}>;


export type JoinCommunityMutation = { __typename?: 'Mutation', joinCommunity: { __typename?: 'CommunityResponse', errors?: string | null, community?: { __typename?: 'Community', name: string, hasJoined: boolean, numMembers: number } | null } };

export type LeaveCommunityMutationVariables = Exact<{
  communityName: Scalars['String'];
}>;


export type LeaveCommunityMutation = { __typename?: 'Mutation', leaveCommunity: { __typename?: 'CommunityResponse', errors?: string | null, community?: { __typename?: 'Community', hasJoined: boolean, numMembers: number, name: string } | null } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, profileUrl?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserInfoInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, profileUrl?: string | null } | null } };

export type UpdateCommentMutationVariables = Exact<{
  message: Scalars['String'];
  updateCommentId: Scalars['Int'];
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment?: { __typename?: 'CommentResponse', errors?: string | null, comment?: { __typename?: 'Comment', id: number, message: string, postId: number, parentId?: number | null, isDeleted: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', profileUrl?: string | null, username: string, id: number } } | null } | null };

export type UpdateCommunityMutationVariables = Exact<{
  input: CommunityUpdateInput;
  updateCommunityId: Scalars['Int'];
}>;


export type UpdateCommunityMutation = { __typename?: 'Mutation', updateCommunity: { __typename?: 'CommunityResponse', errors?: string | null, community?: { __typename?: 'Community', id: number, name: string, displayName: string, description?: string | null, creatorId: number, numMembers: number, privacyType: string, communityIconUrl?: string | null, createdAt: string, hasJoined: boolean } | null } };

export type UpdatePostMutationVariables = Exact<{
  text: Scalars['String'];
  updatePostId: Scalars['Int'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', text?: string | null } | null };

export type VoteMutationVariables = Exact<{
  voteValue: VoteType;
  postId: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'Post', id: number, title: string, text?: string | null, points: number, textSnippet?: string | null, ownerId: number, createdAt: string, updatedAt: string, voteStatus: number, urlLink?: string | null, imageUrl?: string | null, numComments: number, communityId: number, user: { __typename?: 'User', username: string } } };

export type GetCommunityPostsQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
  communityName: Scalars['String'];
}>;


export type GetCommunityPostsQuery = { __typename?: 'Query', getCommunityPosts: { __typename?: 'PaginatedPosts', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean }, paginatedPosts: Array<{ __typename?: 'Post', id: number, title: string, text?: string | null, points: number, textSnippet?: string | null, ownerId: number, createdAt: string, updatedAt: string, voteStatus: number, urlLink?: string | null, imageUrl?: string | null, numComments: number, communityId: number, user: { __typename?: 'User', username: string }, community: { __typename?: 'Community', name: string, hasJoined: boolean, communityIconUrl?: string | null }, comments?: Array<{ __typename?: 'Comment', id: number, message: string, postId: number, parentId?: number | null, isDeleted: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', profileUrl?: string | null, username: string, id: number } }> | null }> } };

export type CommunityQueryVariables = Exact<{
  communityName: Scalars['String'];
}>;


export type CommunityQuery = { __typename?: 'Query', community?: { __typename?: 'Community', id: number, name: string, displayName: string, description?: string | null, creatorId: number, numMembers: number, privacyType: string, communityIconUrl?: string | null, createdAt: string, hasJoined: boolean } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email: string, profileUrl?: string | null } | null };

export type PostQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: number, title: string, text?: string | null, points: number, textSnippet?: string | null, ownerId: number, createdAt: string, updatedAt: string, voteStatus: number, urlLink?: string | null, imageUrl?: string | null, numComments: number, communityId: number, user: { __typename?: 'User', username: string }, community: { __typename?: 'Community', name: string, hasJoined: boolean, communityIconUrl?: string | null }, comments?: Array<{ __typename?: 'Comment', id: number, message: string, postId: number, parentId?: number | null, isDeleted: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', profileUrl?: string | null, username: string, id: number } }> | null } | null };

export type PostsQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean }, paginatedPosts: Array<{ __typename?: 'Post', id: number, title: string, text?: string | null, points: number, textSnippet?: string | null, ownerId: number, createdAt: string, updatedAt: string, voteStatus: number, urlLink?: string | null, imageUrl?: string | null, numComments: number, communityId: number, user: { __typename?: 'User', username: string }, community: { __typename?: 'Community', name: string, hasJoined: boolean, communityIconUrl?: string | null }, comments?: Array<{ __typename?: 'Comment', id: number, message: string, postId: number, parentId?: number | null, isDeleted: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', profileUrl?: string | null, username: string, id: number } }> | null }> } };

export type SearchCommunitiesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  keyword: Scalars['String'];
}>;


export type SearchCommunitiesQuery = { __typename?: 'Query', searchCommunities?: { __typename?: 'SearchResponse', errors?: string | null, totalCount?: number | null, communities?: Array<{ __typename?: 'Community', id: number, name: string, communityIconUrl?: string | null, numMembers: number, description?: string | null, hasJoined: boolean }> | null } | null };

export type SearchPostsQueryVariables = Exact<{
  keyword: Scalars['String'];
}>;


export type SearchPostsQuery = { __typename?: 'Query', searchPosts?: { __typename?: 'PostSearchResponse', errors?: string | null, totalCount?: number | null, posts?: Array<{ __typename?: 'Post', id: number, title: string, text?: string | null, points: number, textSnippet?: string | null, ownerId: number, createdAt: string, updatedAt: string, voteStatus: number, urlLink?: string | null, imageUrl?: string | null, numComments: number, communityId: number, user: { __typename?: 'User', username: string }, community: { __typename?: 'Community', name: string, hasJoined: boolean, communityIconUrl?: string | null }, comments?: Array<{ __typename?: 'Comment', id: number, message: string, postId: number, parentId?: number | null, isDeleted: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', profileUrl?: string | null, username: string, id: number } }> | null }> | null } | null };

export type UserCommunitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCommunitiesQuery = { __typename?: 'Query', userCommunities?: Array<{ __typename?: 'UserCommunities', isModerator: boolean, community: { __typename?: 'Community', id: number, name: string, communityIconUrl?: string | null, numMembers: number } }> | null };

export const CommunityInfoFragmentDoc = gql`
    fragment CommunityInfo on Community {
  id
  name
  displayName
  description
  creatorId
  numMembers
  privacyType
  communityIconUrl
  createdAt
  hasJoined
}
    `;
export const PostInfoFragmentDoc = gql`
    fragment PostInfo on Post {
  id
  title
  text
  points
  textSnippet
  ownerId
  createdAt
  updatedAt
  voteStatus
  urlLink
  imageUrl
  numComments
  communityId
}
    `;
export const CommentInfoFragmentDoc = gql`
    fragment CommentInfo on Comment {
  id
  message
  postId
  user {
    profileUrl
    username
    id
  }
  parentId
  isDeleted
  createdAt
  updatedAt
}
    `;
export const PostRelationsFragmentDoc = gql`
    fragment PostRelations on Post {
  user {
    username
  }
  community {
    name
    hasJoined
    communityIconUrl
  }
  comments {
    ...CommentInfo
  }
}
    ${CommentInfoFragmentDoc}`;
export const UserInfoFragmentDoc = gql`
    fragment UserInfo on User {
  id
  username
  email
  profileUrl
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    errors {
      field
      message
    }
    user {
      ...UserInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    errors
    comment {
      ...CommentInfo
    }
  }
}
    ${CommentInfoFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateCommunityDocument = gql`
    mutation CreateCommunity($input: CommunityInput!) {
  createCommunity(input: $input) {
    community {
      ...CommunityInfo
    }
    errors
  }
}
    ${CommunityInfoFragmentDoc}`;
export type CreateCommunityMutationFn = Apollo.MutationFunction<CreateCommunityMutation, CreateCommunityMutationVariables>;

/**
 * __useCreateCommunityMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutation, { data, loading, error }] = useCreateCommunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommunityMutation, CreateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommunityMutation, CreateCommunityMutationVariables>(CreateCommunityDocument, options);
      }
export type CreateCommunityMutationHookResult = ReturnType<typeof useCreateCommunityMutation>;
export type CreateCommunityMutationResult = Apollo.MutationResult<CreateCommunityMutation>;
export type CreateCommunityMutationOptions = Apollo.BaseMutationOptions<CreateCommunityMutation, CreateCommunityMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    post {
      id
      community {
        name
      }
    }
    errors
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($deleteCommentId: Int!) {
  deleteComment(id: $deleteCommentId)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      deleteCommentId: // value for 'deleteCommentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($deletePostId: Int!) {
  deletePost(id: $deletePostId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      deletePostId: // value for 'deletePostId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    errors {
      field
      message
    }
    message
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const JoinCommunityDocument = gql`
    mutation JoinCommunity($communityName: String!) {
  joinCommunity(communityName: $communityName) {
    errors
    community {
      name
      hasJoined
      numMembers
    }
  }
}
    `;
export type JoinCommunityMutationFn = Apollo.MutationFunction<JoinCommunityMutation, JoinCommunityMutationVariables>;

/**
 * __useJoinCommunityMutation__
 *
 * To run a mutation, you first call `useJoinCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinCommunityMutation, { data, loading, error }] = useJoinCommunityMutation({
 *   variables: {
 *      communityName: // value for 'communityName'
 *   },
 * });
 */
export function useJoinCommunityMutation(baseOptions?: Apollo.MutationHookOptions<JoinCommunityMutation, JoinCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinCommunityMutation, JoinCommunityMutationVariables>(JoinCommunityDocument, options);
      }
export type JoinCommunityMutationHookResult = ReturnType<typeof useJoinCommunityMutation>;
export type JoinCommunityMutationResult = Apollo.MutationResult<JoinCommunityMutation>;
export type JoinCommunityMutationOptions = Apollo.BaseMutationOptions<JoinCommunityMutation, JoinCommunityMutationVariables>;
export const LeaveCommunityDocument = gql`
    mutation LeaveCommunity($communityName: String!) {
  leaveCommunity(communityName: $communityName) {
    errors
    community {
      hasJoined
      numMembers
      name
    }
  }
}
    `;
export type LeaveCommunityMutationFn = Apollo.MutationFunction<LeaveCommunityMutation, LeaveCommunityMutationVariables>;

/**
 * __useLeaveCommunityMutation__
 *
 * To run a mutation, you first call `useLeaveCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveCommunityMutation, { data, loading, error }] = useLeaveCommunityMutation({
 *   variables: {
 *      communityName: // value for 'communityName'
 *   },
 * });
 */
export function useLeaveCommunityMutation(baseOptions?: Apollo.MutationHookOptions<LeaveCommunityMutation, LeaveCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveCommunityMutation, LeaveCommunityMutationVariables>(LeaveCommunityDocument, options);
      }
export type LeaveCommunityMutationHookResult = ReturnType<typeof useLeaveCommunityMutation>;
export type LeaveCommunityMutationResult = Apollo.MutationResult<LeaveCommunityMutation>;
export type LeaveCommunityMutationOptions = Apollo.BaseMutationOptions<LeaveCommunityMutation, LeaveCommunityMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $usernameOrEmail: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      ...UserInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UserInfoInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...UserInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($message: String!, $updateCommentId: Int!) {
  updateComment(message: $message, id: $updateCommentId) {
    errors
    comment {
      ...CommentInfo
    }
  }
}
    ${CommentInfoFragmentDoc}`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      message: // value for 'message'
 *      updateCommentId: // value for 'updateCommentId'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const UpdateCommunityDocument = gql`
    mutation UpdateCommunity($input: CommunityUpdateInput!, $updateCommunityId: Int!) {
  updateCommunity(input: $input, id: $updateCommunityId) {
    community {
      ...CommunityInfo
    }
    errors
  }
}
    ${CommunityInfoFragmentDoc}`;
export type UpdateCommunityMutationFn = Apollo.MutationFunction<UpdateCommunityMutation, UpdateCommunityMutationVariables>;

/**
 * __useUpdateCommunityMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityMutation, { data, loading, error }] = useUpdateCommunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *      updateCommunityId: // value for 'updateCommunityId'
 *   },
 * });
 */
export function useUpdateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommunityMutation, UpdateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommunityMutation, UpdateCommunityMutationVariables>(UpdateCommunityDocument, options);
      }
export type UpdateCommunityMutationHookResult = ReturnType<typeof useUpdateCommunityMutation>;
export type UpdateCommunityMutationResult = Apollo.MutationResult<UpdateCommunityMutation>;
export type UpdateCommunityMutationOptions = Apollo.BaseMutationOptions<UpdateCommunityMutation, UpdateCommunityMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($text: String!, $updatePostId: Int!) {
  updatePost(text: $text, id: $updatePostId) {
    text
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      text: // value for 'text'
 *      updatePostId: // value for 'updatePostId'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($voteValue: VoteType!, $postId: Int!) {
  vote(voteValue: $voteValue, postId: $postId) {
    ...PostInfo
    user {
      username
    }
  }
}
    ${PostInfoFragmentDoc}`;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      voteValue: // value for 'voteValue'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const GetCommunityPostsDocument = gql`
    query GetCommunityPosts($first: Int!, $after: String, $communityName: String!) {
  getCommunityPosts(first: $first, after: $after, communityName: $communityName) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
    }
    paginatedPosts {
      ...PostInfo
      ...PostRelations
    }
  }
}
    ${PostInfoFragmentDoc}
${PostRelationsFragmentDoc}`;

/**
 * __useGetCommunityPostsQuery__
 *
 * To run a query within a React component, call `useGetCommunityPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunityPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunityPostsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      communityName: // value for 'communityName'
 *   },
 * });
 */
export function useGetCommunityPostsQuery(baseOptions: Apollo.QueryHookOptions<GetCommunityPostsQuery, GetCommunityPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommunityPostsQuery, GetCommunityPostsQueryVariables>(GetCommunityPostsDocument, options);
      }
export function useGetCommunityPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunityPostsQuery, GetCommunityPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommunityPostsQuery, GetCommunityPostsQueryVariables>(GetCommunityPostsDocument, options);
        }
export type GetCommunityPostsQueryHookResult = ReturnType<typeof useGetCommunityPostsQuery>;
export type GetCommunityPostsLazyQueryHookResult = ReturnType<typeof useGetCommunityPostsLazyQuery>;
export type GetCommunityPostsQueryResult = Apollo.QueryResult<GetCommunityPostsQuery, GetCommunityPostsQueryVariables>;
export const CommunityDocument = gql`
    query Community($communityName: String!) {
  community(communityName: $communityName) {
    ...CommunityInfo
  }
}
    ${CommunityInfoFragmentDoc}`;

/**
 * __useCommunityQuery__
 *
 * To run a query within a React component, call `useCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityQuery({
 *   variables: {
 *      communityName: // value for 'communityName'
 *   },
 * });
 */
export function useCommunityQuery(baseOptions: Apollo.QueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
      }
export function useCommunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
        }
export type CommunityQueryHookResult = ReturnType<typeof useCommunityQuery>;
export type CommunityLazyQueryHookResult = ReturnType<typeof useCommunityLazyQuery>;
export type CommunityQueryResult = Apollo.QueryResult<CommunityQuery, CommunityQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query Post($postId: Float!) {
  post(id: $postId) {
    ...PostInfo
    ...PostRelations
  }
}
    ${PostInfoFragmentDoc}
${PostRelationsFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($first: Int!, $after: String) {
  posts(first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
    }
    paginatedPosts {
      ...PostInfo
      ...PostRelations
    }
  }
}
    ${PostInfoFragmentDoc}
${PostRelationsFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const SearchCommunitiesDocument = gql`
    query SearchCommunities($limit: Int, $keyword: String!) {
  searchCommunities(limit: $limit, keyword: $keyword) {
    errors
    communities {
      id
      name
      communityIconUrl
      numMembers
      description
      hasJoined
    }
    totalCount
  }
}
    `;

/**
 * __useSearchCommunitiesQuery__
 *
 * To run a query within a React component, call `useSearchCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCommunitiesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useSearchCommunitiesQuery(baseOptions: Apollo.QueryHookOptions<SearchCommunitiesQuery, SearchCommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCommunitiesQuery, SearchCommunitiesQueryVariables>(SearchCommunitiesDocument, options);
      }
export function useSearchCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCommunitiesQuery, SearchCommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCommunitiesQuery, SearchCommunitiesQueryVariables>(SearchCommunitiesDocument, options);
        }
export type SearchCommunitiesQueryHookResult = ReturnType<typeof useSearchCommunitiesQuery>;
export type SearchCommunitiesLazyQueryHookResult = ReturnType<typeof useSearchCommunitiesLazyQuery>;
export type SearchCommunitiesQueryResult = Apollo.QueryResult<SearchCommunitiesQuery, SearchCommunitiesQueryVariables>;
export const SearchPostsDocument = gql`
    query SearchPosts($keyword: String!) {
  searchPosts(keyword: $keyword) {
    errors
    posts {
      ...PostInfo
      ...PostRelations
    }
    totalCount
  }
}
    ${PostInfoFragmentDoc}
${PostRelationsFragmentDoc}`;

/**
 * __useSearchPostsQuery__
 *
 * To run a query within a React component, call `useSearchPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPostsQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useSearchPostsQuery(baseOptions: Apollo.QueryHookOptions<SearchPostsQuery, SearchPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPostsQuery, SearchPostsQueryVariables>(SearchPostsDocument, options);
      }
export function useSearchPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPostsQuery, SearchPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPostsQuery, SearchPostsQueryVariables>(SearchPostsDocument, options);
        }
export type SearchPostsQueryHookResult = ReturnType<typeof useSearchPostsQuery>;
export type SearchPostsLazyQueryHookResult = ReturnType<typeof useSearchPostsLazyQuery>;
export type SearchPostsQueryResult = Apollo.QueryResult<SearchPostsQuery, SearchPostsQueryVariables>;
export const UserCommunitiesDocument = gql`
    query UserCommunities {
  userCommunities {
    isModerator
    community {
      id
      name
      communityIconUrl
      numMembers
    }
  }
}
    `;

/**
 * __useUserCommunitiesQuery__
 *
 * To run a query within a React component, call `useUserCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCommunitiesQuery(baseOptions?: Apollo.QueryHookOptions<UserCommunitiesQuery, UserCommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserCommunitiesQuery, UserCommunitiesQueryVariables>(UserCommunitiesDocument, options);
      }
export function useUserCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCommunitiesQuery, UserCommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserCommunitiesQuery, UserCommunitiesQueryVariables>(UserCommunitiesDocument, options);
        }
export type UserCommunitiesQueryHookResult = ReturnType<typeof useUserCommunitiesQuery>;
export type UserCommunitiesLazyQueryHookResult = ReturnType<typeof useUserCommunitiesLazyQuery>;
export type UserCommunitiesQueryResult = Apollo.QueryResult<UserCommunitiesQuery, UserCommunitiesQueryVariables>;