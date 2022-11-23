import './Comparison.css';
import LaptopStar from '../../components/LaptopStar';
import LaptopShareLinks from './LaptopShareLinks';
import { getTranslationDescriptionAndComparable, processDetails } from './details';
import { copyToClipboard, mail } from './utility';
import { API_URL, useRequest } from "../../api/api";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import HoverText from './HoverText';
import ViewingTracker from './ViewingTracker';

function newLinesToParagraphs(text) {
  if (!text) {
    return text;
  }
  return <>{text.split("\n").map((line, index) => <p key={index}>{line}</p>)}</>
}

function displayDetail(detail) {
  return newLinesToParagraphs(detail?.toString()) ?? "-";
}

function tableLine(key, details1, details2, hidden = false, dropdown = false) {

  const [translation, tooltip, comparable] = getTranslationDescriptionAndComparable(key);

  const firstAsNumber = Number.parseFloat(details1[key]);
  const secondAsNumber = details2 && Number.parseFloat(details2[key]);
  const bothAreNumbers = !Number.isNaN(firstAsNumber) && !Number.isNaN(secondAsNumber);
  // if there's only one laptop on page all of its parameters would be better
  const firstIsBetter = details2 && comparable && bothAreNumbers && firstAsNumber > secondAsNumber;
  const secondIsBetter = comparable && bothAreNumbers && firstAsNumber < secondAsNumber;

  let classNames = "comparison-row";
  if (dropdown) classNames+= " comparison-dropdown";
  if (hidden) classNames+= " comparison-row-hidden";

  return <tr className={classNames} key={key}>
    <td className={firstIsBetter && "comparison-better-cell"}>
      <HoverText text={tooltip}>
        <b>{translation}</b>
        <span>
          {displayDetail(details1[key])}
        </span>
      </HoverText>
    </td>
    {details2 &&
      <td className={secondIsBetter && "comparison-better-cell"}>
        <br />
        <HoverText text={tooltip}>
        <span>
          {displayDetail(details2[key])}
        </span>
        </HoverText>
      </td>}
  </tr>
}

function Dropdown({ name, keys, details1, details2 }) {

  const [open, setOpen] = useState(false);

  return <><tr style={{ cursor: "pointer" }}
    onClick={() => setOpen(open => !open)}>
    <td colSpan={details2 ? "2" : "1"}><b>
      <span className={open ? "arrow-rotated" : "arrow"}>&gt;</span> {name}</b></td>
  </tr>
    {keys.map(key => tableLine(key, details1, details2, !open, true))}</>
}

function Comparison() {
  // read url parameters 
  let { id1, id2 } = useParams();
  const selected = useSelector(state => state.selection.selected)

  if (id1 === undefined) {
    // use store instead of url parameters
    [id1, id2] = selected;
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
    <ViewingTracker id={id1}/>
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
    return tableLine(name, details1, details2)
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

  return (
    <div className="content">
      <ViewingTracker id={id1}/>
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
          {table}
          <tr>
            <td>
              <LaptopShareLinks id={id1} name={data1.result?.name} />
            </td>
            {details2 &&
              <td>
                <LaptopShareLinks id={id2} name={data2.result?.name} />
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

export default Comparison;
