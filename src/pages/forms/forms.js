import ScreenExtras from './ScreenExtras';
import Internet from './Internet';
import Disk from './Disk';

class Form {
    constructor(id, description, element) {
      this.id = id;
      this.description = description;
      this.element = element;
    }
  }

export const forms = [
    new Form("disk", "Rozmiar dysku", <Disk />),
    new Form("screen-extras", "Dodatki do ekranu", <ScreenExtras />),
    new Form("internet", "Internet", <Internet />)
]

export function nextFormId(currentFormId) {
  const currentIndex = forms.findIndex(form=>form.id==currentFormId);
  let nextIndex = currentIndex + 1;
  if (nextIndex >= forms.length){
    // go back to the first form
    nextIndex = 0
  }
  return forms[nextIndex].id;
}