export type Category = {
    id: number
    name: string
    image: string
    color: string
}

export type Product = {
    id: number
    name: string
    price: number
    image: string
    description: string
    category_id: number
}

export type User = {
    id: number
    name: string
}

export type Cart = {
    products: Product[]
}

export async function getCategories(): Promise<Category[]> {
    const res = await fetch('/api/categories/');
    return res.json()
}

export async function getProducts(): Promise<Product[]> {
    const res = await fetch('/api/products/');
    return res.json()
}

export async function signIn(name: string, password: string): Promise<User | null> {
    const res = await fetch('/api/signIn', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, password }),
    });
    return res.json()
}

export async function signUp(name: string, password: string): Promise<User | null> {
    const res = await fetch('/api/signUp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, password }),
    });
    return res.json()
}