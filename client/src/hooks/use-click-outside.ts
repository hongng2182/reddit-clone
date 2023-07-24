import { useEffect, useRef } from 'react'

function useClickOutside({ onClickComplete }: {
    onClickComplete: () => void
}) {
    const elementRef = useRef<HTMLDivElement | null>(null);

    // Event listener to capture clicks on the document
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
                onClickComplete();
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [elementRef, onClickComplete]);

    return { elementRef }
}

export default useClickOutside