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
    data.forEach((msg) => {
        let key =`${msg.uuid}_${msg.content}`
        console.log('key', key);

        if (mapping.has(key)) {
            console.log('========we sound match=====', msg);
            msg.deleted = true;
            msg.duplicate = true;
        } 
            mapping.add(key);
    });
    return { data, mapping };
}

export {
    dateFormat,
    sortData,
    createKeyMapping,
}