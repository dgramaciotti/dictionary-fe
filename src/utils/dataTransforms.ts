import { Word } from '../models/Word'

const toLetterDict = (words?: Word[]): Record<string, Word[]> => {
    if (!words) return {}
    return words.reduce(
        (acc, word) => ({
            ...acc,
            [word.word[0].toLowerCase()]: [
                ...(acc[word.word[0].toLowerCase() as keyof typeof acc] || []),
                { ...word },
            ],
        }),
        {}
    )
}

export { toLetterDict }
