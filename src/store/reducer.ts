import { combineReducers } from "redux";
import { getType } from "typesafe-actions";
import { Actions } from ".";
import * as actions from "./actions";
import { Product, User } from "../api";

function categoryId(state: number | null = null, action: Actions): number | null {

    switch (action.type) {
        case getType(actions.pickCategory):
            return action.payload

        case getType(actions.setSearchResult):
            return null

        default:
            return state
    }
}

type CartItem = {
    product: Product
    quantity: number
}

function cart(state: CartItem[] = [], action: Actions): CartItem[] {
    switch (action.type) {
        case getType(actions.addToCart):

            const hasExistingItem = state.some(item => item.product.id === action.payload.id)

            if (hasExistingItem) {
                return cart(state, actions.increaseQty(action.payload.id))
            }
            return [...state, { product: action.payload, quantity: 1 }]

        case getType(actions.increaseQty):
            return state.map(item => item.product.id === action.payload ?
                { ...item, quantity: item.quantity + 1 } : item)

        case getType(actions.decreaseQty):
            return state.map(item => item.product.id === action.payload ?
                { ...item, quantity: item.quantity - 1 } : item)
                .filter(item => item.quantity !== 0)

        case getType(actions.removeFromCart):
            return state.filter(item => item.product.id !== action.payload)

        case getType(actions.resetCart):
            return []

        default:
            return state
    }
}

function favorite(state: Product[] = [], action: Actions): Product[] {

    switch (action.type) {
        case getType(actions.addToFavorite):

            const isFavorited = state.some(item => item.id === action.payload.id)

            if (isFavorited) {
                return state.filter(item => item.id !== action.payload.id)
            }

            return [...state, action.payload]

        default:
            return state
    }
}

function user(state: User | null = null, action: Actions): User | null {

    switch (action.type) {
        case getType(actions.signIn):
            return action.payload

        case getType(actions.signOut):
            return null

        default:
            return state
    }
}

function searchResult(state: Product[] = [], action: Actions): Product[] {

    switch (action.type) {
        case getType(actions.setSearchResult):
            return action.payload

        case getType(actions.pickCategory):
            return []

        default:
            return state
    }
}

export default combineReducers({
    categoryId,
    cart,
    favorite,
    user,
    searchResult,
})

// export function selectCounter(state: StoreState) {
//     return state.counter
// }

// export function selectCart(state: StoreState) {
//     return state.cart
// }
// }