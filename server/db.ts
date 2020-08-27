import { open } from 'sqlite';
import { Database } from 'sqlite3';

export async function openDB() {
    return await open({ filename: "./db.sqlite", driver: Database });
}
