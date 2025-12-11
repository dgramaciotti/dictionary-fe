import { act, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import AppTheme from '../providers/ThemeProvider'
import { expect } from 'vitest'
import QueryProvider from '../providers/QueryProvider'

export const renderWithProviders = (children: ReactNode) => {
    return render(
        <AppTheme>
            <QueryProvider>{children}</QueryProvider>
        </AppTheme>
    )
}

export const clickAndExpect = async (
    buttonText: string,
    elementText: string
) => {
    await act(async () => {
        const button = await screen.findByText(buttonText)
        fireEvent.click(button)
    })
    await waitFor(async () => {
        const heading = await screen.findByText(elementText)
        expect(heading).toBeInTheDocument()
    })
}
