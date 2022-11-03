import './StarredLink.css';
import { Link } from "react-router-dom";
import { favouritesCount } from '../store/slices/favourites';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function StarredLink() {
    const count = useSelector(favouritesCount);
    const [animate, setAnimate] = useState(false);
    const [previousCount, setPreviousCount] = useState(null);

    useEffect(() => {
        if (previousCount!==null && count>previousCount) {
            setAnimate(true)
            // timeout is short and must be invoked 
            // so it's not removed in cleanup
            setTimeout(() =>setAnimate(false), 0.35 * 1000)
        }
        setPreviousCount(count);
    }, [count, previousCount])

    useEffect(() => {
        
    })
    
    const favsClass = animate ? "favs favs-pop" : "favs";

    return (<Link to="/favourites" 
    className={favsClass}
    style={{
        display: count > 0 ? 'initial' : 'none'
    }}>
        <img src="icons/icons8-star-32.png" className="favs-star" alt="star"></img>
        <span className="favs-count">{count}</span>
    </Link>)
}

export default StarredLink;