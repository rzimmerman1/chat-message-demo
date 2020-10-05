// actions
import { ActionTypes, } from './action';
import { sortData, } from '../utils';

const defaultState = {
    page: 1,
    limit: 5,
    messages: [],
    sort: 'asc',
};


const chatReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.SORT_LIST:
            console.log('sort', action);
            return Object.assign({}, state, {
                sort: action.sort,
                messages: sortData(action.messages, action.sort),
            });
        case ActionTypes.FETCH_DATA: 
            console.log('action', action);
            return Object.assign({}, state, {
                messages: action.messages,
                page: action.page,
                limit: action.limit,
            });
        default:
            return state;
    }
};



export default chatReducer;