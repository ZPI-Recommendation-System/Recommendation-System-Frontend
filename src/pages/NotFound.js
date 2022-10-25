import { Link } from "react-router-dom";

function NotFound() {
    return (<div className="content">
      <p className="text">
        Nie znaleziono strony
      </p>
      <Link to="/" className="skip-button" style={{textAlign: "left"}}>
        Strona główna
      </Link>
    </div>);
}

export default NotFound;
