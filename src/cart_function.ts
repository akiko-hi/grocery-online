import { CartItem } from './types';

export function getTotalPrice(arr: CartItem[]) {
    return arr.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
} 