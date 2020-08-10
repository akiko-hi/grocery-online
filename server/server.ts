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

app.listen(port, () => console.log(`Listening on port ${port}`));

function action(func: (params: Record<string, string>, body: any) => Promise<any>) {
    return function (req: Request, res: Response) {
        func(req.params, req.body)
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