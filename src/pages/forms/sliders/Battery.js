import Slider from './Slider';

function Battery() {
  return <Slider
    id="battery"
    prompt = {"Wybierz minimalny czas pracy baterii:"}
    points = {[
    ["1 godz", 1],
    ["2 godz", 2],
    ["4 godz", 4],
    ["6 godz", 6]
    ]}
    summary = {value => `Poza samą pojemnością baterii 
    na czas pracy mają też wpływ inne parametry, 
    np. wielkość ekranu. Gry komputerowe lub modelowanie wyczerpią 
    baterię znacznie szybciej niż np. przeglądanie internetu.`} />
}

export default Battery;
