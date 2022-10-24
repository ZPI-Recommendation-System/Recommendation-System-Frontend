import Slider from './Slider';

// https://www.easeus.com/resource/windows-11-size.html
const WINDOWS_11_GB_SIZE = 64
// https://www.systemrequirementslab.com/cyri/requirements/battlefield-4/11804
const BATTLEFIELD_4_GB_SIZE = 30
// https://blender.stackexchange.com/questions/75888/how-much-space-does-blender-take-up-on-a-computer
const BLENDER_3D_GB_SIZE = 0.3
// https://www.quora.com/What-is-the-average-file-size-of-a-smartphone-camera-picture-in-2018
const SMARTPHONE_PHOTO_GB_SIZE = 0.0032
const GAMES_PART = 0.5
const PROGRAMS_PART = 0.3
const IMAGES_PART = 0.2

function gamesByCount(count) {
    if (count == 1) {
        return "gra";
    } else if (
    // 22 gry
    (count%10>1 && count%10 <= 4) && 
    // 11, 12 gier
    !(count > 10 && count < 20)) {
        return "gry";
    } else {
        return "gier";
    }
}

function Disk() {
  return <Slider
    id="disk"
    points = {[
    ["100 GB", 100],
    ["500 GB", 500],
    ["1 TB", 1000],
    ["2 TB", 2000],
    ]}
    prompt = {"Wybierz minimalny rozmiar wbudowanego dysku"}
    summary = {function (value) {
        const withoutWindows = value - WINDOWS_11_GB_SIZE;
        const games = Math.floor((GAMES_PART * withoutWindows) / BATTLEFIELD_4_GB_SIZE);
        const programs = Math.floor((PROGRAMS_PART * withoutWindows) / BLENDER_3D_GB_SIZE);
        const photos = Math.floor((IMAGES_PART * withoutWindows) / SMARTPHONE_PHOTO_GB_SIZE);
        return <><p className="text">
            Na twoim dysku zmieści się co najmniej: 
        </p>
        <ul className="text">
        <li>Windows 11</li>
        {games > 0 &&
            <li>{games} {gamesByCount(games)} AAA</li>}
        <li>{programs} programów / gier indie</li>
        <li>{photos} zdjęć / obrazów</li>
        </ul>
        </>
    }} />
}

export default Disk;
