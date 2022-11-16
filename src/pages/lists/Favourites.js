
import { useState, useEffect, } from 'react';
import Results from "./Results";
import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function Favourites() {
    const [selected, setSelected] = useState([])
    const selectedFromRedux = useSelector(state => state.favourites.list);

    let location = useLocation();

    useEffect(() => {
        setSelected(selectedFromRedux)
    }, [location,selectedFromRedux]) 

    return <Results query={"/laptops?limit=20&query=all,id,name,images&ids="+selected} />
}