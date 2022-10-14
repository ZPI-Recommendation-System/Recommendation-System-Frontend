import './forms.css';
import { Link } from "react-router-dom";

function ScreenExtras() {
    return (<div className="content">
      <div className="choice-button">
        <img className="choice-image" src="icons8-touchscreen-64.png"></img>
        <p className="choice-text">
          Ekran dotykowy pozwala wybierać elementy na ekranie naciskając na nie palcem, niestety ekran łatwo jest ubrudzić.
        </p>
      </div>
      <Link to="/comparison" className="skip-button">
        Pomiń
      </Link>
    </div>);
}

export default ScreenExtras;
