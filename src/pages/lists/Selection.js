import 'react-dropdown/style.css';
import './Selection.css';
import { Link } from "react-router-dom";
import { Laptop } from "../../api/api";

import { useSelector, useDispatch } from 'react-redux';
import { select } from '../../store/slices/selection';
import { show, hide } from '../../store/slices/dialog';
import LaptopStar from '../../components/LaptopStar';
import Dropdown from 'react-dropdown';
import { useRef } from 'react';

function HoverDialog({ content, children }) {
    const dispatch = useDispatch();

    const container = useRef(null);

    function showDialog() {
        const containerCurrent = container.current;
        const rect = containerCurrent.getBoundingClientRect()
        dispatch(show({ text: content, x: rect.x, y: rect.y }))
    }

    return <div
        style={{padding: 0, margin: 0, border: 0}}
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

function Selection({ main, extra }) {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.selection.selected)
    const selectedCount = selected.length;
    let prompt = {
        0: "Wybierz dwa laptopy aby zobaczyć ich detale i porównanie lub naciśnij gwiazdkę aby zapisać laptop.",
        1: "Naciśnij przycisk szczegóły aby zobaczyć detale wybranego laptopa lub dobierz jeszcze jeden dla porównania.",
        2: "Naciśnij przycisk porównanie aby zobaczyć porównanie laptopów."
    }[selectedCount];

    function makeIcon(laptop) {
        return <LaptopIcon
            {...laptop}
            checked={selected.includes(laptop.id)}
            onClick={() => dispatch(select(laptop.id))}
        />
    }

    return (<>
        <p className="text selection-prompt">
            {prompt}
        </p>
        <div className="selection-container">
            <div></div>

            <Dropdown options={[
                { value: "fitness", label: 'Dopasowanie' },
                { value: "popularity", label: 'Popularność' },
                { value: "price", label: 'Cena' },
                { value: "name", label: 'Nazwa' }
            ]}
                value={"fitness"} placeholder="Sortowanie" />
            {main.length > 0 &&
                <>
                    <div className="selection-section">
                        {main.map(makeIcon)}
                    </div></>
            }
            {extra &&
                <><div className="extras-divider"></div>
                    <p className="extras-text">Te laptopy nie spełniają wszystkich twoich wymagań: </p>
                    <div className="selection-section">
                        {extra.map(makeIcon)}
                    </div></>}
        </div>
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