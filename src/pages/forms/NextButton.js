import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { nextPageLink } from '../pages';

function NextButton() {
    const location = useLocation();
    const locationWithoutSlash = location.pathname.substring(1);
    const nextFormLink = "/"+nextPageLink(locationWithoutSlash);

    return (<Link to={nextFormLink} className="navigation-button navigation-button-right">
      Dalej
    </Link>);
}

export default NextButton;