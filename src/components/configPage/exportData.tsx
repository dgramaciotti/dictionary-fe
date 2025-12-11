import {
    Box,
    Typography,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material'
import { useState } from 'react'
import { getAll } from '../../api/operations'
import { Controller, useForm } from 'react-hook-form'
import { toLetterDict } from '../../utils/dataTransforms'
import HelpTooltip from '../HelpTooltip'
import { downloadJSON } from '../../utils/download'

interface ExportFormValues {
    dataFormat: 'dict' | 'array'
}

function ExportData() {
    const { control, handleSubmit } = useForm<ExportFormValues>({
        defaultValues: {
            dataFormat: 'dict',
        },
    })
    const [loading, setLoading] = useState(false)
    const handleExport = handleSubmit(async (formValues) => {
        setLoading(true)
        const data = await getAll()
        if (formValues.dataFormat === 'array') {
            downloadJSON(JSON.stringify(data))
        } else {
            downloadJSON(JSON.stringify(toLetterDict(data)))
        }
        setLoading(false)
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
                    Export data
                </Typography>
                <Typography variant="body1">
                    Export all DB data in a JSON format.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Data format</FormLabel>
                        <Controller
                            rules={{ required: true }}
                            control={control}
                            name="dataFormat"
                            render={({ field }) => (
                                <RadioGroup {...field}>
                                    <FormControlLabel
                                        value="dict"
                                        control={<Radio />}
                                        label={
                                            <HelpTooltip
                                                label="Dictionary"
                                                helperText='Ex. {{"a": ["Abend"], "b": ["batch"]}'
                                            />
                                        }
                                        defaultChecked
                                    />
                                    <FormControlLabel
                                        value="array"
                                        control={<Radio />}
                                        label={
                                            <HelpTooltip
                                                label="Array"
                                                helperText='Ex. ["Abend", "batch"]'
                                            />
                                        }
                                    />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </Box>
                <Button
                    loading={loading}
                    onClick={handleExport}
                    sx={{ width: 'fit-content' }}
                    variant="contained"
                >
                    Export
                </Button>
            </Box>
        </Box>
    )
}

export default ExportData
