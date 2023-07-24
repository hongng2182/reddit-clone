import toast from "react-hot-toast";
import { ApolloCache } from "@apollo/client";
import { CommunityDocument, SearchCommunitiesDocument, UserCommunitiesDocument, useJoinCommunityMutation, useLeaveCommunityMutation } from "@/generated/graphql";
import { JoinLeaveCommunityResponse, SearchCommunity } from "@/types";
import { setShowSignInModal } from "@/action";
import useGlobalState from "./use-global-state";


function updateCacheCommunity(cache: ApolloCache<any>
    , communityName: string, newData: JoinLeaveCommunityResponse) {
    cache.updateQuery({
        query: CommunityDocument,
        variables: { communityName }
    }, (cacheData) => ({
        community: {
            ...cacheData.community,
            hasJoined: newData.hasJoined,
            numMembers: newData.numMembers
        }
    }))
}

function updateCacheSearchCommunities(cache: ApolloCache<any>, keyword: string, newData: JoinLeaveCommunityResponse) {
    cache.updateQuery({
        query: SearchCommunitiesDocument,
        variables: { keyword }
    }, (cacheData) => (
        {
            searchCommunities:
            {
                ...cacheData.searchCommunities,
                communities:
                    cacheData.searchCommunities.communities.map((community: SearchCommunity) => community.name === newData.name ? ({ ...community, hasJoined: newData.hasJoined, numMembers: newData.numMembers }) : community)
            }
        }
    )
    )
}

function useJoinLeaveCommunity({ communityName, keyword }: { communityName?: string, keyword?: string }) {
    const { dispatch } = useGlobalState()

    const refetchQueriesOptions = {
        refetchQueries: [{ query: UserCommunitiesDocument }]
    };
    // Join in community page
    const [joinCommunity] = useJoinCommunityMutation({
        update(cache, { data }) {
            const joinedData = data?.joinCommunity.community
            if (joinedData) {
                if (communityName) {
                    updateCacheCommunity(cache, communityName, joinedData)
                }
                if (keyword) {
                    updateCacheSearchCommunities(cache, keyword, joinedData)
                }
            }
        },
        ...refetchQueriesOptions
    })
    const [leaveCommunity] = useLeaveCommunityMutation({
        update(cache, { data }) {
            const leaveData = data?.leaveCommunity.community
            if (leaveData) {
                if (communityName) {
                    updateCacheCommunity(cache, communityName, leaveData)
                }
                if (keyword) {
                    updateCacheSearchCommunities(cache, keyword, leaveData)
                }
            }
        },
        ...refetchQueriesOptions
    })

    const handleJoinLeave = async (community_name: string, hasJoined: boolean, userId: number | undefined) => {
        if (!userId) {
            dispatch(setShowSignInModal(true))
            return
        }
        if (hasJoined) {
            const response = await leaveCommunity({
                variables: { communityName: community_name }
            })
            if (response.data?.leaveCommunity.community) {
                toast.success(`Successfully leave r/${community_name}`, { position: 'bottom-center' })
            }
            if (response.data?.leaveCommunity.errors) {
                toast.error(response.data?.leaveCommunity.errors, { position: 'bottom-center' })
            }
        } else {
            const response = await joinCommunity({ variables: { communityName: community_name } })
            if (response.data?.joinCommunity.community) {
                toast.success(`Successfully join r/${community_name}`, { position: 'bottom-center' })
            }
            if (response.data?.joinCommunity.errors) {
                toast.error(response.data?.joinCommunity.errors, { position: 'bottom-center' })
            }
        }
    }

    return { handleJoinLeave }
}

export default useJoinLeaveCommunity