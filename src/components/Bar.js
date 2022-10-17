import './Bar.css';
import _ from 'lodash';

function Bar({index, description}) {
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
            <span key={i}>
            {i}
            <span className="progress-bar-divider"></span>
            <span className="progress-bar-divider-space"></span>
            </span>
            )
            }
            {description}</p>
        </div>
    )
}

export default Bar;