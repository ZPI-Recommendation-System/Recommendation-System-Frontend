import './Comparison.css';
import LaptopStar from '../../components/LaptopStar';
import LaptopShareLinks from './LaptopShareLinks';
import { processDetails } from './details';
import { copyToClipboard, mail } from './utility';
import { API_URL, useRequest } from "../../api/api";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import {HoverText} from './HoverText';
import ViewingTracker from './ViewingTracker';
import LaptopImage from './LaptopImage';
import ComparisonLine from './ComparisonLine';

function Comparison() {
  // read url parameters 
  let { id1, id2 } = useParams();
  const selected = useSelector(state => state.selection.selected)

  if (id1 === undefined) {
    // use store instead of url parameters
    [id1, id2] = selected;
  }

  const [isLoaded, data, error] = useRequest(`${API_URL}/laptops?query=all&ids=${id1},${id2}`)

  if (!(isLoaded)) {
    return <p className="text">Loading...</p>
  }

  if (error) {
    return <div className="text">
    <ViewingTracker id={id1}/>
      <p>There were errors while loading the laptops data: </p>
      <p>{error?.message}</p>
    </div>
  }

  const details1 = { ...data.items[0] };
  let details2 = null;
  processDetails(details1)
  if (data.items[1]) {
    details2 = { ...data.items[1] }
    processDetails(details2)
  }

  function row(name) {
    return ComparisonLine(name, details1, details2)
  }

  function expandable(name, keys) {
    return <ExpandableSection name={name} key={name} keys={keys}
      details1={details1} details2={details2} />
  }

  const table = [
    row("processor"),
    row("graphics"),
    row("screen"),
    row("driveStorage"),
    row("ramAmount"),
    row("price"),
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

  return (
    <div className="content">
      <ViewingTracker id={id1}/>
      <table className="comparison-table">
        <tbody>
          <tr>
            <th>
              <LaptopImage laptop={details1} />
              {details1?.name}<LaptopStar id={id1} /></th>
            {details2 &&
              <th>
                <LaptopImage laptop={details2} />
                {details2?.name}<LaptopStar id={id2} />
              </th>}
          </tr>
          {table}
          <tr>
            <td>
              <LaptopShareLinks id={id1} name={details1?.name} />
            </td>
            {details2 &&
              <td>
                <LaptopShareLinks id={id2} name={details2?.name} />
              </td>}
          </tr>

          {[
            ["Skopiuj link do porównania do schowka",
              () => copyToClipboard(window.location.href)],
            ["Wyślij porównanie mailem",
              () => mail("Porównanie laptopów", "Sprawdź to porównanie laptopów", window.location.href)]]
            .map(([text, onClick]) =>
              <tr key={text}>
                <td colSpan={details2 ? "2" : "1"}>
                  <p className="fake-link"
                    onClick={onClick} >
                    {text}</p>
                </td>
              </tr>)
          }

        </tbody>
      </table>
    </div>
  );
}

function ExpandableSection({ name, keys, details1, details2 }) {
  const [open, setOpen] = useState(false);

  // .expandable-section is used by the puppeteer 
  return <><tr className="expandable-section" style={{ cursor: "pointer" }}
    onClick={() => setOpen(open => !open)}>
    <td colSpan={details2 ? "2" : "1"}>
    <HoverText text={`Kliknij aby rozwinąć sekcję "${name}"`}><b>
      <span className={open ? "arrow-rotated" : "arrow"}>&gt;</span> {name}</b>
      </HoverText>
      </td>
  </tr>
    {keys.map(key => ComparisonLine(key, details1, details2, !open, true))}</>
}

export default Comparison;
