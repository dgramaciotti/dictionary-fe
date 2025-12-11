import { Word } from '../models/Word'
import { db } from './db'

const resetDB = async (payload: Record<string, Word[]> | Word[]) => {
    await deleteDB()
    await initializeDatabase(payload)
}

const deleteDB = async () => {
    return await db.delete()
}

const bulkAdd = (payload: Record<string, Word[]> | Word[]) => {
    if (Array.isArray(payload)) return db.words.bulkAdd(payload)
    const wordArray = Object.values(payload).reduce(
        (acc, entry) => [...acc, ...entry],
        [] as Word[]
    )
    return db.words.bulkAdd(wordArray)
}

async function initializeDatabase(payload: Record<string, Word[]> | Word[]) {
    try {
        const count = await db.words.count()
        console.log('Initial Database Word Count:', count)

        if (count === 0) {
            console.log('Database is empty. Starting seed process...')
            await bulkAdd(payload)
            console.log('Database seeding complete.')
        } else {
            console.log('Database already contains data.')
        }
    } catch (error) {
        console.error('Error during database initialization or seeding:', error)
    }
}

export { bulkAdd, initializeDatabase, resetDB }
