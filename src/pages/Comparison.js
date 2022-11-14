import './Comparison.css';
import LaptopStar from '../components/LaptopStar';
import {getTranslationAndDescription, processDetails} from './ComparisonHelpers';
import { API_URL, useRequest } from "../api/api";
import { useState } from 'react';
import {  useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

function newLines(text) {
  if (!text) {
    return "";
  }
  return <p>{text.split("\n").map(line => <p>{line}</p>)}</p>
}

function table_lines(keys, details1, details2, hidden=false, dropdown=false) {
  return keys.map(key => {
    const [translation, tooltip] = getTranslationAndDescription(key);
    return <tr 
    style={dropdown ? {backgroundColor: "#eaeaea", opacity : 0.8} : {}}
    className={hidden ? "comparison-row comparison-row-hidden" : "comparison-row"} key={key} title={tooltip}>
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

  return <><tr style={{ cursor: "pointer" }} 
  onClick={() => setOpen(open => !open)}>
    <td colSpan={details2 ? "2" : "1"}><b>
    <span className={open ? "arrow-rotated" : "arrow"}>&gt;</span> {name}</b></td>
  </tr>
    {table_lines(keys, details1, details2, !open, true)}</>
}

function Comparison() {
  let { id1, id2 } = useParams();
  const selected = useSelector(state=>state.selection.selected)

  if (id1 === undefined) {
    [ id1, id2 ] = selected;
  }

  const [isLoaded1, data1, error1] = useRequest(`${API_URL}/laptops/get/${id1}?query=all`)
  const [isLoaded2, data2, error2] = useRequest(
    id2 &&
    `${API_URL}/laptops/get/${id2}?query=all`)

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

  const details1 = { ...data1.result };
  let details2 = null;
  processDetails(details1)
  if (data2) {
    details2 = { ...data2.result }
    processDetails(details2)
  }

  function row(name) {
    return table_lines([name], details1, details2)[0]
  }

  function expandable(name, keys) {
    return <Dropdown name={name} key={name} keys={keys}
    details1={details1} details2={details2} />
  }
  
  const table = [
    row("processor"),
    row("graphics"),
    row("screen"),
    row("driveStorage"),
    row("ramAmount"),
    expandable("Szczegóły pamięci RAM", [
      "ramType",
      "ramMaxAmount",
      "ramFrequency",
      "ramNumberOfFreeSlots",
      "ramNumberOfSlots"
    ]),
    expandable("Bateria", [
      "batterySizeMAH",
      "batterySizeWH"
    ]),
    expandable("Interfejsy zewnętrzne", [
      "drives",
      "communications",
      "connections",
      "controls"
    ]),
    expandable("Właściwości fizyczne", [
      "width",
      "length",
      "depth",
      "weight",
      "color"
    ]),
  ]

  function open (url){
    window.open(url, '_blank').focus();
  }

 function copyToClipboard(url) {
    navigator.clipboard.writeText(url)
  }
  
  function detailsPage(id){
    const url = window.location;
    const baseUrl = url.protocol + "//" + url.host ;
    return baseUrl+"/details/"+id;
  }

  const links = [
    ["/icons/comparison/youtube.png", "Wyszukaj na Youtube", (id, name)=>open("https://www.youtube.com/results?search_query="+name)],
    ["/icons/comparison/allegro.jpg", "Wyszukaj na Allegro",  (id, name)=>open("https://allegro.pl/listing?string="+name)],
    ["/icons/comparison/icons8-delivered-mail-96.png", "Wyślij mailem", (id, name)=>open(`mailto:yourmail@mail.com?subject=Laptops&body=${detailsPage(id)}`)],
    ["/icons/comparison/copy.png", "Skopiuj link do schowka", (id, name)=>copyToClipboard(detailsPage(id))],
  ]

  return (
    <div className="content">
      <table className="comparison-table">
        <tbody>
          <tr>
            <th>
              <img className="comparison-image" src={details1?.images[0].url} alt="laptop" />
              {details1?.name}<LaptopStar id={id1} /></th>
            {id2 &&
              <th>
                <img className="comparison-image" src={details2?.images[0].url} alt="laptop" />
                {details2?.name}<LaptopStar id={id2} />
              </th>}
          </tr>
          { table }
          <tr>
          <td>{links.map(
              ([icon, name, onClick]) => 
                <img
                onClick={()=>onClick(id1, data1.result?.name)}
                src={icon} alt={name} style={{width:"1.6rem", paddingLeft: "0.5rem", cursor: "pointer"}}
                />)}
            </td>
            {details2 &&
            <td>{links.map(
              ([icon, name, onClick]) => 
                <img
                onClick={()=>onClick(id2, data2.result?.name)}
                src={icon} alt={name} style={{width:"1.6rem", paddingLeft: "0.5rem", cursor: "pointer"}}
                />)}
            </td> }
          </tr>
          <tr>
            <td colSpan={details2 ? "2" : "1"}>
              <p style={{color:"rgb(0, 102, 204)", textDecoration: "underline"}} onClick={e=>{
                copyToClipboard(window.location.href)
                e.preventDefault()
              }} >Skopiuj link do porównania do schowka</p>
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
