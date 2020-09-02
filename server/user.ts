import { Request } from 'express';
import { openDB } from './db';
import sha1 from 'sha1'

function hash(pwd: string) {
    return sha1('akiko:' + pwd)
}

export async function signOut(req: Request) {
    req.session = null
}

export async function signUp(req: Request) {
    const db = await openDB()
    const { name, password } = req.body

    try {
        await db.run('insert into User (name, password) values (?, ?)', name, hash(password))
        const user = await db.get('select u.id, u.name from User u where u.name = ?', name)
        req.session!.userId = user.id
        return user
    } catch (e) {
        console.error(e)
        return null
    }
}

export async function signIn(req: Request) {
    const { name, password } = req.body
    const db = await openDB()
    const user = await db.get('select u.id, u.name from User u where u.name = ? and u.password = ?', name, hash(password))

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

export async function deleteUser(req: Request) {
    const userId = req.session!.userId
    if (!userId) { return null }
    const db = await openDB()
    await db.run('delete from User where id =?', userId )
    req.session = null
}