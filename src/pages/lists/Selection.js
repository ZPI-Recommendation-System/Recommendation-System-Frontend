import './selection.css';
import { Link } from "react-router-dom";
import { Laptop } from "../../api";

import { useSelector, useDispatch } from 'react-redux';
import { select } from '../../store/slices/selection';
import LaptopStar from '../../components/LaptopStar';

function LaptopIcon({ id, name, image, checked, onClick }) {
    const className = "selection-laptop " + (checked ? 'checked' : '');
    return <div className={className} onClick={onClick}>
        <LaptopStar id={id} className="laptop-star" />
        <img src={image} className="selection-laptop-image" alt="laptop" />
        <p>{name}</p>
    </div>;
}

function Selection({main, extra}) {
    const dispatch = useDispatch();
    const selected = useSelector(state=>state.selection.selected)
    const selectedCount = selected.length;
    let prompt = {
        0 : "Wybierz dwa laptopy aby zobaczyć ich detale i porównanie lub naciśnij gwiazdkę aby zapisać laptop.",
        1 : "Naciśnij przycisk szczegóły aby zobaczyć detale wybranego laptopa lub dobierz jeszcze jeden dla porównania.",
        2 : "Naciśnij przycisk porównanie aby zobaczyć porównanie laptopów."
        }[selectedCount];

    function makeIcon(laptop) {
        return <LaptopIcon
            id={laptop.id}
            key={laptop.id}
            name={laptop.name}
            image={laptop.image}
            checked={selected.includes(laptop.id)}
            onClick = {()=> dispatch(select(laptop.id)) }
        />
    }

    return (<>
            <p className="text selection-prompt">
                {prompt}
            </p>
            <div className="selection-container">
            <div className="selection-section">
                {main.map(makeIcon)}
            </div>
            <hr></hr>
            <p className="choice-text">Te laptopy nie pasują dokładnie do zapytania ale nadal są warte zobaczenia:</p>
            <div className="selection-section">
                {extra.map(makeIcon)}
            </div>
            </div>
            {selectedCount>=1
                && <Link to="/comparison" className="skip-button">
                {selectedCount===1 ? "Szczegóły" : "Porównanie"}
              </Link>}
              </>);
}

export function makeLaptop(index) {
    return new Laptop(index, `HP ${index}`, "laptop-photo.png");
}

export default Selection;