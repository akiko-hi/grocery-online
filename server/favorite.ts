import { Request } from 'express';
import { openDB } from './db';

export async function addFavoriteItem(req: Request) {
    const userId = req.session!.userId
    if (!userId) { return }

    const favoriteItem: { id: number } = req.body
    const db = await openDB()
    await db.run('insert into Favorite (user_id, product_id) values (?, ?)', userId, favoriteItem.id)
}

export async function removeFavoriteItem(req: Request) {
    const userId = req.session!.userId
    if (!userId) { return }

    const favoriteItem: { id: number } = req.body
    const db = await openDB()
    await db.run('delete from Favorite where user_id = ? and product_id = ?', userId, favoriteItem.id)
}

export async function getFavoriteItems(req: Request) {
    const userId = req.session!.userId
    if (!userId) { return }

    const db = await openDB()
    return await db.all(`
    select p.id, p.name, p.price, p.image, p.description, p.category_id from Product p 
    join Favorite f on p.id = f.product_id
    where f.user_id = ?`, userId
    );
}
