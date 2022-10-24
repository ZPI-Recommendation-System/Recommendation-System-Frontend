import './Starred.css';
import { Link } from "react-router-dom";
import { favouritesCount } from '../store/slices/favourites';
import { useSelector } from 'react-redux';

function Starred() {
    const count = useSelector(favouritesCount);

    return (<Link to="/favourites" 
    style={{
        display: count > 0 ? 'initial' : 'none'
    }}>
        <img src="icons/icons8-star-32.png" className="favs-star" alt="star"></img>
        <span className="favs-count">{count}</span>
    </Link>)
}

export default Starred;