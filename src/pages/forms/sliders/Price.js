import Slider from './Slider';
import { API_URL } from "../../../api/api"
import useFormData from '../../useFormData';

async function count(usageType, maxPrice) {
    const result = await fetch(API_URL+"/recommendations?limit=0", {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            "usageType": usageType,
            "minDiscSize": 0,
            "screenPreferences": {},
            "preferredScreenSizes": [],
            "maxPricePLN" : maxPrice
          }
          )
       });
    const asJson = await result.json();
    return asJson.items.length;
}

function Price() {
  const formData = useFormData();

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
    summary = {async value =>{
        const [office, gaming, middle1, middle2] = await Promise.all([
            count("Aplikacje biurowe i internet", value),
            count("Najnowsze gry wysokobudżetowe", value),
            count("Modelowanie 3D i digital art", value),
            count("Gry indie i retro", value)
        ])
        const middle = middle1 + middle2;

        return <><p className="text">
            W tym budżecie masz do wyboru:
        </p>
         <ul className="text">
         <li>{office} laptopów biurowych</li>
         <li>{gaming} laptopów gamingowych</li>
         <li>{middle} laptopów ze średniej półki</li>
         </ul>
        </>}
    }
    startWithMax={true}
    />
}

export default Price;
