import { previousPage, nextPageLink } from "../pages/pages";   
import { useSelector, useDispatch } from 'react-redux';
import { setPage, lastPage, lastFormPage } from '../store/slices/history'; 
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Bar from '../components/Bar';


function Page({index, number, description, isForm, children}) {
    const dispatch = useDispatch();

    const lastPage_ = useSelector(lastPage);
    const lastFormPage_ = useSelector(lastFormPage);

    const previousPageBound = useCallback(
      ()=> previousPage(index, lastPage_, lastFormPage_),
      [index, lastPage_, lastFormPage_]);
      
    let location = useLocation();

      const navigate = useNavigate();


    useEffect(() => {
      function onKeyPress(event) {
        if (event.key==="ArrowLeft") navigate(previousPageBound().link)
        if (event.key==="ArrowRight") navigate(nextPageLink(location.pathname))
      }
      document.body.addEventListener("keydown", onKeyPress)
      // Remove the observer as soon as the component is unmounted
      return () => { document.body.removeEventListener("keydown", onKeyPress) }
    }, [location, navigate, previousPageBound])

    // start value is used when there's no page transition
    const [currentPreviousPage, setPreviousPage] = useState(previousPageBound())

    useEffect(() => {
      if (lastPage_!==index) {
        setPreviousPage(previousPageBound())
        dispatch(setPage([index, isForm]))
      }
    }, [location, dispatch, index, isForm, previousPageBound, lastPage_]);
    
    return <>
        <Bar 
            description={description} number={number} 
            previousPage={currentPreviousPage}
        />{children}
    </>
}

export default Page;
