import React, { useEffect, useState, } from 'react';
import { connect, } from 'react-redux';
import { fetchNextSetData, sortList, deleteMsg } from './modules/action';

import MessageBox from './components/MessageBox';
import Toolbar from './components/Toolbar';

const ChatView = (props) => {
    const { messages, mappings, page, limit, fetchNextSetData, sortList, deleteMsg  } = props;

    let [sort, setSort] = useState('asc');

    let [isSorting, setIsSorting] = useState(false);

    let [isDeleting, setIsDeleting] = useState(false);

    // sort existing data
    var changeSort = function () {
        setIsSorting(true);
        setSort((sort === 'asc' ? 'desc' : 'asc'));
    }

    // fetch next set of data
    var fetchMoreData = function () {
        fetchNextSetData(messages, mappings, page, limit, sort);
    }

    // delete msg
    var onDelete = function (message) {
        deleteMsg(message, messages);
        setIsDeleting(true);
    };

    // on mount
    useEffect(() => {
        console.log('we mounted');
        fetchNextSetData(messages, mappings, page, limit, sort);
    }, []);

     // we have to change sort
     useEffect(() => {
        console.log('sort has changed');
        console.log(sort);
        if (isSorting) {
            sortList(sort); // change sort
            fetchNextSetData([], new Set(), 1, limit, sort);
            setIsSorting(false);
        }
    }, [isSorting, messages, sort, sortList]);

    useEffect(() => {
        setIsDeleting(false);
    }, [messages, isDeleting]);

    return (
        <div className="listView">
            <Toolbar onChangeSort={() => changeSort()} sort={sort} />
            {messages.map((set, idx) => {
                return <MessageBox
                    key={`messagechat-${idx}`}
                    deleted={(set.deleted ? true : false)}
                    deleteMsg={() => onDelete(set)}
                    user={set.senderUuid}
                    content={set.content}
                    date={set.sentAt}
                    />
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
    fetchNextSetData: (messages, mappings, page, limit, sort) => dispatch(fetchNextSetData(messages, mappings, page, limit, sort)),
    deleteMsg: (message, messages) => dispatch(deleteMsg(message, messages)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChatView);
