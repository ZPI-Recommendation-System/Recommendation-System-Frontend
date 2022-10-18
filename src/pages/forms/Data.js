import { Choice, Option } from './Choice';

function Data() {
  return <Choice
  id="internet"
  options={[
    new Option(
      "Napęd CD",
      "pozwala umieszczać w laptopie płyty CD aby czytać i nagrywać na nich dane. Rzadziej spotykane w nowszych laptopach.",
      "icons8-cd-100.png"),
    new Option(
      "Czytnik kart pamięci",
      "Pozwala na szybkie przenoszenie danych z aparatów i kamer oraz przechowywać dane na kartach.",
      "icons8-memory-card-60.png")
  ]}
  />
};

export default Data;
