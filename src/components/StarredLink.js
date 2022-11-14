import './StarredLink.css';
import { Link } from "react-router-dom";
import { favouritesCount } from '../store/slices/favourites';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

function StarredLink() {
    const count = useSelector(favouritesCount);
    const previousCount = useRef(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (previousCount.current!==null && count>previousCount.current) {
            setAnimate(true)
            // timeout is short and must be invoked 
            // so it's not removed in cleanup
            // time is copied from animation time
            setTimeout(() =>setAnimate(false), 0.35 * 1000)
        }
        previousCount.current = count
    }, [count])
    
    const favsClass = animate ? "favs favs-pop" : "favs";

    return (<Link to="/favourites" 
    className={favsClass}
    style={{
        display: count > 0 ? 'initial' : 'none'
    }}>
        <img src="/icons/icons8-star-32.png" className="favs-star" alt="star"></img>
        <span className="favs-count">{count}</span>
    </Link>)
}

export default StarredLink;