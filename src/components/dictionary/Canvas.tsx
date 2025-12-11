import {
    Box,
    FormControl,
    Grid,
    InputAdornment,
    OutlinedInput,
    Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import WordList from './WordList'
import { useEffect, useState } from 'react'
import { fetchWords } from '../../api/fetchWords'
import { useAppState } from '../../data/state'
import { useQuery } from '@tanstack/react-query'

function Canvas() {
    const [query, setQuery] = useState('')
    const setSelected = useAppState((s) => s.setSelectedWord)
    const selected = useAppState((s) => s.selectedWord)
    const { data: words, isLoading } = useQuery({
        queryKey: ['words', query],
        queryFn: () => fetchWords({ query, max: 250 }),
    })

    // If nothing is selected, select the first word
    useEffect(() => {
        if (!words || words?.length === 0 || selected) return
        setSelected(words[0])
    }, [words, setSelected, selected])

    return (
        <Grid
            container
            sx={{
                height: '100%',
                minHeight: '100%',
                margin: '0.75rem 1.5rem',
                width: '100%',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography fontSize="1.5rem" fontWeight="bold" variant="h1">
                    Dictionary
                </Typography>
            </Box>
            <FormControl>
                <OutlinedInput
                    onChange={(e) => setQuery(e.target.value)}
                    fullWidth
                    label="Search"
                    placeholder="Search word..."
                    type="text"
                    value={query}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>

            {!isLoading && <WordList words={words} />}
        </Grid>
    )
}

export default Canvas
