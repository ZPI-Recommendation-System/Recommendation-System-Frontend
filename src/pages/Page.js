import { currentPage, previousPage } from "../pages/pages";   
import { useSelector, useDispatch } from 'react-redux';
import { setPage, lastPage, lastFormPage } from '../store/slices/history'; 
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import Bar from '../components/Bar';

function Page({index, number, description, children}) {
    const dispatch = useDispatch();

    const [back, setBack] = useState(null)
    
    const lastPage_ = useSelector(lastPage);
    const lastFormPage_ = useSelector(lastFormPage);

    const previousPageBound = useCallback(
      ()=> previousPage(index, lastPage_, lastFormPage_),
      [index, lastPage_, lastFormPage_]);
    
    let previousPage_ = back ?? previousPageBound();
    const currentPage_ = currentPage(index);
    const isForm = currentPage_.isForm;

    let location = useLocation();

    useEffect(() => {
      if (lastPage_!==index) {
        setBack(previousPageBound())
        dispatch(setPage([index, isForm]))
      }
    }, [location, dispatch, index, isForm, previousPageBound, lastPage_]);

    return <>
        <Bar 
            description={description} number={number} 
            previousPage={previousPage_}
        />{children}
    </>
}

export default Page;
