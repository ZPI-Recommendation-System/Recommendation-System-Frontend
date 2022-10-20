import Selection, { makeLaptop } from "./Selection";
import _ from 'lodash';
import { getLaptopIds, getLaptop } from '../../api';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Results() {
    const forms = useSelector(state=>state.forms);

    useEffect(() => {
        console.log("Sending form data", forms)
      }, [forms])

    return (
        <div className="content">
            <Selection
             main={getLaptopIds({}).map(getLaptop)}
             extra={_.range(8, 16).map(makeLaptop)}
             />
        </div>
    );
}

export default Results;