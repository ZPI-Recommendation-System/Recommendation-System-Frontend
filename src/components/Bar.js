import './Bar.css';
import _ from 'lodash';
import { useNavigate } from "react-router-dom";    

function Bar({id, index, description}) {
    const navigate = useNavigate();

    const shown = 3;
    const dots = index > shown;
    let lastShown = Math.max(index - (shown - 1), 1);
    if (dots) {
        lastShown++;
    }
    const previousNumbers = _.range(lastShown, index+1);

    function link(i) {
        const back = - (index - i);
        return <><span className="progress-bar-link" test={index - i} 
        onClick={() => back<0 && navigate(back)} key={i}>
        {i}</span>
        <span className="progress-bar-divider"></span>
        <span className="progress-bar-divider-space"></span>
        </>;
    }

    return (  
      <div className="progress-bar">
        <p className="progress-bar-text">
            {dots && (
            <>...
                <span className="progress-bar-divider"></span>
                <span className="progress-bar-divider-space"></span>
            </>)}
            {previousNumbers.map(link)}
            {description}</p>
        </div>
    )
}

export default Bar;