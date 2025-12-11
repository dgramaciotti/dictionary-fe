import { Paper, Typography, Box } from '@mui/material'
import { useRef, KeyboardEvent } from 'react'
import { useQuizState } from '../../data/state'
import { normalizeString } from '../../utils/wordOfDay'

function GameBox() {
    const setTries = useQuizState((s) => s.setTries)
    const tries = useQuizState((s) => s.tries)
    const selected = useQuizState((s) => s.word)
    const containerRef = useRef<HTMLDivElement>(null)
    const handleKeyPress = (e: KeyboardEvent) => {
        const target = e.target as HTMLInputElement
        const isLetter = e.key.length === 1 && /[a-zA-Z]/.test(e.key)
        const playKeys = isLetter || e.key === 'Backspace'
        if (playKeys) e.preventDefault()
        if (isLetter) {
            target.value = e.key
            const nextInput = target.nextElementSibling as HTMLInputElement
            nextInput?.focus()
        }
        if (e.key === 'Backspace') {
            target.value = ''
            const previousInput =
                target.previousElementSibling as HTMLInputElement
            previousInput?.focus()
        }
        if (e.key === 'Enter') {
            const elements = Array.from(
                containerRef.current!.querySelectorAll('input')
            )
            const input = elements.reduce((acc, el) => acc + el.value, '')
            // Manual reset since the value is not controlled by react
            if (input.length !== selected?.word.length) return
            elements.forEach((el) => (el.value = ''))
            setTries([...tries, input])
        }
    }
    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}
            variant="elevation"
        >
            <Typography
                sx={{ maxWidth: '50%', textAlign: 'center' }}
                fontSize="1.25rem"
            >
                {selected?.definition}
            </Typography>
            <Box
                ref={containerRef}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    margin: '1rem',
                }}
            >
                {selected?.word.split('').map(() => (
                    // eslint-disable-next-line react/jsx-key
                    <input
                        onKeyDown={handleKeyPress}
                        maxLength={1}
                        className="game-input"
                        type="text"
                    />
                ))}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginTop: '0.5rem',
                    maxHeight: '200px',
                    overflowY: 'auto',
                }}
            >
                {tries.map((word) => (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                        }}
                        key={word}
                    >
                        {word.split('').map((char, idx) => (
                            // eslint-disable-next-line react/jsx-key
                            <input
                                disabled
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    fontSize: '1.5rem',
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    color: 'white',
                                    backgroundColor:
                                        normalizeString(
                                            selected?.word[idx] || ''
                                        ) === char
                                            ? '#0a660a'
                                            : selected?.word.includes(char)
                                              ? '#a88c0f'
                                              : '#5e5e5e',
                                }}
                                value={char}
                                type="text"
                            />
                        ))}
                    </Box>
                ))}
            </Box>
        </Paper>
    )
}

export default GameBox
