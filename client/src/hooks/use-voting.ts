import { MeQuery, VoteType, useVoteMutation } from "@/generated/graphql"
import { setShowSignInModal } from "@/action"
import { VoteStatusValues } from "@/types"
import useGlobalState from "./use-global-state"

function useVoting({ meData }: { meData: MeQuery | undefined }) {
    const { dispatch } = useGlobalState()
    const [vote] = useVoteMutation()

    const upVote = async (voteValue: number, postId: number) => {
        if (!meData?.me) {
            dispatch(setShowSignInModal(true))
            return
        }
        if (voteValue !== VoteStatusValues.Upvote) {
            await vote({
                variables: {
                    postId,
                    voteValue: VoteType.Upvote
                }
            })
        }
    }

    const downVote = async (voteValue: number, postId: number) => {
        if (!meData?.me) {
            dispatch(setShowSignInModal(true))
            return
        }
        if (voteValue !== VoteStatusValues.Downvote) {
            await vote({
                variables: {
                    postId,
                    voteValue: VoteType.Downvote
                }
            })
        }
    }

    return {upVote, downVote}
}

export default useVoting