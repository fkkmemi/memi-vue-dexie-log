import { liveQuery } from 'dexie'
import { db } from '../dexie'
import { MemiLog } from '../types/MemiLog'

export const useMemiLog = () => {
  const add = (log: Omit<MemiLog, 'id'>) => {
    return db.logs.add(log)
  }
  const clear = () => {
    return db.logs.clear()
  }

  const logsObservable = (limit: number) =>
    liveQuery(() => db.logs.orderBy('createdAt').reverse().limit(limit).toArray())

  const logsCountObservable = () => liveQuery(() => db.logs.count())
  const saveFile = async () => {
    const logs = await db.logs.toArray()
    const logsString = JSON.stringify(logs, null, 2)
    const blob = new Blob([logsString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'logs.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return {
    add,
    clear,
    logsObservable,
    logsCountObservable,
    saveFile,
  }
}