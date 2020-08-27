import { Category, Product, CartItem, Order, User } from "./types";


function post(body: any): RequestInit | undefined {
    return {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    };
}

//categories
export async function getCategories(): Promise<Category[]> {
    const res = await fetch('/api/categories/');
    return res.json()
}

//favorite
export async function addFavoriteItem(product_id: number) {
    await fetch('/api/addFavoriteItem', post({ id: product_id }));
}

export async function removeFavoriteItem(product_id: number) {
    await fetch('/api/removeFavoriteItem', post({ id: product_id }));
}

export async function getFavoriteItems(): Promise<Product[]> {
    const res = await fetch(`/api/getFavoriteItems/`)
    return res.json()
}

//order
export async function confirmOrder(cart: CartItem[]): Promise<number> {

    const res = await fetch('/api/confirmOrder',
        post(cart.map(cartItem => ({ product_id: cartItem.product.id, quantity: cartItem.quantity })))
    );

    await new Promise(res => setTimeout(res, 3000))
    return res.json()
}

export async function getOrderHistory(): Promise<Order[]> {
    const res = await fetch('/api/order_history/')
    return res.json()
}

//products
export async function getProducts(categoryId: number): Promise<Product[]> {
    const res = await fetch(`/api/products/?categoryId=${encodeURIComponent(categoryId)}`);
    return res.json()
}

export async function searchProducts(name: string): Promise<Product[]> {
    const res = await fetch(`/api/search?name=${encodeURIComponent(name)}`);
    return res.json();
}

//user
export async function signIn(name: string, password: string): Promise<User | null> {
    const res = await fetch('/api/signIn', post({ name, password }));
    return res.json()
}

export async function signUp(name: string, password: string): Promise<User | null> {
    const res = await fetch('/api/signUp', post({ name, password }));
    return res.json()
}

export async function whoAmI(): Promise<User | null> {
    const res = await fetch('/api/whoAmI');
    return res.json();
}

export async function signOut() {
    await fetch('/api/signOut', {
        method: 'POST'
    })
}