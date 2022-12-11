import 'react-dropdown/style.css';
import './Selection.css';
import { Link } from "react-router-dom";
import { Laptop } from "../../api/api";

import { useSelector, useDispatch } from 'react-redux';
import { select, setSelected } from '../../store/slices/selection';
import { show, hide } from '../../store/slices/dialog';
import LaptopStar from '../../components/LaptopStar';
import Dropdown from 'react-dropdown';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function HoverDialog({ content, children }) {
    const dispatch = useDispatch();

    const container = useRef(null);

    function showDialog() {
        const containerCurrent = container.current;
        const rect = containerCurrent.getBoundingClientRect()
        dispatch(show({ text: content, x: rect.x, y: rect.y }))
    }

    return <div
        style={{ padding: 0, margin: 0, border: 0 }}
        ref={container}
        onMouseEnter={showDialog}
        onMouseLeave={() => dispatch(hide())}
    >{children}</div>;
}

function LaptopIcon({ id, name, fullName, image, checked, onClick, cpuBenchmark, gpuBenchmark }) {
    let dialogContent = fullName;
    if (cpuBenchmark && gpuBenchmark) {
        dialogContent += `<hr/>CPU: <b>${cpuBenchmark} pkt</b><br/>GPU: <b>${gpuBenchmark} pkt</b>`;
    }

    const className = "selection-laptop " + (checked ? 'checked' : '');

    return <div className={className} onClick={onClick}><HoverDialog
        content={dialogContent}
    >
        <LaptopStar id={id} className="laptop-star" />
        <img src={image} className="selection-laptop-image" alt="laptop" />
        <p>{name}</p>
    </HoverDialog>
    </div>;
}

function Selection({ main, extra, setSorting, allowSorting, loadMore }) {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.selection.selected)
    const selectedCount = useSelector(state => state.selection.selected.length)

    let location = useLocation();
    const lastLocation = useRef(null);

    useEffect(() => {
        if (location !== lastLocation.current) {
            const selectedAndVisible = selected.filter(id => main.find(laptop => laptop.id === id) || 
            (extra && extra.find(laptop => laptop.id === id)) )
            if (selectedAndVisible.length !== selected.length) {
                dispatch(setSelected(selectedAndVisible))
            }
        }
    }, [location, main, extra, selected, dispatch, lastLocation])
    
    let prompt = {
        0: "Wybierz dwa laptopy aby zobaczyć ich detale i porównanie lub naciśnij gwiazdkę aby zapisać laptop.",
        1: "Naciśnij przycisk szczegóły lub dobierz jeszcze jeden laptop dla porównania.",
        2: "Naciśnij przycisk porównanie aby zobaczyć porównanie laptopów."
    }[selectedCount];

    function makeIcon(laptop) {
        return <LaptopIcon
            key={laptop.id}
            {...laptop}
            checked={selected.includes(laptop.id)}
            onClick={() => dispatch(select(laptop.id))}
        />
    }

    const hasItems = (main && main.length > 0) || (extra && extra.length > 0)

    return (<>
        <p className="text selection-prompt">
            {prompt}
        </p>
        <div className="selection-container">
            <div></div>
            {main.length > 0 &&
                <>
                    {allowSorting && <Dropdown options={[
                        { value: "&sortType=score&direction=DESC", label: 'Dopasowanie' },
                        { value: "&sortType=popularity&direction=DESC", label: 'Popularność' },
                        { value: "&sortType=price&direction=ASC", label: 'Cena' },
                        { value: "&sortType=alphabetic&direction=ASC", label: 'Nazwa ABC' },
                        { value: "&sortType=alphabetic&direction=DESC", label: 'Nazwa ZYX' },
                    ]}
                        onChange={setSorting}
                        value={"&sortType=score&direction=DESC"} placeholder="Sortowanie" />}


                    <div className="selection-section">
                        {main.map(makeIcon)}
                    </div></>
            }
            {extra && extra.length > 0 &&
                <><div className="extras-divider"></div>
                    <p className="extras-text">Te laptopy nie spełniają wszystkich twoich wymagań: </p>
                    <div className="selection-section">
                        {extra.map(makeIcon)}
                    </div></>}
            {!hasItems
                && <p className='text' style={{ textAlign: "center", lineHeight: "7rem", opacity: 0.5 }}>
                        Brak wyników
                    </p>}
            {hasItems && loadMore && 
                <p
                    onClick={loadMore}
                    className="navigation-button" 
                    style={{ fontSize: "1.2rem", textAlign: "center", 
                    lineHeight: "1rem",
                    cursor: "pointer", }}>
                    Więcej
                </p>
            }
        </div>
        {selectedCount === 0
            && <Link  className="navigation-button navigation-button-right" 
            style={{opacity: 0, cursor:"default"}}>_</Link>
        }
        {selectedCount === 1
            && <Link to={"/details/" + selected[0]} className="navigation-button navigation-button-right">
                Szczegóły
            </Link>}
        {selectedCount === 2
            && <Link to={"/comparison/" + selected[0] + "/" + selected[1]} className="navigation-button navigation-button-right">
                Porównanie
            </Link>}
    </>);
}

export function makeLaptop(index) {
    return new Laptop(index, `HP ${index}`, "photos/laptop-photo.png");
}

export default Selection;