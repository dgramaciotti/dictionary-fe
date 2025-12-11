import {
    Box,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { bulkAdd, resetDB } from '../../api/seed'

interface ImportFormValues {
    resetDB: 'yes' | 'no'
    importData: string
}

function ImportData() {
    const [open, setOpen] = useState(false)
    const { control, handleSubmit, formState, register, getValues } =
        useForm<ImportFormValues>({
            defaultValues: {
                resetDB: 'no',
                importData: '',
            },
        })
    const handleImport = handleSubmit(async (formValues) => {
        if (formValues.resetDB === 'yes') {
            setOpen(true)
        }
        await bulkAdd(JSON.parse(formValues.importData))
    })
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}
            >
                <Typography fontSize="1.25rem" fontWeight="bold">
                    Import data
                </Typography>
                <Typography variant="body1">Import dictionary data</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                    }}
                >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Reset DB</FormLabel>
                        <Controller
                            rules={{ required: true }}
                            control={control}
                            name="resetDB"
                            render={({ field }) => (
                                <RadioGroup {...field}>
                                    <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Yes"
                                        defaultChecked
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </Box>
                <FormControl
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                    }}
                >
                    <FormLabel>Import data</FormLabel>
                    <TextField
                        sx={{
                            maxHeight: '200px',
                            overflowY: 'auto',
                        }}
                        placeholder="Import..."
                        multiline
                        minRows={4}
                        {...register('importData', {
                            required: {
                                value: true,
                                message: 'Enter import data',
                            },
                        })}
                    />
                </FormControl>
                <Button
                    disabled={!formState.isValid}
                    onClick={handleImport}
                    sx={{ width: 'fit-content' }}
                    variant="contained"
                >
                    Import
                </Button>
            </Box>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete all DB data?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        By importing and replacing, all previous DB data will be
                        erased.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={async () => {
                            const data = JSON.parse(getValues().importData)
                            await resetDB(data)
                        }}
                    >
                        Yes
                    </Button>
                    <Button onClick={() => setOpen(false)} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ImportData
