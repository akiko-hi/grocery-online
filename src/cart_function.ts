import { Product } from './api';

type CartItem = {
    product: Product
    quantity: number
}

export function getTotalPrice(arr: CartItem[]) {
    return arr.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
} 