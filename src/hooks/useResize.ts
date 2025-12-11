import { useEffect, useState } from 'react'

function useResize({
    minWidth,
    maxWidth,
    axisOrigin,
}: {
    minWidth: number
    maxWidth: number
    axisOrigin: 'left' | 'right'
}) {
    const [width, setWidth] = useState(minWidth)
    const [isResizing, setIsResizing] = useState(false)

    const resize = (e: MouseEvent) => {
        if (isResizing) {
            const w =
                axisOrigin === 'left'
                    ? e.clientX
                    : window.screen.width - e.clientX
            if (w >= minWidth && w <= maxWidth) {
                setWidth(w)
            }
        }
    }

    const done = () => {
        setIsResizing(false)
    }

    const enableResize = () => {
        setIsResizing(true)
    }

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', resize)
            document.addEventListener('mouseup', done)
        }

        return () => {
            document.removeEventListener('mousemove', resize)
            document.removeEventListener('mouseup', done)
        }
    }, [isResizing])

    return { width, enableResize }
}

export default useResize
