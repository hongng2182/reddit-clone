/* eslint-disable import/prefer-default-export */

import { FeedTab } from "@/types"

// Action
export const setShowSignInModal = (
    value: boolean,
): {
    type: 'SET_SHOW_SIGNIN_MODAL'
    payload: {
        value: boolean
    }
} => ({
    type: 'SET_SHOW_SIGNIN_MODAL',
    payload: {
        value,
    },
})

export const setActiveFeedTab = (
    value: FeedTab,
): {
    type: 'SET_ACTIVE_FEED_TAB'
    payload: {
        value: FeedTab
    }
} => ({
    type: 'SET_ACTIVE_FEED_TAB',
    payload: {
        value,
    },
})

export type GlobalAction =
    | ReturnType<typeof setShowSignInModal>
    | ReturnType<typeof setActiveFeedTab>


