import React, {
    Dispatch,
    ReactNode,
    Reducer,
    createContext,
    useMemo,
    useReducer,
} from 'react'
import { GlobalAction } from '@/action'

// State
type GlobalState = {
    showSignInModal: boolean
}

// Initial State
const globalInitialState: GlobalState = {
    showSignInModal: false,
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