import Selection from "./Selection";
import { Laptop, API_URL, useRequest } from "../../api/api";
import { useState } from "react";

function itemToLaptop(item) {
    return new Laptop(item.id, item.name, item.images[0].url,
        item.processor?.benchmark?.benchmark, item.graphics?.benchmark?.benchmark);
}

function resultItems(result) {
    return result.items;
}

function Results({query, method, data, mainItemsGetter=resultItems, extraItemsGetter, allowSorting=true}) {

    const options = {   }
    if (method) 
        options.method = method;
    if (data) {
      options.body=JSON.stringify(data)
      options.headers={
        'Content-Type': 'application/json'
      }
    }
    
    const [sorting, setSorting] = useState("price");
    
    let url = API_URL+query;
    if (allowSorting)
        url += sorting;

    const [isLoaded, result, error] = useRequest(url, options)

    if (error){
        return <p className="text">Error: {error.message}</p>
    }
    else if (!isLoaded) {
        return <p className="text">Loading...</p>
    } else {
        console.log(result)
        const main = mainItemsGetter(result).map(itemToLaptop);
        const extra = extraItemsGetter ? extraItemsGetter(result).map(itemToLaptop) : [];
        return (
            <div className="content">
                <Selection
                main={main}
                extra={extra}
                setSorting={({value})=>setSorting(value)}
                allowSorting={allowSorting}
                />
            </div>);
    }
}

export default Results;