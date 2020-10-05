import data from '../data.json';

/** Action Names */
const ActionTypes = {
    FETCH_DATA: "FETCH_DATA",
    SORT_LIST: "SORT_LIST",
};


// fetches
const fetchNextSetData = (messages, page, limit, sortType) => {
    let beginIdx = (page - 1) * limit;
    let endIdx = beginIdx + limit;
    const arr = data.messages.slice(beginIdx, endIdx);
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


export {
    ActionTypes,
    fetchNextSetData,
    sortList,
}