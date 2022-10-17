import { Choice, Option } from './Choice';

function ScreenExtras() {
  return <Choice
  id="screen"
  options={[
    new Option(
      "Ekran dotykowy",
      "pozwala wybierać elementy na ekranie naciskając na nie palcem, niestety ekran łatwo jest ubrudzić.",
      "icons8-touchscreen-64.png"),
    new Option(
      "HDMI",
      "jest najczęściej spotykanym złączem wideo, pozwoli ci się połączyć z większością monitorów, telewizorów i rzutników.",
      "icons8-hdmi-24.png"),
    new Option(
      "Inne złącza wideo",
      "np. micro HDMI, czesto pojawiają się w starszych lub ultra cienkich laptopach. Po dokupieniu kabla lub przejściówki będą mogły być używane tak samo jak HDMI.",
      "icons8-hdmi-64.png")
  ]} />
};

export default ScreenExtras;
