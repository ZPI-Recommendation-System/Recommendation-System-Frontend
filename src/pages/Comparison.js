import './Comparison.css';
import { useSelector } from 'react-redux';
import LaptopStar from '../components/LaptopStar';
import { API_URL, useRequest } from "../api/api";


function processDetails(details) {
  delete details.id;
  delete details.name;
  delete details.images;
  delete details.type;

  delete details.width;
  delete details.length;
  delete details.depth;

  const withIds = ["screen", "graphics", "processor"]
  const singleFieldObjectsArrays = ["controls", "communications", "connections"]

  for (const field of withIds) {
    if (details[field]){
      delete details[field].id;
    }
  }

  for (const field of singleFieldObjectsArrays) {
    const processed = []
    for (const value of details[field]) {
      processed.push("- "+Object.values(value)[0].toString())
    }
    details[field] = processed
  }

  for (const [key, value] of Object.entries(details)) {
    if (value === null || value === undefined || value.length === 0) {
      delete details[key];
    } else if (typeof value === 'object') {
      details[key]=JSON.stringify(value, null, 1).replace(/["'{}[\],]/g, "")
    }
  }
} 

function newLines(text) {
  if (!text){
    return "";
  }
  return <p>{text.split("\n").map(line=><p>{line}</p>)}</p>
}

function Comparison() {
  const selected = useSelector(state=>state.selection.selected)

  const [isLoaded1, data1, error1] = useRequest(`${API_URL}/laptops/${selected[0]}?query=all`)
  const [isLoaded2, data2, error2] = useRequest(
    selected[1] &&
    `${API_URL}/laptops/${selected[1]}?query=all`)

  if (!(isLoaded1 && isLoaded2)){
    return <p className="text">Loading...</p>
  }

  if (error1 || error2) {
    return <div className="text">
        <p>There were errors while loading the laptops data: </p>
        <p>{error1?.message}</p> 
        <p>{error2?.message}</p>
      </div>
  }

  console.log(data1)
  console.log(data2)

  const details1 = {...data1.result};
  let details2 = {};
  processDetails(details1)
  if (data2) {
    details2 = {...data2.result}
    processDetails(details2)
  }

  return (
    <div className="content">
      <table className="comparison-table">
        <tbody>
          <tr>
            <th>
              <img className="comparison-image" src={data1.result?.images[0].url} alt="laptop" />
              {data1.result?.name}<LaptopStar id={selected[0]} /></th>
            {selected[1] &&
            <th>
              <img className="comparison-image" src={data2.result?.images[0].url} alt="laptop" />
              {data2.result?.name}<LaptopStar id={selected[1]} /></th>}
          </tr>
          {
            Object.entries(details1).map(
              ([key, value]) => 
                <tr key={key}>
                  <td><b>{key}</b><p>{newLines(value?.toString())}</p></td>
                  {selected[1] &&
                  <td><b>{key}</b><p>{newLines(details2[key]?.toString())}</p></td>}
                </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default Comparison;
