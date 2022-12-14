import ScreenExtras from './forms/choices/ScreenExtras';
import Internet from './forms/choices/Internet';
import Disk from './forms/sliders/Disk';
import Price from './forms/sliders/Price';
import Data from './forms/choices/Data';
import Battery from './forms/sliders/Battery';
import Ram from './forms/sliders/Ram';
import Usage from './forms/choices/Usage';
import ScreenSize from './forms/choices/ScreenSize';
import Map from './Map';

import Favourites from './lists/Favourites';
import FormResults from './lists/FormResults';
import Search from './lists/Search';

import Landing from './Landing';
import NotFound from './NotFound';
import Comparison from './comparison/Comparison';

const PreviousBehavior = {
  Last: "Last",
  PreviousInOrder: "PreviousInOrder",
  LastForm: "LastForm"
}

class Page {
    constructor(number, link, description, element, previous=PreviousBehavior.PreviousInOrder) {
      this.number = number;
      this.link = link;
      this.description = description;
      this.element = element;
      this.previous= previous;
      this.isForm = false;
    }
  }


class FormPage extends Page {
    constructor(number, link, description, element, previous=PreviousBehavior.PreviousInOrder) {
      super(number, link, description, element, previous);
      this.isForm = true;
    }
  }

export const pages = [
    new FormPage(1, "/usage", "Do czego będzie służył laptop", <Usage />),
    new FormPage(2, "/price", "Maksymalna cena", <Price />),
    new FormPage(3, "/size", "Rozmiar ekranu", <ScreenSize />),
    new FormPage(4, "/screen-extras", "Dodatki do ekranu", <ScreenExtras />),
    new FormPage(5, "/battery", "Czas pracy baterii", <Battery />),
    new FormPage(6, "/disk", "Rozmiar dysku", <Disk />),
    new FormPage(7, "/internet", "Internet", <Internet />),
    new FormPage(8, "/data", "Przenoszenie danych", <Data />),
    new FormPage(9, "/ram", "Rozmiar pamięci RAM", <Ram />),
    
    new Page(1, "/", "Strona startowa", <Landing />),
    new Page(1, "*", "404", <NotFound />),
    
    new Page(1, "/search", "Wyszukaj laptop", <Search />),
    new Page(12, "/map", "Mapa strony", <Map />, PreviousBehavior.Last),

    new Page(10, "/results", "Wybierz do porównania", <FormResults />),
    new Page(10, "/favourites", "Zapisane laptopy", <Favourites />, PreviousBehavior.LastForm),
    
    new Page(11, "/comparison", "Szczegóły", <Comparison />, PreviousBehavior.Last),
    new Page(11, "/details/:id1", "Szczegóły", <Comparison />, PreviousBehavior.Last),
    new Page(11, "/comparison/:id1/:id2", "Porównanie", <Comparison />, PreviousBehavior.Last)
]

export const firstFormPageLink = pages.find(page=>page.isForm).link;
export const startPage = pages.find(page=>page.link==="/");

export const currentPage = (index) => pages[index];

export function previousPage(index, lastPage, lastFormPage) {
  const currentPage = pages[index];
  if (!currentPage) {
    return startPage;
  }
  
  if (currentPage.previous===PreviousBehavior.PreviousInOrder) {
    let previousNumber = currentPage.number - 1;
    const previousPage = pages.find(form=>form.number===previousNumber);
    if (previousPage){
      return previousPage
    } else {
      return currentPage;
    }
  } else if (currentPage.previous===PreviousBehavior.LastForm) {
    return pages[lastFormPage] ?? startPage;
  } else if (currentPage.previous===PreviousBehavior.Last) {
    return pages[lastPage] ?? startPage;
  }
}

function cleanupLink(link) {
  // remove the trailing slash
  if (link[link.length-1]==="/") {
    return link.substring(0, link.length-1)
  } else {
    return link;
  } 
}

export function nextPageLink(currentFormLink) {
  currentFormLink = cleanupLink(currentFormLink)
  const currentPage = currentFormLink ? pages.find(page=>page.link===currentFormLink) : pages[0];
  const currentNumber = currentPage.number;
  const nextNumber = currentNumber + 1;
  const nextPage = pages.find(form=>form.number===nextNumber);
  if (nextPage){
    return nextPage.link;
  } else {
    return currentFormLink;
  }
}