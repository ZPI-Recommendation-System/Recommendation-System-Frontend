import ScreenExtras from './ScreenExtras';
import Internet from './Internet';
import Disk from './Disk';
import Price from './Price';
import Data from './Data';
import Battery from './Battery';
import Ram from './Ram';
import Usage from './Usage';
import ScreenSize from './ScreenSize';

class Form {
    constructor(id, description, element) {
      this.id = id;
      this.description = description;
      this.element = element;
    }
  }

export const forms = [
    new Form("usage", "Do czego będzie służył laptop", <Usage />),
    new Form("price", "Maksymalna cena", <Price />),
    new Form("size", "Rozmiar ekranu", <ScreenSize />),
    new Form("screen-extras", "Dodatki do ekranu", <ScreenExtras />),
    new Form("battery", "Czas pracy baterii", <Battery />),
    new Form("disk", "Rozmiar dysku", <Disk />),
    new Form("internet", "Internet", <Internet />),
    new Form("data", "Przenoszenie danych", <Data />),
    new Form("ram", "Rozmiar pamięci RAM", <Ram />)
]

export function previousFormId(currentFormId, by=1) {
  const currentIndex = forms.findIndex(form=>form.id===currentFormId);
  if (currentIndex === -1) {
    return forms[forms.length - 1].id;
  }
  let previousIndex = currentIndex - by;
  if (previousIndex >= 0){
    return forms[previousIndex].id;
  } else {
    return currentFormId;
  }
}

export function nextFormId(currentFormId) {
  const currentIndex = forms.findIndex(form=>form.id===currentFormId);
  let nextIndex = currentIndex + 1;
  if (nextIndex < forms.length){
    return forms[nextIndex].id;
  } else {
    return "results";
  }
}