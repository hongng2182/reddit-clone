/* eslint-disable import/prefer-default-export */
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

export type GlobalAction =
    | ReturnType<typeof setShowSignInModal>

