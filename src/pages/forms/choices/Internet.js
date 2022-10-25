import { Choice, Option } from './Choice';

function Internet() {
  return <Choice
  id="internet"
  options={[
    new Option(
      "Slot na kartę SIM",
      "pozwala wybierać elementy na ekranie naciskając na nie palcem, niestety ekran łatwo jest ubrudzić.",
      "icons/icons8-sim-96.png"),
    new Option(
      "Gniazdo LAN",
      "jest najczęściej spotykanym złączem wideo, pozwoli ci się połączyć z większością monitorów, telewizorów i rzutników.",
      "icons/icons8-ethernet-64.png")
  ]} 
  extraText="Te komponenty nie są ci koniecznie potrzebne.
  Bez nich możesz udostępniać internet z telefonu, podłączyć się z publicznym wifi 
  lub dokupić kartę sieciową USB za kilkadziesiąt złotych."
  />
};

export default Internet;
