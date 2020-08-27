import { openDB } from './db';
import { Request } from 'express';
import { OrderHistoryRow, Order, CartItem } from './types';

export async function getOrderHistoty(req: Request) {

    const userId = req.session!.userId
    const db = await openDB()

    const arr: OrderHistoryRow[] = await db.all(`
        select o.id order_id, o.date, oi.quantity, p.*
        from "Order" o
        join OrderItem oi on o.id = oi.order_id
        join Product p on oi.product_id = p.id
        where o.user_id = ?
        order BY o.id
    `, userId)

    const newArr = [];
    let newItem: Order = { order_id: arr[0].order_id, date: arr[0].date, items: [] }

    for (let i = 0; i < arr.length; i++) {
        const { order_id, date, quantity, ...product } = arr[i]
        if (newItem.order_id !== order_id) {
            newArr.push(newItem)
            newItem = { order_id: order_id, date: date, items: [] }
        }

        newItem.items.push({
            product: product,
            quantity: quantity
        })
    }
    newArr.push(newItem)
    return newArr
}

export async function confirmOrder(req: Request) {

    const userId = req.session!.userId
    if (!userId) { return }

    const cart: CartItem[] = req.body
    const db = await openDB()
    const res = await db.run('insert into "Order" (user_id, date) values (?, ?)', userId, Date.now())

    for (const item of cart) {
        db.run('insert into OrderItem (order_id, product_id, quantity) values (?, ?, ?);', res.lastID, item.product_id, item.quantity)
    }
    
    return res.lastID
}