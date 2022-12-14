import './Slider.css';
import NextButton from '../NextButton';
import { useSelector, useDispatch } from 'react-redux';
import {setSliderValue } from '../../../store/slices/forms';
import React, {useEffect, useState} from 'react';

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

    
    const [summaryText, setSummaryText] = useState(null);

    useEffect(()=>{
        function updateSummary() {
            console.log("Asking for summary on slider value")
            const valueOrPromise = summary(mixPoints(points, value))
            Promise.resolve(valueOrPromise).then(setSummaryText)
        }

        // first update summary without any timeout
        if (summaryText==null) {
            updateSummary()
        } else {
            const delayDebounceFn = setTimeout(updateSummary, 500)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [setSummaryText, summaryText, points, summary, value])


    const min = 0
    const max = 100
    const green = "#6FD760AA";
    const gray = "#DEE2E6";
    const leftColor = startWithMax ? green : gray;
    const rightColor = startWithMax ? gray : green;
    const sliderBackground = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${(value-min)/(max-min)*100}%, ${rightColor} ${(value-min)/(max-min)*100}%, ${rightColor} 100%)`;

    return (<div className="content">
        <p className="text">
            {prompt}
        </p>
        <input type="range"
            min="0"
            max="100"
            className="slider" id="myRange"
            value={value}
            style={{
                background: sliderBackground
            }}
            onChange={e => { 
                dispatch(setSliderValue([id, Number(e.target.value)]))
                dispatch(setSliderValue([inUnitsId, Number(mixPoints(points, e.target.value))]))
            }}
            />
        <ul className="slider-points text">
            {points.map(p => <li key={p[0]}>{p[0]}</li>)}
        </ul>

        {summaryText}

        <NextButton />
    </div>);
}


export default Slider;