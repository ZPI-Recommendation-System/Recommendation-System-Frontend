import './selection.css';
import './Comparison.css';
import _ from 'lodash';
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { select } from '../store/slices/selection';
import LaptopStar from '../components/LaptopStar';

function LaptopIcon({ id, title, text, image, checked, onClick }) {
    const className = "selection-laptop " + (checked ? 'checked' : '');
    return <div className={className} onClick={onClick}>
        <img src="laptop-photo.png" className="selection-laptop-image" alt="laptop" />
        <p>Lenovo L</p>
        <LaptopStar id={id} className="laptop-star" />
    </div>;
  }

function Selection() {
    const dispatch = useDispatch();
    const selected = useSelector(state=>state.selection.selected)
    const selectedCount = selected.length;
    let prompt = {
        0 : "Wybierz dwa laptopy aby zobaczyć ich detale i porównanie.",
        1 : "Naciśnij przycisk szczegóły aby zobaczyć detale wybranego laptopa lub dobierz jeszcze jeden dla porównania.",
        2 : "Naciśnij przycisk porównanie aby zobaczyć porównanie laptopów."
        }[selectedCount];

    return (
        <div className="content">
            <p className="text">
                {prompt}
            </p>
            <div className="selection-container">
                {_.range(8).map(key=>
                    <LaptopIcon
                    id={key}
                    checked={selected.includes(key)}
                    onClick = {()=> dispatch(select(key))}
                    key={key} />
                )}
            </div>
            {selectedCount>=1
                && <Link to="/comparison" className="skip-button">
                {selectedCount===1 ? "Szczegóły" : "Porównanie"}
              </Link>}
        </div>
    );
}

export default Selection;
