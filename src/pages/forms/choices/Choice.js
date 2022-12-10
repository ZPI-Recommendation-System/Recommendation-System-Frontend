import './Choice.css';
import NextButton from '../NextButton';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {createToggles, toggleChoice, untoggleChoices } from '../../../store/slices/forms';

export class Option {
  constructor(title, text, image) {
    this.title = title;
    this.text = text;
    this.image = image;
  }
}

function ChoiceBox({ title, text, image, checked, onClick }) {
  const className = "choice-button " + (checked ? 'checked' : '');
  return <div className={className} 
    onClick={onClick}>
    <div className='choice-image-container'>
      <img className="choice-image" alt={title} src={image} />
    </div> 
    <p className="choice-text">
      {title}<br />{text}
    </p>
  </div>;
}

export function Choice({ id, options, extraText, multiple=true }) {
  const value = useSelector(state=>state.forms[id]);
  const dispatch = useDispatch();

  // create object in state holding checkbox values
  useEffect(() => {
    if(!value) {
      dispatch(createToggles([id, options.map(o=>o.title)]))
    }
  }, [dispatch, id, options, value])

  function onToggle(option) {
    if (!multiple) {
      dispatch(untoggleChoices(id))
    }
    dispatch(toggleChoice([id, option]))
  }

  return (<div className="content">
    {options.map(
      option => <ChoiceBox 
      checked = {value && value[option.title]}
      onClick = {()=>onToggle(option.title)}
      key={option.title} {...option} />)}
    <p className="choice-text">
      {extraText}
    </p>
    <NextButton />
  </div>);
}
