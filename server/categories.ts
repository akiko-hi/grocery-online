import { Request } from 'express';
import { openDB } from './db';

export async function getCategories(req: Request) {
    const db = await openDB()
    return await db.all('select c.id, c.name, c.image, c.color from Category c')
}
