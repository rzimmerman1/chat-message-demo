import React from 'react';
import { dateFormat, } from '../utils';

const CLOSE_BTN = '../../assets/closeBtn.svg';

const userColor = function(user) {
    if (user % 2 === 0) {
        return "userEven";
    }
    return "userOdd";
}

const MessageBox = ({user, content, date, deleteMsg, deleted}) => (
    <div className={`messageBox ${deleted ? 'hide': ''}`}>
        <div className={`container ${userColor(user)}`}>
            <div className="icon">
                <div className="iconProfile">{user}</div>
            </div>
            <div className="chat">
                <div className="content">&#8220;{`${content}`}&#8221;</div>
                <div className="delete" onClick={() => deleteMsg(date)} >
                    <img alt="close button" src={CLOSE_BTN} />
                </div>
            </div>
            </div>
        <div className="date">{dateFormat(date)}</div>
    </div>
);

export default MessageBox;
