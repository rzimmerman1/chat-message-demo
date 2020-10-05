import React from 'react';
import { dateFormat, } from '../utils';

// import moment from 'moment';

const MessageBox = ({user, content, date}) => (
    <div className={`messageBox`}>
        {`user ${user}, content ${content}, date ${dateFormat(date)}`}
    </div>
);

export default MessageBox;
