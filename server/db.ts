import { open } from 'sqlite';
import { Database } from 'sqlite3';

export async function openDB() {
    const db = await open({ filename: "./db.sqlite", driver: Database });
    await db.run('PRAGMA foreign_keys = ON')
    return db
}
