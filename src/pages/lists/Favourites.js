
import { useState, useEffect, useRef } from 'react';
import Results from "./Results";
import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function Favourites() {
    const [selected, setSelected] = useState(null)
    const selectedFromRedux = useSelector(state => state.favourites.list);

    let location = useLocation();
    const lastLocation = useRef(null);

    useEffect(() => {
        if (location !== lastLocation.current) {
            setSelected(selectedFromRedux)
        }
        lastLocation.current = location;
    }, [location, selectedFromRedux])

    return <Results query={"/laptops?limit=20&query=all,id,name,images,processor,graphics&ids="+selected} />
}