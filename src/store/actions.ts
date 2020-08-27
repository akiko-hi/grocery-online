import { createAction } from 'typesafe-actions'
import { Product, User, CartItem } from '../types'

export const pickCategory = createAction("PICK_CATEGORY")<number>()
export const addToCart = createAction("ADD_TO_CART")<Product>()
export const increaseQty = createAction("INCREASE_QTY")<number>()
export const decreaseQty = createAction("DECREASE_QTY")<number>()
export const addToFavorite = createAction("ADD_TO_FAVORITE")<Product>()
export const removeFromCart = createAction("REMOVE_FROM_CART")<number>()
export const signIn = createAction("SIGNIN")<User>()
export const signOut = createAction("SIGNOUT")()
export const setSearchResult = createAction("SET_SEARCH_RESULT")<Product[]>()
export const resetCart = createAction("RESET_CART")()
export const reorder = createAction("REORDER")<CartItem[]>()
export const loadFavoriteItems = createAction('LOAD_FAVORITE_ITEMS')<Product[]>()


// export function increaseQty(id: number) {
//     return { type: "INCREASE_QTY", payload: id }
// }

// export function addToCart(p: Product) {
//     return { type: "ADD_TO_CART", payload: p }
// }
