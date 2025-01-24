import Dexie, { type EntityTable } from 'dexie'
import { MemiLog } from './types/MemiLog'

const db = new Dexie('MemiLogDatabase') as Dexie & {
  logs: EntityTable<
  MemiLog,
    'id' 
  >
}
db.version(1).stores({
  logs: '++id, isUp, createdAt, text',
})

export { db }

