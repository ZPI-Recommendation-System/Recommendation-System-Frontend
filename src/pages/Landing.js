import { Link } from "react-router-dom";
import {firstFormPageLink} from "./pages"

function Landing() {
    const firstForm = firstFormPageLink;
    return (<div className="content">
      <p className="text">
        Witaj w systemie rekomendacyjnym dla laptopów.
        Wypełnij krótką ankietę aby uzyskać listę wybranych dla ciebie urządzeń.
      </p>
      <Link to={firstForm} className="navigation-button" >
        Wypełnij ankietę
      </Link>
      <hr />
      <p className="text">
        Możesz też wyszukać laptop po nazwie aby móc porównywać go do wybranych przez nas.
      </p>
      <Link to="/search" className="navigation-button">
        Wyszukaj po nazwie
      </Link>
      <br/>
    </div>);
}

export default Landing;
