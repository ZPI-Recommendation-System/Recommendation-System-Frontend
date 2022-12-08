import Slider from './Slider';
import { API_URL } from "../../../api/api"
import useFormData from '../../useFormData';

async function count(usageType, maxPrice) {
    const result = await fetch(API_URL+"recommendations/usagecount?usageType="+usageType+"&maxPrice="+maxPrice)
    const asJson = await result.json();
    return asJson;
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
    ["Bez limitu", Number.MAX_SAFE_INTEGER] 
    ]}
    prompt = {"Wybierz maksymalną cenę:"}
    summary = {async value =>{
        const {price, all} = await count(formData["usageType"], value);

        return <><p className="text">
            W tym budżecie masz do wyboru:
        </p>
         <p className="text">{price} laptopów do wybranego zastosowania</p>
         <p className="text">z {all} laptopów dostępnych w systemie</p>
        </>}
    }
    startWithMax={true}
    />
}

export default Price;
