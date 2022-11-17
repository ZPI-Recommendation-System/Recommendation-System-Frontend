import Selection from "./Selection";
import { Laptop, reduceName, API_URL, useRequest } from "../../api/api";

function Results({query, method, data, key}) {

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

    if (!key)
        key = "items"

    if (error){
        return <p className="text">Error: {error.message}</p>
    }
    else if (!isLoaded) {
        return <p className="text">Loading...</p>
    } else {
        return (
            <div className="content">
                <Selection
                main={result[key].map(item=>new Laptop(item.id, reduceName(item.name), item.images[0].url))}
                />
            </div>);
    }
}

export default Results;