import { createStore, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import rootReducer from "../Reducers";
import createSagaMiddleware from "redux-saga";
import history from "../Utils/history";

const composeEnhancers = composeWithDevTools({
    // Specify actionsCreators and other options if needed.
});

export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
    const store = createStore(
        connectRouter(history)(rootReducer),
        initialState,
        composeEnhancers(
            applyMiddleware(thunk, reduxImmutableStateInvariant(), routerMiddleware(history), sagaMiddleware)

            // Other store enhancers.
        )
    );

    return store;
}
