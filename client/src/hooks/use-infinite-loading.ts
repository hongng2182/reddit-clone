import { useCallback, useRef } from "react"

type Props = {
    fetchMore: () => void
    hasNextPage: boolean | undefined
    isLoadingMore: boolean
}

function useInfiniteLoading({ fetchMore, hasNextPage, isLoadingMore }: Props) {
    const observer = useRef<any>(null)

    const lastElement = useCallback(
        (node: HTMLDivElement) => {
            if (isLoadingMore) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchMore()
                }
            })
            if (node) observer.current?.observe(node)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isLoadingMore, hasNextPage],
    )

    return { lastElement }

}

export default useInfiniteLoading