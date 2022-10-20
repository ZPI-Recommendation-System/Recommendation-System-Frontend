import Selection, { makeLaptop } from "./Selection";
import _ from 'lodash';

function Search() {
    return (
        <div className="content">
            <input className="search" placeholder="Wyszukaj laptop po nazwie..."></input>
            <Selection
             main={_.range(8, 16).map(makeLaptop)}
             extra={_.range(8, 16).map(makeLaptop)}
             />
        </div>
    );
}

export default Search;