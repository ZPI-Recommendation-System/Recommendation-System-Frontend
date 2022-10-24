import Slider from './Slider';

function Ram() {
  return <Slider
    id="ram"
    prompt = {"Wybierz wielkość pamięci RAM"}
    points = {[
    ["?", 0],
    ["2 GB", 2],
    ["4 GB", 4],
    ["8 GB", 8],
    ["16 GB", 16]
    ]}
    summary = {value => <>
    <b>Jeżeli nie wiesz co wybrać pozostaw slider na wartości '?' a my dokonamy wyboru 
      na bazie twoich poprzednich decyzji.</b>
    <p>W pamięci RAM są przetrzymywane uruchomione gry i programy.
    Jeżeli pamięć RAM jest dla nich zbyt niska będą one musiały przechowywać 
    dane tymczasowe na dysku co spowoduje zacięcia.</p></>} />
}

export default Ram;
