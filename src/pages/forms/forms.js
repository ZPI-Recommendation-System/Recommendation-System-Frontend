import ScreenExtras from './ScreenExtras';
import Internet from './Internet';
import Disk from './Disk';
import Price from './Price';
import Data from './Data';

class Form {
    constructor(id, description, element) {
      this.id = id;
      this.description = description;
      this.element = element;
    }
  }

export const forms = [
    new Form("price", "Maksymalna cena", <Price />),
    new Form("disk", "Rozmiar dysku", <Disk />),
    new Form("screen-extras", "Dodatki do ekranu", <ScreenExtras />),
    new Form("internet", "Internet", <Internet />),
    new Form("data", "Przenoszenie danych", <Data />)
]

export function nextFormId(currentFormId) {
  const currentIndex = forms.findIndex(form=>form.id===currentFormId);
  let nextIndex = currentIndex + 1;
  if (nextIndex < forms.length){
    // go back to the first form
    return forms[nextIndex].id;
  } else {
    return "select";
  }
}