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

export {
    dateFormat,
    sortData,
}