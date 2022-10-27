import { Link } from "react-router-dom";

function NotFound() {
    return (<div className="content">
      <p className="text">
        Nie znaleziono strony
      </p>
      <Link to="/" className="navigation-button">
        Strona główna
      </Link>
    </div>);
}

export default NotFound;
