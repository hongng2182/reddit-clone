import { useEffect } from "react"
import { setActiveFeedTab } from "@/action"
import { defaultCommunityIcon } from "@/lib/constants"
import useGlobalState from "./use-global-state"

type CommunityData = {
        __typename?: "Community" | undefined;
        name: string;
        hasJoined: boolean;
        communityIconUrl?: string | null | undefined;
    } | undefined | null

function useSetActiveFeed({ communityData }: { communityData: CommunityData }) {
    const { dispatch } = useGlobalState()

    // Hooks
    useEffect(() => {
        if (communityData)
            dispatch(setActiveFeedTab({
                icon: communityData.communityIconUrl || defaultCommunityIcon,
                name: `r/${communityData.name}`,
                iconFill: null
            }))
    }, [communityData, dispatch])

}

export default useSetActiveFeed