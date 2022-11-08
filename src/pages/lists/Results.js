import Selection from "./Selection";
import { getLaptopIds, getLaptop } from '../../api/api';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Laptop, reduceName, API_URL, useRequest } from "../../api/api";

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

function Results() {
    const forms = useSelector(state=>state.forms);

    useEffect(() => {
        console.log("Sending form data", formDataToRequest(forms))
      }, [forms])

    const [isLoaded, data, error] = useRequest(`${API_URL}/laptops?limit=20&query=id,name,images`)

    if (error){
        return <p className="text">Error: {error}</p>
    }
    else if (!isLoaded) {
        return <p className="text">Loading...</p>
    } else {
        console.log(data)
        return (
            <div className="content">
                <Selection
                main={data.items.map(item=>new Laptop(item.id, reduceName(item.name), item.images[0].url))}
                extra={getLaptopIds({}).map(getLaptop)}
                />
            </div>);
    }
}

export default Results;