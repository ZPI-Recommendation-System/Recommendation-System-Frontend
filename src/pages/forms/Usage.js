import { Choice, Option } from './Choice';

function Usage() {
  return <Choice
  multiple={false}
  id="usage"
  options={[
    new Option(
      "Aplikacje biurowe i internet",
      "Word, PowerPoint, Zoom",
        "usage/office.png"),
    new Option(
      "Gry indie i retro",
      "Minecraft, Roblox, Don’t Starve, Terraria",
      "usage/indie.png"),
      new Option(
        "Modelowanie 3D i digital art",
        "Blender, Maya, Krita, Photoshop",
        "usage/modeling.png"),
      new Option(
        "Najnowsze gry wysokobudżetowe",
        "Farcry, Battlefield, Assassin's Creed",
        "usage/AAA.png")
  ]}
  />
};

export default Usage;
