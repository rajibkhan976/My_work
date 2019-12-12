import { createStore, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import rootReducer from "../Reducers";
import createSagaMiddleware from "redux-saga";
import history from "../Utils/history";

const router = routerMiddleware(history);

export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
    const store = createStore(connectRouter(history)(rootReducer), initialState, applyMiddleware(thunk, router, sagaMiddleware));

    return store;
}
