import data from '../data.json';
import { sortData, createKeyMapping, } from '../utils/index';

/** Action Names */
const ActionTypes = {
    FETCH_DATA: "FETCH_DATA",
    SORT_LIST: "SORT_LIST",
    DELETE_MSG: "DELETE_MSG",
};


// fetches
const fetchNextSetData = (messages, mappings, page, limit, sortType) => {
    console.log('sorting data', sortType);
    let beginIdx = (page - 1) * limit;
    let endIdx = beginIdx + limit;
    const msgs = sortData(data.messages, sortType); // get the data sorted
    //const newDataSet = msgs.slice(0, messages.length + limit); // full set of data plus limit
    const newDataSet = msgs.slice(beginIdx, endIdx);
    console.log('mappings size', mappings.size);
    if (mappings.size > 0) {
        // remove anyting from new dataset
        newDataSet.forEach((msg) => {
            let key =`${msg.uuid}_${msg.content}`
            console.log('key', key);

            if (mappings.has(key)) {
                console.log('========we sound match=====', msg);
                msg.deleted = true;
                msg.duplicate = true;
            } 
                mappings.add(key);
        });
    } else {
        createKeyMapping(newDataSet, mappings);
    }
    
    let combineData = messages.concat(newDataSet);
    console.log('mappings', mappings);
    console.log('combine', combineData);
    return {
        type: ActionTypes.FETCH_DATA,
        messages: combineData,
        mappings: mappings,
        page: page + 1,
        limit: limit,
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