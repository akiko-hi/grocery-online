import { Request } from 'express';
import { openDB } from './db';


export async function signOut(req: Request) {
    req.session = null
}

export async function signUp({ body }: Request) {
    const db = await openDB()

    try {
        await db.run('insert into User (name, password) values (?, ?)', body.name, body.password)
        const user = await db.get('select u.name from User u where u.name = ?', body.name)
        return user
    } catch (e) {
        return null
    }
}

export async function signIn(req: Request) {
    const { name, password } = req.body
    const db = await openDB()
    const user = await db.get('select u.id, u.name from User u where u.name = ? and u.password = ?', name, password)

    if (user) {
        req.session!.userId = user.id
        return user
    } else {
        req.session = null
        return null
    }
}

export async function whoAmI(req: Request) {
    const userId = req.session!.userId
    if (!userId) { return null }
    const db = await openDB()
    return await db.get("select id, name from User where Id = ?", userId)
}