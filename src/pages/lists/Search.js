import { useEffect, useState } from 'react';
import Results from "./Results";

function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    
    const [sentSearchTerm, setSentSearchTerm] = useState('')

    // search 1 second after user stopped typing
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
            onChange={e => {setSearchTerm(e.target.value); e.stopPropagation()}}
            ></input>
           <Results 
                paging
                mainItemsGetter={result => result.items}
                query={"/laptops/search?query=id,name,images,processor,graphics&search="+sentSearchTerm} 
            />
        </div>
    );
}

export default Search;