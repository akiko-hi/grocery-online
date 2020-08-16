import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger';
import reducer from "./reducer";
import * as actions from "./actions"
import { ActionType, StateType } from "typesafe-actions";
import { useSelector as useUntypedSelector } from "react-redux"

export function configureStore() {
    return createStore(
        reducer,
        applyMiddleware(logger)
    )
}

export { actions }

export type Actions = ActionType<typeof actions>
export type StoreState = StateType<typeof reducer>

export function useSelector<T>(selector: (state: StoreState) => T) {
    return useUntypedSelector(selector)
}
