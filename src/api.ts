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


export type CartItem = {
    product: Product
    quantity: number
}


export async function getCategories(): Promise<Category[]> {
    const res = await fetch('/api/categories/');
    return res.json()
}

export async function getProducts(): Promise<Product[]> {
    const res = await fetch('/api/products/');
    return res.json()
}

export async function searchProducts(name: string): Promise<Product[]> {
    const res = await fetch(`/api/search?name=${encodeURIComponent(name)}`);
    return res.json();
}

export async function signIn(name: string, password: string): Promise<User | null> {
    const res = await fetch('/api/signIn', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, password }),
    });
    return res.json()
}

export async function signOut() {
    await fetch('/api/signOut', {
        method: 'POST'
    })
}

export async function signUp(name: string, password: string): Promise<User | null> {
    const res = await fetch('/api/signUp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, password }),
    });
    return res.json()
}

export async function whoAmI(): Promise<User | null> {
    const res = await fetch('/api/whoAmI');
    return res.json();
}

export async function confirmOrder(cart: CartItem[]): Promise<number> {
    const res = await fetch('/api/confirmOrder', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(cart.map(cartItem => ({product_id: cartItem.product.id, quantity: cartItem.quantity}))),
    });

    await new Promise(res => setTimeout(res, 3000))

    return res.json()
  
}
