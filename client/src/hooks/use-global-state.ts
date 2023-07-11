import { useContext } from 'react'
import { GlobalContext } from '@/context/use-global-context'

const useGlobalState = () => {
    const context = useContext(GlobalContext)

    if (context === undefined) {
        throw new Error('useGlobalState was used outside of its Provider')
    }
    return context
}

export default useGlobalState
