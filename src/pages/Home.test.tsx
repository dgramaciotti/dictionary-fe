import { describe, it } from 'vitest'
import { renderWithProviders } from '../test/testUtils'
import Home from './Home'

describe('<Home />', () => {
    it('Renders', async () => {
        renderWithProviders(<Home />)
    })
})
