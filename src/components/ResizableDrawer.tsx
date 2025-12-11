import { Drawer, Box, DrawerProps } from '@mui/material'
import useResize from '../hooks/useResize'

interface ResizableDrawerProps extends DrawerProps {
    axisOrigin: 'left' | 'right'
    minWidth?: number
    maxWidth?: number
    backgroundColor?: string
}

function ResizableDrawer({
    minWidth,
    maxWidth,
    axisOrigin,
    anchor,
    backgroundColor,
    ...rest
}: ResizableDrawerProps) {
    const { width, enableResize } = useResize({
        minWidth: minWidth || 150,
        maxWidth: maxWidth || 400,
        axisOrigin: axisOrigin,
    })
    return (
        <Drawer
            variant="persistent"
            open
            slotProps={{
                paper: {
                    style: { width },
                    sx: {
                        flexShrink: 0,
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor:
                            backgroundColor || 'background.primary',
                        minHeight: '100vh',
                    },
                },
            }}
            sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.12)' }}
            {...rest}
        >
            <Box>
                {rest.children}
                <div
                    style={{
                        position: 'absolute',
                        width: '20px',
                        top: '0',
                        [anchor === 'left' ? 'right' : 'left']: '-1px',
                        bottom: '0',
                        cursor: 'ew-resize',
                    }}
                    onMouseDown={enableResize}
                />
            </Box>
        </Drawer>
    )
}

export default ResizableDrawer
