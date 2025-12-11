import { Box, CircularProgress, Typography } from '@mui/material'

function Loading() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                flexDirection: 'column',
                gap: '1rem',
                backgroundColor: 'custom.secondary',
            }}
        >
            <CircularProgress />
            <Typography variant="h5">Loading...</Typography>
        </Box>
    )
}

export default Loading
