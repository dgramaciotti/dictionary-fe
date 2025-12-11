import { Typography, Tooltip, IconButton } from '@mui/material'
import HelpIcon from '@mui/icons-material/HelpOutline'

interface HelpTooltipProps {
    label: string
    helperText: string
}

function HelpTooltip({ label, helperText }: HelpTooltipProps) {
    return (
        <Typography
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
            }}
            variant="body1"
        >
            {label}
            <Tooltip title={helperText}>
                <IconButton>
                    <HelpIcon />
                </IconButton>
            </Tooltip>
        </Typography>
    )
}

export default HelpTooltip
