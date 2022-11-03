import './Bar.css';
import { Link } from "react-router-dom";  
import { currentPage, previousPage } from "../pages/pages";   
import { useSelector, useDispatch } from 'react-redux';
import { setPage, lastPage, lastFormPage } from '../store/slices/history'; 
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Bar({index, number, description}) {

    const dispatch = useDispatch();

    const [back, setBack] = useState(null)
    
    const lastPage_ = useSelector(lastPage);
    const lastFormPage_ = useSelector(lastFormPage);

    const dots = number > 2;
    const previousLink = number > 1;

    const mapSymbol = dots ? "..." : "⁖";

    let previousPage_ = back;
    const currentPage_ = currentPage(index);
    const isForm = currentPage_.isForm;

    let location = useLocation();

    useEffect(() => {
      if (lastPage_!==index) {
        setBack(previousPage(index, lastPage_, lastFormPage_))
        dispatch(setPage([index, isForm]))
      }
    }, [location, dispatch, index, isForm, lastFormPage_, lastPage_]);

    return (  
      <div className="progress-bar">
        <p className="progress-bar-text">
                <Link to="/map" className="progress-bar-link">{mapSymbol}</Link>
                <span className="progress-bar-divider"></span>
                <span className="progress-bar-divider-space"></span>
            
            {previousLink && <><Link className="progress-bar-link" 
                to={previousPage_?.link}>
                {previousPage_?.number}</Link>
                <span className="progress-bar-divider"></span>
                <span className="progress-bar-divider-space"></span>
            </>}
            <span className="progress-bar-link">
                {number}</span>
                <span className="progress-bar-divider"></span>
                <span className="progress-bar-divider-space"></span>
            {description}</p>
        </div>
    )
}

export default Bar;