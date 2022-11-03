import { Link } from "react-router-dom";
import { pages } from './pages';

function Map() {
    return (<div className="content">
      {pages.map(({id, description}, index)=>
            <Link className="navigation-button" to={"/"+id} >{index+1}. {description}</Link>)
        }
    </div>);
}

export default Map;
