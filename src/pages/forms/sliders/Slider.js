import './Slider.css';
import NextButton from '../NextButton';
import { useSelector, useDispatch } from 'react-redux';
import {setSliderValue } from '../../../store/slices/forms';
import React, {useEffect} from 'react';

function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}

function mixPoints(points, value) {
    const position = (value / 100) * (points.length - 1);
    const leftPoint = Math.floor(position);
    const toLeftPoint = Math.abs(position - leftPoint);
    const rightPoint = Math.ceil(position);
    const toRightPoint = Math.abs(position - rightPoint);
    const distancesSum = Math.max(toLeftPoint + toRightPoint, Number.EPSILON);

    return lerp(points[leftPoint][1], points[rightPoint][1], toLeftPoint / distancesSum);
}

function Slider({ id, prompt, points, summary, startWithMax }) {
    const startValue = startWithMax ? 100 : 0;
    const inUnitsId = id + " in units";

    const value = useSelector(state=>state.forms[id]) ?? startValue;
    const dispatch = useDispatch();

    // set state value to start value if it's not set
    useEffect(() => {
        if(!value && value !== 0) {
          dispatch(setSliderValue([id, startValue]))
          dispatch(setSliderValue([inUnitsId, startValue]))
        }
    }, [dispatch, id, inUnitsId, startValue, value])

    return (<div className="content">
        <p className="text">
            {prompt}
        </p>
        <input type="range"
            min="0"
            max="100"
            className="slider" id="myRange"
            value={value}
            onChange={e => { 
                dispatch(setSliderValue([id, Number(e.target.value)]))
                dispatch(setSliderValue([inUnitsId, Number(mixPoints(points, e.target.value))]))
            }}
            />
        <ul className="slider-points text">
            {points.map(p => <li key={p[0]}>{p[0]}</li>)}
        </ul>

        {summary(mixPoints(points, value))}

        <NextButton />
    </div>);
}

export default Slider;