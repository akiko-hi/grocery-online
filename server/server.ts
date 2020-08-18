import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { open } from 'sqlite';
import { Database } from 'sqlite3';
import path from "path"

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")))

app.get('/api/categories/', action(getCategories));
app.get('/api/products/', action(getProducts));
app.get('/api/search', action(searchProducts));
app.post('/api/signIn', action(signIn));
app.post('/api/signUp', action(signUp));

app.listen(port, () => console.log(`Listening on port ${port}`));

function action(func: (params: Record<string, string>, body: any) => Promise<any>) {
    return function (req: Request, res: Response) {
        func(req.query as any, req.body)
            .then(x => res.json(x))
            .catch(err => res.status(500).send(err.message))
    }
}

async function openDB() {
    return await open({ filename: "./db.sqlite", driver: Database });
}

async function getCategories() {
    const db = await openDB()
    return await db.all('select c.id, c.name, c.image, c.color from Category c;')
}

async function getProducts() {
    const db = await openDB()
    return await db.all('select p.id, p.name, p.price, p.image, p.description, p.category_id from Product p;')
}

async function signIn(params, body) {
    const db = await openDB()
    const user = await db.get('select u.id, u.name from User u where u.name = ? and u.password = ?', body.name, body.password)
    return user === undefined ? null : user
}

async function signUp(params, body) {
    const db = await openDB()

    try {
        await db.run('insert into User (name, password) values (?, ?)', body.name, body.password)
        const user =  await db.get('select u.name from User u where u.name = ?', body.name)
        return user
    } catch(e) {
        return null
    }
}


async function searchProducts(params) {
    const db = await openDB()
    return await db.all('select * from Product p where p.name like ?', params.name + "%")
}




