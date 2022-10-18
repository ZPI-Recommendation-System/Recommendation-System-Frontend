import './Bar.css';
import _ from 'lodash';
import { previousFormId } from '../pages/forms/forms';
import { Link } from "react-router-dom";    

function Bar({id, index, description}) {
    const shown = 3;
    const dots = index > shown;
    let lastShown = Math.max(index - (shown - 1), 1);
    if (dots) {
        lastShown++;
    }
    console.log(lastShown);
    const previousNumbers = _.range(lastShown, index+1);
    console.log(previousNumbers);

    return (  
      <div className="progress-bar">
        <p className="progress-bar-text">
            
            {dots && (<>...
            <span className="progress-bar-divider"></span>
            <span className="progress-bar-divider-space"></span>
            </>)}

            {previousNumbers.map(i=>
            <Link className="progress-bar-link" to={"/"+previousFormId(id, index - i)} key={i}>
            {i}
            <span className="progress-bar-divider"></span>
            <span className="progress-bar-divider-space"></span>
            </Link>
            )
            }
            {description}</p>
        </div>
    )
}

export default Bar;