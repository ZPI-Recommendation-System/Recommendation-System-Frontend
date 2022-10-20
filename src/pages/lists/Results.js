import Selection, { makeLaptop } from "./Selection";
import _ from 'lodash';
import { getLaptopIds, getLaptop } from '../../api';

function Results() {
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