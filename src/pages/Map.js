import { Link } from "react-router-dom";
import { pages } from './pages';

function Map() {
    return (<div className="content">
      {pages.filter(page=>page.isForm).map(({number, link, description}, index)=>
            <Link className="navigation-button" to={"/"+link} >{number}. {description}</Link>)
        }
    </div>);
}

export default Map;
