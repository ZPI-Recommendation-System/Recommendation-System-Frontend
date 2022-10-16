import './forms.css';
import NextButton from './NextButton';

function Slider({ prompt, points, summary }) {
    return (<div className="content">
        <p className="text">
            {prompt}
        </p>
        <input type="range"
            min="0"
            max="100"
            className="slider" id="myRange" />
        <ul className="slider-points text">
            {points.map(p => <li>{p}</li>)}
        </ul>

        {summary()}

        <NextButton />
    </div>);
}

export default Slider;