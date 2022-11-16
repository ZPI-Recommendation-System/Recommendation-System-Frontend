import Results from "./Results";

import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function formDataToRequest(data) {
    const result = {...data}
    if ("usage" in result) {
        const checked = Object.entries(result["usage"]).find(e=>e[1]);
        if (checked) {
            result["usage"] = checked[0];
        }
    }
    if ("size" in result){
        // remove object modifiers from redux
        result["size"] = {...result["size"]}
        delete result["size"]["Kartka A4"]
    }
    return result
}


export default function FormResults() {
    const forms = useSelector(state=>state.forms);
    
    useEffect(() => {
        console.log("Sending form data", formDataToRequest(forms))
      }, [forms])

    return <Results query="/laptops?limit=20&query=id,name,images"
    method="post" data={formDataToRequest(forms)} />
}