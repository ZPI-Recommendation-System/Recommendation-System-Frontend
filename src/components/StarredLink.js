import './StarredLink.css';
import { Link } from "react-router-dom";
import { favouritesCount } from '../store/slices/favourites';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

let previousCount = null;

function StarredLink() {
    const count = useSelector(favouritesCount);
    const [animate, setAnimate] = useState(false);

    useEffect(() => { 
        if (previousCount==null) {
            previousCount = count;
        } 
        if (count>previousCount) {
            setAnimate(true)
            setTimeout(() =>setAnimate(false), 0.35 * 1000)
        }
        previousCount = count;
    }, [count])
    
    const favsClass = animate ? "favs favs-pop" : "favs";

    return (<Link to="/favourites" 
    class={favsClass}
    style={{
        display: count > 0 ? 'initial' : 'none'
    }}>
        <img src="icons/icons8-star-32.png" className="favs-star" alt="star"></img>
        <span className="favs-count">{count}</span>
    </Link>)
}

export default StarredLink;