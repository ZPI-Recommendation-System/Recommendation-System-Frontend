import './forms.css';
import NextButton from './NextButton';
import { useSelector, useDispatch } from 'react-redux';
import {setSliderValue } from '../../store/slices/forms';
import React, {useEffect, useState} from 'react';

function Slider({ id, prompt, points, summary, startWithMax }) {
    const startValue = startWithMax ? 100 : 0;

    const value = useSelector(state=>state.forms[id]) ?? startValue;
    const dispatch = useDispatch();

    // set state value to start value if it's not set
    useEffect(() => {
        if(!value && value !== 0) {
          dispatch(setSliderValue([id, startValue]))
        }
    }, [dispatch, id])

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