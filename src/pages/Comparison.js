import './Comparison.css';
import { useSelector } from 'react-redux';
import LaptopStar from '../components/LaptopStar';
import { API_URL, useRequest } from "../api/api";

const properties = {
  model: ["Model", ""],
  producentCode: ["Kod producenta", ""],
  batterySizeWH: ["Rozmiar baterii w WH", "Rozmiar baterii w wato godzinach"], 
  batterySizeMAH: ["Rozmiar baterii w MAH", "Rozmiar baterii w mega ampero godzinach"],
  color: ["Kolor", ""],
  weight: ["Waga", ""],
  ramAmount : ["Pamięć RAM", `W pamięci RAM są przetrzymywane uruchomione gry i programy.
Jeżeli pamięć RAM jest dla nich zbyt niska będą one musiały przechowywać 
dane tymczasowe na dysku co spowoduje zacięcia.`],
  ramFrequency: ["Taktowanie RAM", ""],
  ramNumberOfSlots: ["Liczba slotów RAM", "Niektóre laptopy pozwalają na dokładanie pamięci RAM w postaci slotów."],
  ramNumberOfFreeSlots: ["Liczba wolnych slotów RAM", "Niektóre laptopy pozwalają na dokładanie pamięci RAM w postaci slotów."],
  ramType: ["Typ pamięci RAM", "Technologia w której wykonano, pamięci, im nowsza typ szybciej będzie działać."],
  ramMaxAmount: ["Maksymalna ilość RAM", ""],
  driveStorage: ["Wielkość dysku twardego", ""],
  driveType: ["Typ dysku twardego", "Dyski w technologii SSD są szybsze i przyspeszają start komputera"],
  processor : ["Procesor", "Procesor wpływa na ogólną prędkość komputera."],
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

  // dropdowns
  
  // battery
  delete details.batterySizeMAH
  delete details.batterySizeWH

  // ram 
  delete details.ramType
  delete details.ramMaxAmount
  delete details.ramFrequency;
  delete details.ramNumberOfFreeSlots;
  delete details.ramNumberOfSlots;
  
  // physical properties
  delete details.width;
  delete details.length;
  delete details.depth;
  delete details.weight
  delete details.color;

  // external
  delete details.drives
  delete details.communications
  delete details.connections
  delete details.controls

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
+ (details.screen.refreshRate ? ("\nSzybkość odświeżania: "+details.screen.refreshRate+"Hz") : "")
+ (details.screen.touchScreen ? "Ekran dotykowy" : "")

  for (const field of withIds) {
    if (details[field]){
      delete details[field].id;
    }
  }

  for (const field of singleFieldObjectsArrays) {
    if (!(field in details)) {
      continue;
    }
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

  const keys = Object.fromEntries(
    [...Object.keys(details1), ...Object.keys(details2)]
    .map(k=>[k, true]))

  const links = [
    ["Wyszukaj na Youtube", ""],
    ["Wyszukaj na Allegro", ""],
    ["Skopiuj link do schowka", ""],
    ["Wyślij mailem", ""],
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
            Object.keys(keys).map(
              key => {
                const [translation, tooltip] = getProperty(key);
                return <tr key={key} title={tooltip}>
                  <td>
                    <b>{translation}</b>
                    {newLines(details1[key]?.toString() ?? "-")}
                  </td>
                  {selected[1] &&
                  <td>
                    <b>{translation}</b>
                    {newLines(details2[key]?.toString() ?? "-")}
                  </td>}
                </tr>
              }
            )
        }
         
         <tr>
            <td><b>Interfejsy zewnętrzne &gt;</b></td>
            <td><b>Interfejsy zewnętrzne &gt;</b></td>
          </tr>
          
         <tr>
            <td><b>Bateria &gt;</b></td>
            <td><b>Bateria &gt;</b></td>
          </tr>
         <tr>
            <td><b>RAM &gt;</b></td>
            <td><b>RAM &gt;</b></td>
          </tr>
          
         <tr>
            <td><b>RAM &gt;</b></td>
            <td><b>RAM &gt;</b></td>
          </tr>
          
         <tr>
            <td><b>Właściwości fizyczne &gt;</b></td>
            <td><b>Właściwości fizyczne &gt;</b></td>
          </tr>
         
         <tr>
            <td>{links.map(
              ([name, url])=><p><a href={url} >{name}</a></p>
              )}</td>
            <td>{links.map(
              ([name, url])=><p><a href={url} >{name}</a></p>
              )}</td>
          </tr>
          
          
        </tbody>
      </table>
    </div>
  );
}

export default Comparison;
