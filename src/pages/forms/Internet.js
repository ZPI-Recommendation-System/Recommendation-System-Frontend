import { Choice, Option } from './Choice';

function Internet() {
  return <Choice
  options={[
    new Option(
      "Slot na kartę SIM",
      "pozwala wybierać elementy na ekranie naciskając na nie palcem, niestety ekran łatwo jest ubrudzić.",
      "icons8-touchscreen-64.png"),
    new Option(
      "Gniazdo LAN",
      "jest najczęściej spotykanym złączem wideo, pozwoli ci się połączyć z większością monitorów, telewizorów i rzutników.",
      "icons8-hdmi-24.png")
  ]} />
};

export default Internet;
