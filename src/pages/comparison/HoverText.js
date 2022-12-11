import './HoverText.css';

export function HoverText({ children, text }) {
  return <div className="tooltip">
    {children}
    {text && <span className="tooltiptext">{text}</span>}
  </div>;
}