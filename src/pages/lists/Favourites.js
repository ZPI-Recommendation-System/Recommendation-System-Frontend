
import { useState, useEffect, useRef } from 'react';
import Results from "./Results";
import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function Favourites() {
    // laptops that are unstared are not immediately removed from the list
    // to give the user a chance to undo the action
    // so favourite laptops are read from redux store only when the page is opened
    const [selected, setSelected] = useState(null)
    const favouritedFromRedux = useSelector(state => state.favourites.list);

    let location = useLocation();
    const lastLocation = useRef(null);

    useEffect(() => {
        if (location !== lastLocation.current) {
            setSelected(favouritedFromRedux)
        }
        lastLocation.current = location;
    }, [location, favouritedFromRedux])

    return <Results paging query={"/laptops?query=all,id,name,images,processor,graphics&ids="+selected+"&"} />
}