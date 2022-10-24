import { Link } from "react-router-dom";
import { forms } from './forms/forms';

function Landing() {
    const firstForm = "/"+forms[0].id;
    return (<div className="content">
      <p className="text">
        Witaj w systemie rekomendacyjnym dla laptopów.
        Wypełnij krótką ankietę aby uzyskać listę wybranych dla ciebie urządzeń.
      </p>
      <Link to={firstForm} className="skip-button" style={{textAlign: "left"}}    >
        Wypełnij ankietę
      </Link>
      <hr />
      <p className="text" style={{width: "70%"}}>
        Możesz też wyszukać laptop po nazwie aby móc porównywać go do wybranych przez nas.
      </p>
      <Link to="/search" className="skip-button" style={{textAlign: "left"}}>
        Wyszukaj po nazwie
      </Link>
    </div>);
}

export default Landing;
