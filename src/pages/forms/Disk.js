import Slider from './Slider';

function Disk() {
  return <Slider
    id="disk"
    points = {[
    "100 GB",
    "500 GB",
    "1 TB",
    "2 TB"
    ]}
    prompt = {"Wybierz minimalny rozmiar wbudowanego dysku"}
    summary = {value => (
        <><p className="text">
            Na twoim dysku zmieści się co najmniej:
        </p>
        <ul className="text">
        <li>Windows 11</li>
        <li>10 gier / aplikacji</li>
        <li>100 zdjęć / obrazów</li>
        </ul>
        </>
    )} />
}

export default Disk;
