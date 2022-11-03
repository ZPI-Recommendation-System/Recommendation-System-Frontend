import { previousPage } from "../pages/pages";   
import { useSelector, useDispatch } from 'react-redux';
import { setPage, lastPage, lastFormPage } from '../store/slices/history'; 
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import Bar from '../components/Bar';

function Page({index, number, description, isForm, children}) {
    const dispatch = useDispatch();

    const lastPage_ = useSelector(lastPage);
    const lastFormPage_ = useSelector(lastFormPage);

    const previousPageBound = useCallback(
      ()=> previousPage(index, lastPage_, lastFormPage_),
      [index, lastPage_, lastFormPage_]);

    // start value is used when there's no page transition
    const [currentPreviousPage, setPreviousPage] = useState(previousPageBound())

    let location = useLocation();

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
