import ScreenExtras from './forms/choices/ScreenExtras';
import Internet from './forms/choices/Internet';
import Disk from './forms/sliders/Disk';
import Price from './forms/sliders/Price';
import Data from './forms/choices/Data';
import Battery from './forms/sliders/Battery';
import Ram from './forms/sliders/Ram';
import Usage from './forms/choices/Usage';
import ScreenSize from './forms/choices/ScreenSize';

import Favourites from './lists/Favourites';
import Results from './lists/Results';
import Search from './lists/Search';

import Landing from './Landing';
import NotFound from './NotFound';
import Comparison from './Comparison';

class Page {
    constructor(index, link, description, element) {
      this.index = index;
      this.link = link;
      this.description = description;
      this.element = element;
    }
  }

export const pages = [
    new Page(0, "", "Strona startowa", <Landing />),
    new Page(0, "404", "404", <NotFound />),
    
    new Page(1, "usage", "Do czego będzie służył laptop", <Usage />),
    new Page(2, "price", "Maksymalna cena", <Price />),
    new Page(3, "size", "Rozmiar ekranu", <ScreenSize />),
    new Page(4, "screen-extras", "Dodatki do ekranu", <ScreenExtras />),
    new Page(5, "battery", "Czas pracy baterii", <Battery />),
    new Page(6, "disk", "Rozmiar dysku", <Disk />),
    new Page(7, "internet", "Internet", <Internet />),
    new Page(8, "data", "Przenoszenie danych", <Data />),
    new Page(9, "ram", "Rozmiar pamięci RAM", <Ram />),

    new Page(10, "results", "Wybierz do porównania", <Results />),
    new Page(10, "favourites", "Zapisane laptopy", <Favourites />),
    new Page(10, "search", "Wyszukaj laptop", <Search />),
    
    new Page(11, "comparison", "Szczegóły", <Comparison />)
]

export function nextPageLink(currentFormLink, by=1) {
  const currentIndex = pages.findIndex(form=>form.link===currentFormLink);
  if (currentIndex === -1) {
    return pages[pages.length - 1].id;
  }
  let previousIndex = currentIndex - by;
  if (previousIndex >= 0){
    return pages[previousIndex].id;
  } else {
    return currentFormLink;
  }
}

export function nextPageLink(currentFormLink) {
  const currentIndex = pages.findIndex(form=>form.link===currentFormLink);
  let nextIndex = currentIndex + 1;
  if (nextIndex < pages.length){
    return pages[nextIndex].id;
  } else {
    return currentFormLink;
  }
}