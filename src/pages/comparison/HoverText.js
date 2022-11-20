import './HoverText.css';

export default function HoverText({ children, text }) {
  return <div class="tooltip">
    {children}
    {text && <span class="tooltiptext">{text}</span>}
  </div>;
}