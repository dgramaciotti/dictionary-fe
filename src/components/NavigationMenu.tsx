import { Link, List, ListItem, useMediaQuery, useTheme } from '@mui/material'
import ResizableDrawer from './ResizableDrawer'
import SearchIcon from '@mui/icons-material/Search'
import QuizIcon from '@mui/icons-material/Quiz'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link as RouterLink } from 'react-router-dom'

function NavigationMenu() {
    const theme = useTheme()
    const match = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <>
            {!match && (
                <ResizableDrawer
                    minWidth={150}
                    backgroundColor="custom.secondary"
                    axisOrigin="left"
                    anchor="left"
                >
                    <List>
                        <ListItem>
                            <Link
                                component={RouterLink}
                                to="/home"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    textDecoration: 'none',
                                }}
                            >
                                <SearchIcon />
                                {!match && 'Dictionary'}
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                component={RouterLink}
                                to="/quiz"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    textDecoration: 'none',
                                }}
                            >
                                <QuizIcon />
                                {!match && 'Quiz'}
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                component={RouterLink}
                                to="/settings"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    textDecoration: 'none',
                                }}
                            >
                                <SettingsIcon />
                                {!match && 'Settings'}
                            </Link>
                        </ListItem>
                    </List>
                </ResizableDrawer>
            )}
        </>
    )
}

export default NavigationMenu
