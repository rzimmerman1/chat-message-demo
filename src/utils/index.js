import moment from 'moment';

function dateFormat(date) {
    return moment(date).format('dddd MMMM Do, YYYY [at] h:mm a')
}

export {
    dateFormat,
}