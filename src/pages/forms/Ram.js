import Slider from './Slider';

function Ram() {
  return <Slider
    id="ram"
    prompt = {"Wybierz wielkość pamięci RAM"}
    points = {[
    "?",
    "2 GB",
    "4 GB",
    "8 GB",
    "16 GB"
    ]}
    summary = {value => <>
    <b>Jeżeli nie wiesz co wybrać pozostaw slider na wartości '?' a my dokonamy wyboru 
      na bazie twoich poprzednich wyborów.</b>
    <p>W pamięci RAM są przetrzymywane uruchomione gry i programy.
    Jeżeli pamięć RAM jest dla nich zbyt niska będą one musiały przechowywać 
    dane tymczasowe na dysku co spowoduje zacięcia.</p></>} />
}

export default Ram;
