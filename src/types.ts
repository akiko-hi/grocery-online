export type Category = {
    id: number
    name: string
    image: string
    color: string
}

export type Order = {
    order_id: number
    date: number
    items: CartItem[]
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