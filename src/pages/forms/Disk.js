import './forms.css';
import NextButton from './NextButton';

const points = [
"100 GB",
"500 GB",
"1 TB",
"2 TB"
];

const prompt = "Wybierz minimalny rozmiar wbudowanego dysku";
const summary = value => (
    <p className="text">
        Na twoim dysku zmieści się co najmniej:
        <ul>
        <li>Windows 11</li>
        <li>10 gier / aplikacji</li>
        <li>100 zdjęć / obrazów</li>
        </ul>
    </p>
);

function Disk() {
  return (<div className="content">
    <p className="text">
    {prompt}
    </p>
    <input type="range" 
    min="0" 
    max="100"
    className="slider" id="myRange" />
    <ul className="slider-points text">
        {points.map(p=><li>{p}</li>)}
    </ul>
    
    {summary()}
    
    <NextButton />
  </div>);
}

export default Disk;
