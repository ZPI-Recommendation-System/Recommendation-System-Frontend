import Selection, { makeLaptop } from "./Selection";
import _ from 'lodash';
import { useEffect, useState } from 'react';
import Results from "./Results";

function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    
    const [sentSearchTerm, setSentSearchTerm] = useState('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log("Searching", searchTerm)
            setSentSearchTerm(searchTerm)
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    return (
        <div className="content">
            <input className="search" placeholder="Wyszukaj laptop po nazwie..."
            onChange={e => setSearchTerm(e.target.value)}
            ></input>
           <Results 
                itemsKey="result" 
                query={"/laptops/search?query=id,name,images&limit=10&search="+sentSearchTerm} 
            />
        </div>
    );
}

export default Search;