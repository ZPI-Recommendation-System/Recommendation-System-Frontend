import './HoverText.css';
import { useSelector } from 'react-redux';
import {useRef} from 'react';

export function HoverText({ children, text }) {
  return <div className="tooltip">
    {children}
    {text && <span className="tooltiptext">{text}</span>}
  </div>;
}

export function Dialog() {
  // use dialogReducer to set the text and x,y
  const { text, x, y, visible } = useSelector(state => state.dialog);
  const container = useRef(null);
  const  rect =container.current?.getBoundingClientRect();
  const height = rect?.height ?? 0;
  const yOffset = -39;
  const xOffset = 10;
  return <>
    {text && <span ref={container} className={visible ? "dialog open" : "dialog"} 
    style={{
      left:x+xOffset+window.screenX, 
      top:y-height+yOffset+window.scrollY}}
    dangerouslySetInnerHTML={{__html: text ?? ""}}>
      </span>}
  </>;
}