import Slider from './Slider';

function Price() {
  return <Slider
    points = {[
    "1000 zł",
    "2000 zł",
    "8000 zł",
    "16 000 zł",
    "Bez limitu"
    ]}
    prompt = {"Wybierz maksymalną cenę:"}
    summary = {value => (
        <p className="text">
            W tym budżecie masz do wyboru:
            <ul>
            <li>10 laptopów biurowych</li>
            <li>30 laptopów gamingowych</li>
            </ul>
        </p>
    )} />
}

export default Price;
