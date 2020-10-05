import React, { Children, useEffect, useRef, useState } from 'react';

const Header = (props) => {
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const handleScroll = () => {
            if (ref.current) {
                setSticky(ref.current.getBoundingClientRect().top <= 0);
            }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    return (
        <React.Fragment>
            <div className={`${isSticky ? ' sticky' : ''}`} ref={ref}>
                <div className="header">
                    {props.children}
                </div>
            </div>
        </React.Fragment>
        
    )
};

export default Header;
