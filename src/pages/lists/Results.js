import Selection, { makeLaptop } from "./Selection";
import _ from 'lodash';

function Results() {
    return (
        <div className="content">
            <Selection
             main={_.range(8, 16).map(makeLaptop)}
             extra={_.range(8, 16).map(makeLaptop)}
             />
        </div>
    );
}

export default Results;