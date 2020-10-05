import React, { useEffect, useState, } from 'react';
import { connect, } from 'react-redux';
import { fetchNextSetData, sortList } from './modules/action';

import MessageBox from './components/MessageBox';
import Toolbar from './components/Toolbar';

const ChatView = (props) => {
    const { messages, page, limit, fetchNextSetData, sortList,  } = props;

    let [sort, setSort] = useState('asc');

    let [isSorting, setIsSorting] = useState(false);

    var changeSort = function () {
        setIsSorting(true);
        setSort((sort === 'asc' ? 'desc' : 'asc'));
    }

    var fetchMoreData = function () {
        fetchNextSetData(messages, page, limit, sort);
    }

    // on mount
    useEffect(() => {
        console.log('we mounted');
        fetchNextSetData(messages, page, limit);
    }, []);

     // we have to change sort
     useEffect(() => {
        console.log('sort has changed');
        console.log(sort);
        if (isSorting) {
            sortList(sort, messages); // change sort
            setIsSorting(false);
        }
    }, [isSorting, messages, sort, sortList]);

    return (
        <div className="listView">
            <Toolbar onChangeSort={() => changeSort()} sort={sort} />
            {messages.map((set, idx) => {
                return <MessageBox key={`messagechat-${idx}`} user={set.senderUuid} content={set.content} date={set.sentAt} />
          })}
           <div className="inifitescroll">
              <button onClick={() => fetchMoreData()}>Load More...</button>
          </div>
        </div>
    );
}

const mapStateToProps = state => ({
    messages: state.messages,
    mappings: state.mappings,
    page: state.page,
    limit: state.limit,
    sort: state.sort,
});

const mapDispatchToProps = dispatch => ({
    sortList: (sort, data) => dispatch(sortList(sort, data)),
    fetchNextSetData: (messages, page, limit) => dispatch(fetchNextSetData(messages, page, limit)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChatView);
