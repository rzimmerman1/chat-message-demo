import React, { useEffect, useState, } from 'react';
import { connect, } from 'react-redux';
import { fetchNextSetData, sortList, deleteMsg } from './modules/action';

import Header from './components/Header';
import MessageBox from './components/MessageBox';
import Toolbar from './components/Toolbar';

const ChatView = (props) => {
    const { messages, mappings, page, limit, fetchNextSetData, sortList, deleteMsg, hasMore  } = props;

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
        fetchNextSetData(messages, mappings, page, limit, sort, hasMore);
    }

    // delete msg
    var onDelete = function (message) {
        deleteMsg(message, messages);
        setIsDeleting(true);
    };

    // on mount
    useEffect(() => {
        fetchNextSetData(messages, mappings, page, limit, sort, hasMore);
    }, []);

     // we have to change sort
     useEffect(() => {
        if (isSorting) {
            sortList(sort); // change sort
            fetchNextSetData([], new Set(), 1, limit, sort, hasMore);
            setIsSorting(false);
        }
    }, [isSorting]);

    useEffect(() => {
        setIsDeleting(false);
    }, [messages, isDeleting]);

    return (
        <React.Fragment>
            <Header>
                <div className="space"></div>
                <div className="headerTitle">&#8220;CHAT MESSAGES&#8221;</div>
                <Toolbar onChangeSort={() => changeSort()} sort={sort} />
            </Header>
            <div className="App">
                <div className="listView">
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
                    
                   <div className="infiniteScroll">
                        {hasMore && <button onClick={() => fetchMoreData()}>Load More...</button>}
                        {!hasMore && <div className="emptyMessages">No more messages...</div>}  
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    messages: state.messages,
    mappings: state.mappings,
    page: state.page,
    limit: state.limit,
    sort: state.sort,
    hasMore: state.hasMore,
});

const mapDispatchToProps = dispatch => ({
    sortList: (sort, data) => dispatch(sortList(sort, data)),
    fetchNextSetData: (messages, mappings, page, limit, sort, hasMore) => dispatch(fetchNextSetData(messages, mappings, page, limit, sort, hasMore)),
    deleteMsg: (message, messages) => dispatch(deleteMsg(message, messages)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChatView);
