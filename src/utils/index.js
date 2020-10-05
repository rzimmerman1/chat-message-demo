import moment from 'moment';

function dateFormat(date) {
    return moment(date).format('dddd MMMM Do, YYYY [at] h:mm a')
}

function sortData(data, sort = 'asc') {
    // let just use data to sort descending informaion
    return data.sort((a, b) => {
        // console.l('sorting', a.sentAt, b.sentAt);
        if (a.sentAt < b.sentAt) {
            return (sort === 'asc' ? -1 : 1);
        }
        if (a.sentAt > b.sentAt) {
            return (sort === 'asc' ? 1 : -1);
        }
        return 0;
    });
}

/**
 * 
 * @param {*} data 
 * @param {*} mapping 
 * return updated set of mappings based on givin data set
 */
function createKeyMapping(data, mapping) {
    data.map((message, idx) => {
        let key = `${message.uuid}_${message.content}`;
        mapping.add(key);
    });
    return mapping;
}

export {
    dateFormat,
    sortData,
    createKeyMapping,
}