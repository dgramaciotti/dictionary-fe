import {
    Paper,
    Grid,
    List,
    ListItem,
    Typography,
    Box,
    capitalize,
    ListItemButton,
} from '@mui/material'
import { Word } from '../../models/Word'
import { useAppState } from '../../data/state'
import { toLetterDict } from '../../utils/dataTransforms'

interface WordListProps {
    words?: Word[]
}

function WordList({ words }: WordListProps) {
    const { selectedWord: selected, setSelectedWord } = useAppState((s) => s)
    const perLetter = toLetterDict(words)

    const handleWordClick = (word: Word) => {
        setSelectedWord(word)
    }

    if (Object.keys(perLetter).length === 0) {
        return <Typography variant="body1">No results.</Typography>
    }
    return (
        <Paper variant="elevation">
            <Grid
                container
                sx={{
                    padding: '1rem',
                    gap: '1rem',
                    flexWrap: 'nowrap',
                    ['@media (max-width: 600px)']: {
                        flexDirection: 'column-reverse',
                    },
                }}
            >
                <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {Object.entries(perLetter).map(([key, entry]) => (
                        <>
                            <ListItem key={key}>
                                <Typography fontWeight="bold">
                                    {key.toUpperCase()}
                                </Typography>
                            </ListItem>
                            <Box sx={{ marginX: '8px', cursor: 'pointer' }}>
                                {entry.map((word) => (
                                    <ListItemButton
                                        sx={{
                                            fontWeight:
                                                word.id === selected?.id
                                                    ? 'bold'
                                                    : 'normal',
                                            borderRadius: '6px',
                                            backgroundColor:
                                                word.word === selected?.word
                                                    ? 'custom.secondary'
                                                    : 'background.primary',
                                        }}
                                        onClick={() => handleWordClick(word)}
                                        key={word?.word}
                                    >
                                        {capitalize(word.word)}
                                    </ListItemButton>
                                ))}
                            </Box>
                        </>
                    ))}
                </List>

                {selected?.word && (
                    <Paper sx={{ padding: '1rem' }} variant="outlined">
                        <Typography variant="h6" fontWeight="bold">
                            {capitalize(selected?.word)}
                        </Typography>
                        <Typography variant="body1">
                            {selected?.definition}
                        </Typography>
                    </Paper>
                )}
            </Grid>
        </Paper>
    )
}

export default WordList
