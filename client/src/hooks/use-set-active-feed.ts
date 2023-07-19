import { useEffect } from "react"
import { setActiveFeedTab } from "@/action"
import { CommunityQuery } from "@/generated/graphql"
import { defaultCommunityIcon } from "@/lib/constants"
import useGlobalState from "./use-global-state"


function useSetActiveFeed({ communityData }: { communityData: CommunityQuery | undefined }) {
    const { dispatch } = useGlobalState()

    // Hooks
    useEffect(() => {
        const community = communityData?.community
        if (community)
            dispatch(setActiveFeedTab({
                icon: community.communityIconUrl || defaultCommunityIcon,
                name: `r/${community.name}`,
                iconFill: null
            }))
    }, [communityData?.community, dispatch])

}

export default useSetActiveFeed