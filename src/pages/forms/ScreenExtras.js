import './forms.css';
import { Link } from "react-router-dom";

class Option {
  constructor(title, text, image) {
    this.title = title;
    this.text = text;
    this.image = image;
  }
}

const options = [
  new Option(
    "Ekran dotykowy",
    "pozwala wybierać elementy na ekranie naciskając na nie palcem, niestety ekran łatwo jest ubrudzić.",
    "icons8-touchscreen-64.png"),
  new Option(
    "HDMI",
    "jest najczęściej spotykanym złączem wideo, pozwoli ci się połączyć z większością monitorów, telewizorów i rzutników.",
    "icons8-hdmi-24.png"),
  new Option(
    "Inne złącza wideo",
    "np. micro HDMI, czesto pojawiają się w starszych lub ultra cienkich laptopach. Po dokupieniu kabla lub przejściówki będą mogły być używane tak samo jak HDMI.",
    "icons8-hdmi-64.png")
]

function ScreenExtras() {
  return (<div className="content">
    {options.map(
      ({ title, text, image }) => (
        <div className="choice-button">
          <img className="choice-image" src={image}></img>
          <p className="choice-text">
            {title}<br />{text}
          </p>
        </div>)
    )}
    <Link to="/comparison" className="skip-button">
      Pomiń
    </Link>
  </div>);
}

class Form {
  constructor(id, description, element) {
    this.id = id;
    this.description = description;
    this.element = element;
  }
}

const forms = [
  new Form("screen-extras", "Dodatki do ekranu", <ScreenExtras
    options={[
      new Option(
        "Ekran dotykowy",
        "pozwala wybierać elementy na ekranie naciskając na nie palcem, niestety ekran łatwo jest ubrudzić.",
        "icons8-touchscreen-64.png"),
      new Option(
        "HDMI",
        "jest najczęściej spotykanym złączem wideo, pozwoli ci się połączyć z większością monitorów, telewizorów i rzutników.",
        "icons8-hdmi-24.png"),
      new Option(
        "Inne złącza wideo",
        "np. micro HDMI, czesto pojawiają się w starszych lub ultra cienkich laptopach. Po dokupieniu kabla lub przejściówki będą mogły być używane tak samo jak HDMI.",
        "icons8-hdmi-64.png")
    ]} />)
]

export default ScreenExtras;
