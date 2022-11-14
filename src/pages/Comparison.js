import './Comparison.css';
import { useSelector } from 'react-redux';
import LaptopStar from '../components/LaptopStar';
import { API_URL, useRequest } from "../api/api";
import { useState } from 'react';

const properties = {
  model: ["Model", ""],
  producentCode: ["Kod producenta", ""],
  batterySizeWH: ["Rozmiar baterii w WH", "Rozmiar baterii w wato godzinach"],
  batterySizeMAH: ["Rozmiar baterii w MAH", "Rozmiar baterii w mega ampero godzinach"],
  color: ["Kolor", ""],
  weight: ["Waga", ""],
  ramAmount: ["Pamięć RAM", `W pamięci RAM są przetrzymywane uruchomione gry i programy.
Jeżeli pamięć RAM jest dla nich zbyt niska będą one musiały przechowywać 
dane tymczasowe na dysku co spowoduje zacięcia.`],
  ramFrequency: ["Taktowanie RAM", ""],
  ramNumberOfSlots: ["Liczba slotów RAM", "Niektóre laptopy pozwalają na dokładanie pamięci RAM w postaci slotów."],
  ramNumberOfFreeSlots: ["Liczba wolnych slotów RAM", "Niektóre laptopy pozwalają na dokładanie pamięci RAM w postaci slotów."],
  ramType: ["Typ pamięci RAM", "Technologia w której wykonano, pamięci, im nowsza typ szybciej będzie działać."],
  ramMaxAmount: ["Maksymalna ilość RAM", ""],
  driveStorage: ["Wielkość dysku twardego", ""],
  driveType: ["Typ dysku twardego", "Dyski w technologii SSD są szybsze i przyspeszają start komputera"],
  processor: ["Procesor", "Procesor wpływa na ogólną prędkość komputera."],
  screen: ["Ekran", "Właściwości ekranu komputera."],
  graphics: ["GPU", "Procesor GPU jest używany do wyświetlania obiektów na ekranie."],
  communications: ["Komunikacja", ""],
  drives: ["Napędy", ""],
  connections: ["Gniazda", ""],
  controls: ["Sterowanie", `Komponenty służące do komunikacji z komputerem, 
np.: klawiatura, touchpad, ekran.`]
}

function getProperty(name) {
  if (name in properties) {
    return properties[name];
  } else {
    return [name, ""]
  }
}

function processDetails(details) {
  delete details.id;
  delete details.name;
  delete details.images;
  delete details.type;

  delete details.producentCode;
  delete details.driveType;

  delete details.model;
  delete details.screen?.screenType;
  delete details.graphics?.graphicsCardType;
  delete details.processor?.series;

  const withIds = ["screen", "graphics", "processor"]
  const singleFieldObjectsArrays = ["controls", "communications", "connections", "drives"]

  details.graphics = `${details.graphics.graphicsCardModel}
VRAM: ${details.graphics.graphicsCardVRam ?? "?"}`

  details.processor = `${details.processor.model}
Liczba rdzeni: ${details.processor.cores}
Taktowanie: ${details.processor.frequency}`

  details.screen = `Rozdzielczość ${details.screen.resolution}
Przekątna ${details.screen.diagonalScreenInches} cali
Powierzchnia: ${details.screen.screenFinish}`
    + (details.screen.refreshRate ? ("\nSzybkość odświeżania: " + details.screen.refreshRate + "Hz") : "")
    + (details.screen.touchScreen ? "Ekran dotykowy" : "")

  for (const field of withIds) {
    if (details[field]) {
      delete details[field].id;
    }
  }

  for (const field of singleFieldObjectsArrays) {
    if (!(field in details)) {
      continue;
    }
    const processed = []
    for (const value of details[field]) {
      processed.push("- " + Object.values(value)[0].toString())
    }
    details[field] = processed
  }

  for (const [key, value] of Object.entries(details)) {
    if (value === null || value === undefined || value.length === 0) {
      delete details[key];
    } else if (typeof value === 'object') {
      details[key] = JSON.stringify(value, null, 1).replace(/["'{}[\],]/g, "")
    }
  }
}

function newLines(text) {
  if (!text) {
    return "";
  }
  return <p>{text.split("\n").map(line => <p>{line}</p>)}</p>
}

function table_lines(keys, details1, details2, hidden=false) {
  return keys.map(key => {
    const [translation, tooltip] = getProperty(key);
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
