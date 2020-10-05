import data from '../data.json';
import { sortData, } from '../utils/index';

/** Action Names */
const ActionTypes = {
    FETCH_DATA: "FETCH_DATA",
    SORT_LIST: "SORT_LIST",
    DELETE_MSG: "DELETE_MSG",
};


// fetches
const fetchNextSetData = (messages, page, limit, sortType) => {
    let beginIdx = (page - 1) * limit;
    let endIdx = beginIdx + limit;
    const msgs = sortData(data.messages, sortType);
    const arr = msgs.slice(beginIdx, endIdx);
    return {
        type: ActionTypes.FETCH_DATA,
        messages: messages.concat(arr),
        page: page + 1,
        limit: limit,
    };
};

// actions
const sortList = (sort, data) => ({
    type: ActionTypes.SORT_LIST,
    sort,
    messages: data, // can sort it this way data
});

const deleteMsg = (message, messages) => {
    messages.forEach((msg) => {
        // same object lets delete it
        if (msg === message) {
            console.log(msg);
            msg.deleted = true;
        }
    });
    return {
        type: ActionTypes.DELETE_MSG,
        messages,
    }
};

export {
    ActionTypes,
    fetchNextSetData,
    sortList,
    deleteMsg,
}