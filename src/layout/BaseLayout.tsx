import { Box } from '@mui/material'
import React from 'react'
import NavigationMenu from '../components/NavigationMenu'

function BaseLayout({ children }: React.PropsWithChildren) {
    return (
        <Box
            sx={{
                display: 'flex',
                ['@media (max-width: 600px)']: {
                    flexWrap: 'wrap',
                },
            }}
        >
            <NavigationMenu />
            {children}
        </Box>
    )
}

export default BaseLayout
