import { createAction } from 'typesafe-actions'
import { Product } from '../api'

export const pickCategory = createAction("PICK_CATEGORY")<number>()
export const addToCart = createAction("ADD_TO_CART")<Product>()
export const increaseQty = createAction("INCREASE_QTY")<number>()
export const decreaseQty = createAction("DECREASE_QTY")<number>()
export const addToFavorite = createAction("ADD_TO_FAVORITE")<Product>()
export const removeFromCart = createAction("REMOVE_FROM_CART")<Product>()

// export function increaseQty(id: number) {
//     return { type: "INCREASE_QTY", payload: id }
// }

// export function addToCart(p: Product) {
//     return { type: "ADD_TO_CART", payload: p }
// }