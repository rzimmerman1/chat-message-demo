import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import chatReducer from './chatReducer';

export default function configureStore(initialState) {
    const store = createStore(chatReducer, initialState, applyMiddleware(logger));
    return store;
}