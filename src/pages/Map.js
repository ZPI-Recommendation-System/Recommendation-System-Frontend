import './Map.css';
import { Link } from "react-router-dom";
import { pages } from './pages';

import { useSelector } from 'react-redux';
import { lastFormPage } from '../store/slices/history';

function Map() {
    const lastFormPage_ = useSelector(lastFormPage);

    return (<div className="content">
        <div className="map-links-container">
            {pages.filter(page => page.isForm || page.link === "/results").map(({ number, link, description }, index) =>
                <div className='map-link' key={index}>
                    <div className={index > lastFormPage_ ? "map-circle" : "map-circle map-circle-filled"}></div>
                    <Link className="navigation-button" style={{ display: "inline-block" }} to={link} >
                        {number}. {description}
                    </Link>
                </div>)
            }
        </div>
    </div>);
}

export default Map;
