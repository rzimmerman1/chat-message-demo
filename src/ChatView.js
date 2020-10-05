import React, { useEffect, } from 'react';
import { connect, } from 'react-redux';
import { fetchNextSetData } from './modules/action';

import MessageBox from './components/MessageBox';

const ChatView = (props) => {
    const { messages, page, limit, fetchNextSetData, } = props;

    // on mount
    useEffect(() => {
        console.log('we mounted');
        fetchNextSetData(messages, page, limit);
    }, []);

    return (
        <div className="listView">
            {messages.map((set, idx) => {
                return <MessageBox key={`messagechat-${idx}`} user={set.senderUuid} content={set.content} date={set.sentAt} />
          })}
        </div>
    );
}

const mapStateToProps = state => ({
    messages: state.messages,
    mappings: state.mappings,
    page: state.page,
    limit: state.limit,
});

const mapDispatchToProps = dispatch => ({
    fetchNextSetData: (messages, page, limit) => dispatch(fetchNextSetData(messages, page, limit)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChatView);
