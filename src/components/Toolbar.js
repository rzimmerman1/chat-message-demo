import React from 'react';

const ASC = '../../assets/asc.svg';
const DESC = '../../assets/desc.svg';

const Toolbar = ({ onChangeSort, sort }) => {
    const src = (sort === 'asc' ? ASC : DESC);
    return (
        <div className="toolbar">
            <button className="button toggleBtn" onClick={onChangeSort}>
                <img alt="sort toggle" className="sort" src={src} /> 
            </button>
        </div>
    );
}

export default Toolbar;
