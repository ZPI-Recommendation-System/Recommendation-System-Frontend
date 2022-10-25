import './Comparison.css';
import { getLaptopIds, getLaptop, getLaptopDetails } from '../api';
import { useSelector } from 'react-redux';

function Comparison() {
  const selected = useSelector(state=>state.selection.selected)

  const laptops = getLaptopIds({});
  const laptop1 = getLaptop(selected[0])
  const laptop1details = getLaptopDetails(selected[0])
  const laptop2 = getLaptop(selected[1])
  const laptop2details = getLaptopDetails(selected[1])
  return (
    <div className="content">
      <table className="comparison-table">
        <tbody>
          <tr>
            <th>
              <img className="comparison-image" src={laptop1?.image} alt="laptop" />
              {laptop1?.name}</th>
            {laptop2 &&
            <th>
              <img className="comparison-image" src={laptop2?.image} alt="laptop" />
              {laptop2?.name}</th>}
          </tr>
          {
            Object.entries(laptop1details).map(
              ([key, value]) => 
                <tr>
                  <td>{key}<br />{value}</td>
                  {laptop2 &&
                  <td>{key}<br />{laptop2details[key]}</td>}
                </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default Comparison;
