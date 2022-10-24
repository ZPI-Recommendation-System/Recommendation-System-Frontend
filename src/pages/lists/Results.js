import Selection, { makeLaptop } from "./Selection";
import _ from 'lodash';
import { getLaptopIds, getLaptop } from '../../api';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function formDataToRequest(data) {
    const result = {...data}
    result["usage"] = Object.entries(result["usage"]).find(e=>e[1])[0]
    // remove object modifiers 
    result["size"] = {...result["size"]}
    delete result["size"]["Kartka A4"]
    return result
}

function Results() {
    const forms = useSelector(state=>state.forms);

    useEffect(() => {
        console.log("Sending form data", formDataToRequest(forms))
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