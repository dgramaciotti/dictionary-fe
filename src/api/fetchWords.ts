import { db } from './db'

interface FetchWordsFilter {
    query: string
    max?: number
}

const MAX_WORDS = 50

const fetchWords = async (filter: FetchWordsFilter) => {
    if (!filter.query)
        return (await db.words.toArray()).slice(0, filter.max || MAX_WORDS)
    return await db.words
        .where('word')
        .startsWithAnyOf([...filter.query.split(' ')])
        .or('word')
        .anyOfIgnoreCase([...filter.query.split(' ')])
        .limit(filter.max || MAX_WORDS)
        .toArray()
}

export { fetchWords, type FetchWordsFilter }
