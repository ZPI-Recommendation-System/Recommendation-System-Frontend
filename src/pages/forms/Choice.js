import './forms.css';
import { Link } from "react-router-dom";

export class Option {
  constructor(title, text, image) {
    this.title = title;
    this.text = text;
    this.image = image;
  }
}

export function Choice({options, multiple}) {
  return (<div className="content">
    {options.map(
      ({ title, text, image }) => (
        <div className="choice-button">
          <img className="choice-image" alt={title} src={image}></img>
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
