import './forms.css';
import NextButton from './NextButton';
import { useState } from 'react';

export class Option {
  constructor(title, text, image) {
    this.title = title;
    this.text = text;
    this.image = image;
  }
}

function ChoiceBox({ title, text, image }) {
  const [checked, setChecked] = useState(false);

  function onClick() {
    setChecked(!checked);
  }

  const className = "choice-button " + (checked ? 'checked' : '');
  return <div className={className} 
  onClick={onClick}>
    <img className="choice-image" alt={title} src={image}></img>
    <p className="choice-text">
      {title}<br />{text}
    </p>
  </div>;
}

export function Choice({ options, extraText, multiple }) {
  return (<div className="content">
    {options.map(
      option => <ChoiceBox  key={option.title} {...option} />)}
    <p className="choice-text">
      {extraText}
    </p>
    <NextButton />
  </div>);
}
