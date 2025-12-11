import { Word } from '../models/Word'
import { db } from './db'

const upsert = async (word: Word) => {
    return db.words.put({ ...word }, word.id)
}

const getAll = async () => {
    return await db.words.toArray()
}

const deleteWord = async (id?: number) => {
    if (!id) return
    const result = await db.words.delete(id)
    return result
}

export { upsert, getAll, deleteWord }
