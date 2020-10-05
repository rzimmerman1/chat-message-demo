import React from 'react';

import data from './data.json';

import MessageBox from './components/MessageBox';

const ChatView = () => {
    const messages = data.messages;
    return (
        <div className="listView">
            {messages.map((set, idx) => {
                return <MessageBox dkey={`messagechat-${idx}`} user={set.senderUuid} content={set.content} date={set.sentAt} />
          })}
        </div>
    );
}

export default ChatView;
