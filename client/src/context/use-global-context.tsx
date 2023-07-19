import React, {
    Dispatch,
    ReactNode,
    Reducer,
    createContext,
    useMemo,
    useReducer,
} from 'react'
import { GlobalAction } from '@/action'
import { FeedTab } from '@/types'

// State
type GlobalState = {
    showSignInModal: boolean
    activeFeedTab: FeedTab
}

// Initial State
const globalInitialState: GlobalState = {
    showSignInModal: false,
    activeFeedTab: {
        icon: '/icons/arrow-outline.svg',
        iconFill: '/icons/arrow-fill.svg',
        name: 'Popular'
    }
}

// Reducer 
const globalReducer = (
    state: GlobalState,
    { payload, type }: GlobalAction,
) => {
    switch (type) {
        case 'SET_SHOW_SIGNIN_MODAL': {
            const { value } = payload

            return {
                ...state,
                showSignInModal: value,
            }
        }
        case 'SET_ACTIVE_FEED_TAB': {
            const { value } = payload

            return {
                ...state,
                activeFeedTab: value,
            }
        }
        default:
            throw Error(`TYPE: ${type} not exist`)
    }
}
// Context
export const GlobalContext = createContext<{
    state: GlobalState
    dispatch: Dispatch<GlobalAction>
}>({} as any)

// Provider
export function GlobalProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer<Reducer<GlobalState, GlobalAction>>(
        globalReducer,
        globalInitialState,
    )

    const memoizedState = useMemo(() => state, [state])

    return (
        <GlobalContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{ state: memoizedState, dispatch }}
        >
            {children}
        </GlobalContext.Provider>
    )
}