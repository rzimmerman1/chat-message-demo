// actions
import { ActionTypes, } from './action';

const defaultState = {
    page: 1,
    limit: 5,
    messages: [],
    mappings: new Set(),
    sort: 'asc',
    hasMore: true,
};


const chatReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.SORT_LIST:
            console.log('sort', action);
            return Object.assign({}, state, {
                sort: action.sort,
            });
        case ActionTypes.FETCH_DATA: 
            console.log('action', action);
            return Object.assign({}, state, {
                messages: action.messages,
                page: action.page,
                limit: action.limit,
                mappings: action.mappings,
                hasMore: action.hasMore,
            });
        case ActionTypes.DELETE_MSG:
            console.log('delete', action);
            return Object.assign({}, state, {
                messages: action.messages,
            });
        default:
            return state;
    }
};



export default chatReducer;