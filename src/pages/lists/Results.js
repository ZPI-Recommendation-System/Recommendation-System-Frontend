import Selection from "./Selection";
import { Laptop, API_URL, useRequest } from "../../api/api";

function itemToLaptop(item) {
    return new Laptop(item.id, item.name, item.images[0].url,
        item.processor?.benchmark?.benchmark, item.graphics?.benchmark?.benchmark);
}

function Results({query, method, data, itemsKey}) {

    const options = {   }
    if (method) 
        options.method = method;
    if (data) {
      options.body=JSON.stringify(data)
      options.headers={
        'Content-Type': 'application/json'
      }
    }
    
    const [isLoaded, result, error] = useRequest(API_URL+query, options)

    if (!itemsKey)
        itemsKey = result=>result.items

    if (error){
        return <p className="text">Error: {error.message}</p>
    }
    else if (!isLoaded) {
        return <p className="text">Loading...</p>
    } else {
        console.log(result)
        return (
            <div className="content">
                <Selection
                main={itemsKey(result).map(itemToLaptop)}
                />
            </div>);
    }
}

export default Results;