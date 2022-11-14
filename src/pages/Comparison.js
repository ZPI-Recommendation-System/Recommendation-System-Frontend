import './Comparison.css';
import { useSelector } from 'react-redux';
import LaptopStar from '../components/LaptopStar';
import {getTranslationAndDescription, processDetails} from './ComparisonHelpers';
import { API_URL, useRequest } from "../api/api";
import { useState } from 'react';

function newLines(text) {
  if (!text) {
    return "";
  }
  return <p>{text.split("\n").map(line => <p>{line}</p>)}</p>
}

function table_lines(keys, details1, details2, hidden=false) {
  return keys.map(key => {
    const [translation, tooltip] = getTranslationAndDescription(key);
    return <tr className={hidden ? "comparison-row comparison-row-hidden" : "comparison-row"} key={key} title={tooltip}>
      <td>
        <b>{translation}</b>
        {newLines(details1[key]?.toString() ?? "-")}
      </td>
      {details2 &&
        <td>
          <br />
          {newLines(details2[key]?.toString() ?? "-")}
        </td>}
    </tr>
  });
}

function Dropdown({ name, keys, details1, details2 }) {

  const [open, setOpen] = useState(false);

  return <><tr style={{ backgroundColor: "#eee", cursor: "pointer" }} 
  onClick={() => setOpen(open => !open)}>
    <td colSpan={details2 ? "2" : "1"}><b>
      <span className={open ? "arrow-rotated" : "arrow"}>&gt;</span> {name}</b></td>
  </tr>
    {table_lines(keys, details1, details2, !open)}</>
}

function Comparison() {
  const selected = useSelector(state => state.selection.selected)

  const [isLoaded1, data1, error1] = useRequest(`${API_URL}/laptops/get/${selected[0]}?query=all`)
  const [isLoaded2, data2, error2] = useRequest(
    selected[1] &&
    `${API_URL}/laptops/get/${selected[1]}?query=all`)

  if (!(isLoaded1 && isLoaded2)) {
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

  const details1 = { ...data1.result };
  let details2 = null;
  processDetails(details1)
  if (data2) {
    details2 = { ...data2.result }
    processDetails(details2)
  }

  const sections = [
    ["Interfejsy zewnętrzne", [
      "drives",
      "communications",
      "connections",
      "controls"
    ]],
    ["Bateria", [
      "batterySizeMAH",
      "batterySizeWH"
    ]],
    ["Szczegóły pamięci RAM", [
      "ramType",
      "ramMaxAmount",
      "ramFrequency",
      "ramNumberOfFreeSlots",
      "ramNumberOfSlots"
    ]],
    ["Właściwości fizyczne", [
      "width",
      "length",
      "depth",
      "weight",
      "color"
    ]]
  ]

  const links = [
    ["/icons/comparison/youtube.png", "Wyszukaj na Youtube", (id, name)=>"https://www.youtube.com/results?search_query="+name],
    ["/icons/comparison/allegro.jpg", "Wyszukaj na Allegro",  (id, name)=>"https://allegro.pl/listing?string="+name],
    ["/icons/comparison/icons8-delivered-mail-96.png", "Wyślij mailem", (id, name)=>`mailto:yourmail@mail.com?subject=Laptops&body=${window.location.href}`],
    ["/icons/comparison/copy.png", "Skopiuj link do schowka", (id, name)=>""],
  ]

  const topParameters = [
    "processor", "graphics", "screen", "ramAmount", "driveStorage"
  ]

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
                {data2.result?.name}<LaptopStar id={selected[1]} />
              </th>}
          </tr>
          {
            table_lines(topParameters, details1, details2)
          }

          {sections.map(([name, keys]) =>
            <Dropdown name={name} key={name} keys={keys}
              details1={details1} details2={details2} />
          )}

          <tr>
            <td>{links.map(
              ([icon, name, url]) => <a href={url(selected[0], data1.result?.name)} title={name} >
                <img src={icon} alt={name} style={{width:"1.6rem", paddingLeft: "0.5rem"}}></img>
                </a>
            )}</td>
            {details2 &&
            <td>{links.map(
              ([icon, name, url]) => <a href={url(selected[1], data2?.result?.name)} title={name} >
                <img src={icon} alt={name} style={{width:"1.6rem", paddingLeft: "0.5rem"}}></img>
                </a>
            )}</td>}
          </tr>
          <tr>
            <td colSpan={details2 ? "2" : "1"}>
              <a href="" onClick="copyToClipboard" >Skopiuj link do porównania do schowka</a>
            </td>
          </tr>
          
          <tr>
            <td colSpan={details2 ? "2" : "1"}>
              <a href={`mailto:yourmail@mail.com?subject=Laptops&body=${window.location.href}`}
              target="_blank" 
              rel="noreferrer"
              >Wyślij porównanie mailem</a>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}

export default Comparison;
