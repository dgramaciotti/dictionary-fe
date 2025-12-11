import { Grid, Paper, Typography } from '@mui/material'
import ExportData from '../components/configPage/exportData'
import ImportData from '../components/configPage/importData'

function Settings() {
    return (
        <Grid
            container
            sx={{
                height: '100%',
                minHeight: '100vh',
                margin: '0.75rem 1.5rem',
                width: '100%',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            <Typography fontSize="1.5rem" fontWeight="bold" variant="h1">
                Settings
            </Typography>
            <Paper
                variant="elevation"
                sx={{ padding: '2rem', marginY: '1rem' }}
            >
                <ExportData />
            </Paper>
            <Paper variant="elevation" sx={{ padding: '2rem' }}>
                <ImportData />
            </Paper>
        </Grid>
    )
}

export default Settings
