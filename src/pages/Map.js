import { Link } from "react-router-dom";
import { forms } from './forms/forms';

function Map() {
    return (<div className="content">
      {forms.map(({id, description}, index)=>
            <Link className="navigation-button" to={"/"+id} >{index+1}. {description}</Link>)
        }
    </div>);
}

export default Map;
