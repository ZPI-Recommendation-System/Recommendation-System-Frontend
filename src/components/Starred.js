import './Starred.css';
import { Link } from "react-router-dom";

function Starred() {
    return (<Link to="/select">
        <img src="icons8-star-32.png" className="favs-star" alt="star"></img>
        <span className="favs-count">3</span>
    </Link>)
}

export default Starred;