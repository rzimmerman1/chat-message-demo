import React, { useEffect, useState, useCallback, } from 'react';
import { connect, } from 'react-redux';
import { fetchNextSetData, sortList, deleteMsg } from './modules/action';

import Header from './components/Header';
import MessageBox from './components/MessageBox';
import Toolbar from './components/Toolbar';

const ChatView = (props) => {
    const { messages, mappings, page, limit, fetchNextSetData, sortList, deleteMsg, hasMore,  } = props;

    const [element, setElement] = useState(null);

    const [sort, setSort] = useState('asc');

    const [isSorting, setIsSorting] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);

    const [cleanData, setCleanData] = useState(false);
    
    const [msgs, setMsg] = useState(messages);

    // sort existing data
    var changeSort = function () {
        setIsSorting(true);
        setSort((sort === 'asc' ? 'desc' : 'asc'));
    }

    // fetch next set of data
    var fetchMoreData = useCallback(function () {
        fetchNextSetData(messages, mappings, page, limit, sort, hasMore);
    });

    // delete msg
    var onDelete = function (message) {
        deleteMsg(message, messages);
        setIsDeleting(true);
    };

    const loader = React.useRef(fetchMoreData);

    const observer = React.useRef(
        new IntersectionObserver((entries) => {
            // array of entries that triggered all the observations
            const first = entries[0];
            console.log('first', first);
            // when isIntersecting is true then we fetch data
            if (first.isIntersecting) {
                // load data
                console.log('we again here');
                loader.current();
            }
        }, { threshold: 1 })
    );

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current; // ref of the current propertie

        if (currentElement) {
            currentObserver.observe(currentElement);
        }
        // clean up (componentDidMount)
        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [element]);

    useEffect(() => {
        if (cleanData) {
            setCleanData(false);
        } else {
            loader.current = fetchMoreData; 
        }
        
    }, [fetchMoreData, cleanData]);

     // we have to change sort
     useEffect(() => {
        if (isSorting) {
            sortList(sort); // change sort
            setCleanData(true);
            setIsSorting(false);
        }
    }, [isSorting, sort, sortList]);

    useEffect(() => {
        setIsDeleting(false);
    }, [isDeleting]);

    useEffect(() => {
        console.log('we change messages')
        setMsg(messages);
    }, [messages]);

    return (
        <React.Fragment>
            <Header>
                <Toolbar onChangeSort={() => changeSort()} sort={sort} />
            </Header>
            <div className="App">
                <div className="listView">
                    {msgs.map((set, idx) => {
                        return <MessageBox
                            key={`messagechat-${idx}`}
                            deleted={(set.deleted ? true : false)}
                            deleteMsg={() => onDelete(set)}
                            user={set.senderUuid}
                            content={set.content}
                            date={set.sentAt}
                            />
                    })}
                
                   {hasMore && <div ref={setElement} style={{ height: "100px"}} className="inifitescroll"></div>} 
                   {!hasMore && <div className="emptyMessages">No more messages...</div>}    
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
