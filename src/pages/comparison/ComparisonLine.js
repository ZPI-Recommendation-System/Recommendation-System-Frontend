
import { getTranslationDescriptionAndComparisonType, ComparisonType } from './details';
import {HoverText} from './HoverText';

// good sample:
// http://localhost:3000/comparison/00172f49-6bc6-4bec-85bc-70396858404b/000b42db-4b53-4299-95a2-8722635fc730
export default function ComparisonLine(key, details1, details2, hidden = false, dropdown = false) {

    const [translation, tooltip, comparisonType] = getTranslationDescriptionAndComparisonType(key);
  
    let firstText;
    let firstValue;
    let secondText;
    let secondValue;
  
    if (Array.isArray(details1[key])) {
      firstText = details1[key][0];
      firstValue = details1[key][1];
    } else {
      firstText = firstValue = details1[key];
    }
    if (details2 && Array.isArray(details2[key])) {
      secondText = details2 && details2[key][0];
      secondValue = details2 && details2[key][1];
    } else {
      secondText = secondValue = details2 && details2[key];
    }
  
    const firstAsNumber = Number.parseFloat(firstValue);
    const secondAsNumber = details2 && Number.parseFloat(secondValue);
    const bothAreNumbers = !Number.isNaN(firstAsNumber) && !Number.isNaN(secondAsNumber);
    // if there's only one laptop on page all of its parameters would be better
    let firstIsBetter = details2 && comparisonType && bothAreNumbers && firstAsNumber > secondAsNumber;
    let secondIsBetter = comparisonType && bothAreNumbers && firstAsNumber < secondAsNumber;
  
    if (comparisonType===ComparisonType.lessIsBetter && bothAreNumbers) {
      if (firstIsBetter && !secondIsBetter) {
        firstIsBetter = false
        secondIsBetter = true
      } else if (secondIsBetter && !firstIsBetter) {
        firstIsBetter = true
        secondIsBetter = false
      }
    }
  
    let classNames = "comparison-row";
    if (dropdown) classNames+= " comparison-dropdown";
    if (hidden) classNames+= " comparison-row-hidden";
  
    return <tr className={classNames} key={key}>
      <td className={firstIsBetter ? "comparison-better-cell" : ""}>
        <HoverText text={tooltip}>
          <b>{translation}</b>
            {displayDetail(firstText)}
        </HoverText>
      </td>
      {details2 &&
        <td className={secondIsBetter ? "comparison-better-cell" : ""}>
          <br />
          <HoverText text={tooltip}>
            {displayDetail(secondText)}
          </HoverText>
        </td>}
    </tr>
  }
  
function newLinesToParagraphs(text) {
    if (!text) {
      return text;
    }
    return <div>{text.split("\n").map((line, index) => <p key={index}>{line}</p>)}</div>
  }
  

function displayDetail(detail) {
    return newLinesToParagraphs(detail?.toString()) ?? "-";
}
