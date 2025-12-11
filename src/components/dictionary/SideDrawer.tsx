import { Box, useMediaQuery, useTheme } from '@mui/material'
import ResizableDrawer from '../ResizableDrawer'
import DrawerCanvas from './DrawerCanvas'

function SideDrawer() {
    const theme = useTheme()
    const match = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <>
            {!match ? (
                <ResizableDrawer
                    minWidth={300}
                    axisOrigin="right"
                    anchor="right"
                >
                    <DrawerCanvas />
                </ResizableDrawer>
            ) : (
                <Box sx={{ width: '100%' }}>
                    <DrawerCanvas />
                </Box>
            )}
        </>
    )
}

export default SideDrawer
