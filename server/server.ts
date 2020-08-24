import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import path from "path";
import { open } from 'sqlite';
import { Database } from 'sqlite3';

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieSession({ secret: "Akiko123" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")))

app.get('/api/categories/', action(getCategories));
app.get('/api/products/', action(getProducts));
app.get('/api/search', action(searchProducts));
app.post('/api/signIn', action(signIn));
app.post('/api/signOut', action(signOut));
app.post('/api/signUp', action(signUp));
app.get('/api/whoAmI', action(whoAmI));
app.post('/api/confirmOrder', action(confirmOrder));
app.get('/api/order_history/', action(getOrderHistoty));

app.listen(port, () => console.log(`Listening on port ${port}`));

function action(func: (req: Request) => Promise<any>) {
    return function (req: Request, res: Response) {
        func(req)
            .then(x => res.json(x))
            .catch(err => res.status(500).send(err.message))
    }
}

async function openDB() {
    return await open({ filename: "./db.sqlite", driver: Database });
}

async function getCategories(req: Request) {
    const db = await openDB()
    return await db.all('select c.id, c.name, c.image, c.color from Category c')
}

async function getProducts({ query }: Request) {
    const db = await openDB()
    return await db.all('select * from Product p where p.category_id = ?', query.categoryId)
}

async function signIn(req: Request) {
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

type OrderHistoryRow = {
    order_id: number
    date: number
    quantity: number
} & Product

type Order = {
    order_id: number
    date: number
    items: { 
        product: Product
        quantity: number
     }[]
}

type Product = {
    id: number
    name: string
    price: number
    image: string
    description: string
    category_id: number
}

async function getOrderHistoty(req: Request) {
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

async function signOut(req: Request) {
    req.session = null
}

async function signUp({ body }: Request) {
    const db = await openDB()

    try {
        await db.run('insert into User (name, password) values (?, ?)', body.name, body.password)
        const user = await db.get('select u.name from User u where u.name = ?', body.name)
        return user
    } catch (e) {
        return null
    }
}

async function searchProducts({ query }: Request) {
    const db = await openDB()
    return await db.all('select * from Product p where p.name like ?', query.name + "%")
}

async function whoAmI(req: Request) {
    const userId = req.session!.userId
    if (!userId) { return null }
    const db = await openDB()
    return await db.get("select id, name from User where Id = ?", userId)
}

type CartItem = {
    product_id: number
    quantity: number
}

async function confirmOrder(req: Request) {
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