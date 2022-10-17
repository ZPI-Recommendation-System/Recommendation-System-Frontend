import './forms.css';
import NextButton from './NextButton';
import { useSelector, useDispatch } from 'react-redux';
import {setSliderValue } from '../../store/slices/forms';

function Slider({ id, prompt, points, summary }) {
    const value = useSelector(state=>state.forms[id]);
    const dispatch = useDispatch();

    return (<div className="content">
        <p className="text">
            {prompt}
        </p>
        <input type="range"
            min="0"
            max="100"
            className="slider" id="myRange"
            value={value}
            onChange={e => dispatch(setSliderValue([id, Number(e.target.value)]))}
            />
        <ul className="slider-points text">
            {points.map(p => <li  key={p}>{p}</li>)}
        </ul>

        {summary()}

        <NextButton />
    </div>);
}

export default Slider;