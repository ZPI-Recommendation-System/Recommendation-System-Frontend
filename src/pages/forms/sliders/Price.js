import Slider from './Slider';

function Price() {
  return <Slider
    id="price"
    points = {[
    ["1000 zł", 1000],
    ["2000 zł", 2000],
    ["8000 zł", 8000],
    ["16 000 zł", 16000],
    ["Bez limitu", Number.MAX_VALUE]
    ]}
    prompt = {"Wybierz maksymalną cenę:"}
    summary = {value => (
        <><p className="text">
            W tym budżecie masz do wyboru:
        </p>
         <ul className="text">
         <li>10 laptopów biurowych</li>
         <li>30 laptopów gamingowych</li>
         </ul>
        </>
    )}
    startWithMax={true}
    />
}

export default Price;
