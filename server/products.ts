import { openDB } from './db';
import { Request } from 'express';


export async function getProducts({ query }: Request) {
    const db = await openDB()
    return await db.all('select * from Product p where p.category_id = ? order by id limit ?, ?', query.categoryId, query.skip,query.limit)
}

export async function searchProducts({ query }: Request) {
    const db = await openDB()
    return await db.all('select * from Product p where p.name like ?', query.name + "%")
}

export async function generateMoreProducts() {

    const fruits = ["Apple", "Banana", "Orange", "Kiwi", "Pear"]
    const randomWords = ["Amazing", "Tasty", "Great"]
    const newArr = []

    for (let word of randomWords) {
        for (let item of fruits) {
            newArr.push(word + " " + item)
        }
    }

    const image = ["apple.png", "banana.png", "orange.png", "kiwi.png", "pear.png"]

    const newObj = newArr.map(item => ({
        name: item,
        price: getRandomNum(3, 8),
        image: image[getRandomNum(0, 5)],
        description: `Fresh ${item} from our local orchard.`,
        category_id: 1
    }))
    const db = await openDB()

    for (const obj of newObj) {
        await db.run(`
    insert into Product (name, price, image, description, category_id)
    values (?, ?, ?, ?, ?)`, obj.name, obj.price, obj.image, obj.description, obj.category_id)
    }
}

function getRandomNum(min: number, max: number): number {
    return Math.floor((Math.random() * (max - min)) + min)
}


