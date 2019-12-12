import * as sagas from "../Sagas";

export const initSagas = (sagaMiddleware, dispatch) => {
    Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware, dispatch));
};
