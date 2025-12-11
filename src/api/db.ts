import { Dexie, type EntityTable } from 'dexie'
import { Word } from '../models/Word'

const db = new Dexie('Dictionary') as Dexie & {
    words: EntityTable<Word, 'id'>
}

db.version(1).stores({
    words: '++id, word, definition',
})

export { db }
