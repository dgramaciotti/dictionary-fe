import {
    Box,
    IconButton,
    List,
    ListItem,
    TextField,
    Typography,
} from '@mui/material'
import { useAppState } from '../../data/state'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { deleteWord, upsert } from '../../api/operations'
import { useQueryClient } from '@tanstack/react-query'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

interface DrawerFormValues {
    title: string
    definition: string
}

function DrawerCanvas() {
    const queryClient = useQueryClient()
    const selectedWord = useAppState((s) => s.selectedWord)
    const setSelected = useAppState((s) => s.setSelectedWord)
    const { reset, control, handleSubmit, formState } =
        useForm<DrawerFormValues>({
            defaultValues: {
                title: '',
                definition: '',
            },
        })

    const onSubmit = handleSubmit(async (s) => {
        const key = await upsert({
            id: selectedWord?.id,
            word: s.title,
            definition: s.definition,
        })
        // No point in doing optimistic updates, just reset the query (its fast with indexedDB)
        await queryClient.invalidateQueries({ queryKey: ['words'] })
        setSelected({ word: s.title, definition: s.definition, id: key })
    })

    const handleAdd = () => {
        setSelected({ word: 'New', definition: '...' })
    }

    const handleDelete = async () => {
        await deleteWord(selectedWord?.id)
        await queryClient.invalidateQueries({ queryKey: ['words'] })
        setSelected(null)
    }

    useEffect(() => {
        if (!selectedWord) return
        reset({ title: selectedWord.word, definition: selectedWord.definition })
    }, [selectedWord, reset])

    return (
        <List
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                textDecoration: 'none',
            }}
        >
            <ListItem
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography fontSize="1.5rem" fontWeight="bold" variant="h1">
                    Selected
                </Typography>
                <Box>
                    <IconButton onClick={handleAdd}>
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </ListItem>
            <ListItem>
                <Controller
                    name="title"
                    control={control}
                    rules={{
                        required: {
                            message: 'Cannot have empty words.',
                            value: true,
                        },
                        minLength: {
                            value: 1,
                            message: 'Cannot have empty words.',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            onBlur={() => {
                                field.onBlur()
                                onSubmit()
                            }}
                            fullWidth
                            error={!!formState.errors.title}
                            helperText={formState.errors.title?.message}
                            label="Word"
                        />
                    )}
                />
            </ListItem>
            <ListItem>
                <Controller
                    name="definition"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Cannot have empty definitions.',
                        },
                        minLength: {
                            value: 1,
                            message: 'Cannot have empty definitions.',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            onBlur={() => {
                                field.onBlur()
                                onSubmit()
                            }}
                            fullWidth
                            label="Definition"
                            multiline
                            error={!!formState.errors.definition}
                            helperText={formState.errors.definition?.message}
                        />
                    )}
                />
            </ListItem>
        </List>
    )
}

export default DrawerCanvas
