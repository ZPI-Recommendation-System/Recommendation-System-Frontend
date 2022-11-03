import './Bar.css';
import { Link } from "react-router-dom";

function Bar({number, description, previousPage}) {

    const dots = number > 2;
    const mapSymbol = dots ? "..." : "⁖";
    
    const previousLink = number > 1;

    return (  
      <div className="progress-bar">
        <p className="progress-bar-text">
                <Link to="/map" className="progress-bar-link">{mapSymbol}</Link>
                <span className="progress-bar-divider"></span>
                <span className="progress-bar-divider-space"></span>
            
            {previousLink && <><Link className="progress-bar-link" 
                to={previousPage?.link}>
                {previousPage?.number}</Link>
                <span className="progress-bar-divider"></span>
                <span className="progress-bar-divider-space"></span>
            </>}
            <span className="progress-bar-link">
                {number}</span>
                <span className="progress-bar-divider"></span>
                <span className="progress-bar-divider-space"></span>
            {description}</p>
        </div>
    )
}

export default Bar;