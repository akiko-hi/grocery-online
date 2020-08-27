export type Product = {
    id: number
    name: string
    price: number
    image: string
    description: string
    category_id: number
}

export type OrderHistoryRow = {
    order_id: number
    date: number
    quantity: number
} & Product

export type Order = {
    order_id: number
    date: number
    items: {
        product: Product
        quantity: number
    }[]
}


export type CartItem = {
    product_id: number
    quantity: number
}
