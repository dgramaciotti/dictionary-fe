import { Word } from '../models/Word'

const getWordOfDay = (words: Word[] = [], randomize = false) => {
    const size = words.length
    if (randomize) {
        const idx = Math.floor(Math.random() * size)
        return words[idx]
    }
    const seed = dailyRandom(size)
    return words[seed]
}

const dailyRandom = (length: number) => {
    const date = new Date()
    const d = date.toISOString().split('T')[0].replace('-', '')
    let h = 0
    // Simple hashing for determinism
    for (let i = 0; i < d.length; i++) {
        h = (h << 5) - h + d.charCodeAt(i)
        h = h & h
    }
    return Math.abs(h) % length
}

const validateWord = (input: string, word: string) => {
    return { input, word }
}

const normalizeString = (str: string) => {
    const normalized = str.normalize('NFD')
    const filtered = normalized.replace(/[\u0300-\u036f]/g, '').toLowerCase()
    return filtered
}

const GAME_KEYBOARD = [
    // Top row
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    // Middle row
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    // Bottom row
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

export { getWordOfDay, GAME_KEYBOARD, validateWord, normalizeString }
