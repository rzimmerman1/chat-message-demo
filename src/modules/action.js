import data from '../data.json';
import { sortData, } from '../utils/index';

/** Action Names */
const ActionTypes = {
    FETCH_DATA: "FETCH_DATA",
    SORT_LIST: "SORT_LIST",
    DELETE_MSG: "DELETE_MSG",
};

const LIMIT = 5;

// fetches
const fetchNextSetData = (messages, mappings, page, limit, sortType, hasMore) => {
    let beginIdx = (page - 1) * limit;
    let endIdx = beginIdx + limit;
    const msgs = sortData(data.messages, sortType); 
    const newDataSet = msgs.slice(beginIdx, endIdx);
    
    newDataSet.forEach((msg) => {
        let key =`${msg.uuid}_${msg.content}`
        if (mappings.has(key)) {
            msg.deleted = true;
            msg.duplicate = true;
        } 
            mappings.add(key);
    });
    let combineData = messages.concat(newDataSet);
    return {
        type: ActionTypes.FETCH_DATA,
        messages: combineData,
        mappings: mappings,
        page: page + 1,
        limit: limit,
        hasMore: (page + 1 <= (Math.ceil(data.messages.length / LIMIT))),
    };
};

// actions
const sortList = (sort, data) => ({
    type: ActionTypes.SORT_LIST,
    sort,
});

const deleteMsg = (message, messages) => {
    messages.forEach((msg) => {
        // same object lets delete it
        if (msg === message) {
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