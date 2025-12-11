import { Box, Button, Grid, Typography } from '@mui/material'
import Keyboard from '../components/wordOfDay/Keyboard'
import GameBox from '../components/wordOfDay/GameBox'
import { getWordOfDay } from '../utils/wordOfDay'
import { useQuizState } from '../data/state'
import ReplayIcon from '@mui/icons-material/Replay'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useEffect } from 'react'
import { getAll } from '../api/operations'
import { useQuery } from '@tanstack/react-query'

function Quiz() {
    const { data: words } = useQuery({
        queryKey: ['getAll'],
        queryFn: getAll,
    })
    const selected = useQuizState((s) => s.word)
    const setWord = useQuizState((s) => s.setWord)
    const resetState = useQuizState((s) => s.reset)
    const handleRegenerate = () => {
        const selected = getWordOfDay(words, true)
        resetState()
        setWord({ ...selected })
    }

    const handleReveal = () => {
        alert(selected?.word)
    }

    useEffect(() => {
        if (!words || words.length === 0) return
        const selected = getWordOfDay(words)
        resetState()
        setWord({ ...selected })
    }, [setWord, resetState, words])

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
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography fontSize="1.5rem" fontWeight="bold" variant="h1">
                    Quiz
                </Typography>
                <Button onClick={handleRegenerate} variant="text">
                    <ReplayIcon />
                    New word
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="body1">
                    Test your knowledge of specific terms by discovering todays
                    word.
                </Typography>
                <Button onClick={handleReveal} variant="text">
                    <VisibilityIcon />
                    Reveal
                </Button>
            </Box>

            <GameBox />
            <Keyboard />
        </Grid>
    )
}

export default Quiz
