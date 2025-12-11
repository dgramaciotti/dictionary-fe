import { Box } from '@mui/material'
import { GAME_KEYBOARD, normalizeString } from '../../utils/wordOfDay'
import { useQuizState } from '../../data/state'

interface GameScore {
    letter: string
    status: 'MISS' | 'CORRECT' | 'INCORRECT'
}

function Keyboard() {
    const tries = useQuizState((s) => s.tries)
    const selected = useQuizState((s) => s.word)
    const score = tries
        .reduce((acc, word) => {
            const target = selected?.word.toLowerCase() || ''
            const results: GameScore[] = word.split('').map((char, idx) => ({
                letter: char,
                status:
                    target[idx] === char
                        ? 'CORRECT'
                        : target.includes(char)
                          ? 'INCORRECT'
                          : 'MISS',
            }))
            return [...acc, ...results]
        }, [] as GameScore[])
        .filter(
            (item, idx, self) =>
                idx === self.findIndex((s) => s.letter === item.letter)
        )
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {GAME_KEYBOARD.map((row) => (
                <Box key={row.toString()} sx={{ display: 'flex' }}>
                    {row.map((key) => (
                        <Box
                            sx={{
                                width: '40px',
                                height: '40px',
                                ['@media (max-width: 600px)']: {
                                    width: 'auto',
                                    height: 'auto',
                                    fontSize: '1.25rem',
                                    padding: '0.325rem',
                                    margin: '0.125rem',
                                },
                                padding: '0.5rem',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                border: 'solid 1px gray',
                                margin: '0.25rem',
                                color: '#fff',
                                backgroundColor:
                                    score.find(
                                        (s) =>
                                            normalizeString(s.letter) ===
                                            key.toLowerCase()
                                    )?.status === 'CORRECT'
                                        ? '#0a660a'
                                        : score.find(
                                                (s) =>
                                                    normalizeString(
                                                        s.letter
                                                    ) === key.toLowerCase()
                                            )?.status === 'INCORRECT'
                                          ? '#a88c0f'
                                          : '#5e5e5e',
                            }}
                            key={key}
                        >
                            {key}
                        </Box>
                    ))}
                </Box>
            ))}
        </Box>
    )
}

export default Keyboard
