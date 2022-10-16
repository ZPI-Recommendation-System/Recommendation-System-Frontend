import './selection.css';
import './Comparison.css';
import { useState } from 'react';

function LaptopIcon({ title, text, image }) {
    const [checked, setChecked] = useState(false);
  
    function onClick() {
      setChecked(!checked);
    }
  
    const className = "selection-laptop " + (checked ? 'checked' : '');
    return <div className={className} onClick={onClick}>
        <img src="laptop-photo.png" alt="laptop" />
        <p>Lenovo L</p>
    </div>;
  }

function Comparison() {
    return (
        <div className="content">
            <p className="text">
            Wybierz jeszcze jeden laptop aby otworzyć ekran porównania.
            </p>
            <div className="selection-container">
                {[1,1,1,1,1,1,1,1].map(el=>
                    <LaptopIcon />
                )}
            </div>
        </div>
    );
}

export default Comparison;
