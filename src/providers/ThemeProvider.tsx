import { createTheme, ThemeProvider } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface Palette {
        custom: {
            secondary: string
            primary: string
        }
    }

    interface PaletteOptions {
        custom?: {
            secondary?: string
            primary?: string
        }
    }
}

const theme = createTheme({
    palette: {
        background: {
            default: '#fff',
        },
        custom: {
            // Color custom.secondary
            secondary: '#f9f9f9',
        },
    },
})

export default function AppTheme({ children }: React.PropsWithChildren) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
