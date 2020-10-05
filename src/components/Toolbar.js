import React from 'react';

const Toolbar = ({ onChangeSort, sort }) => {
    return (
        <div className="toolbar">
            <button className="button toggleBtn" onClick={onChangeSort}>
                <img alt="sort toggle" className={`sort ${sort}`} src="../../assets/ascending-sort.svg" /> 
            </button>
        </div>
    );
}

export default Toolbar;
