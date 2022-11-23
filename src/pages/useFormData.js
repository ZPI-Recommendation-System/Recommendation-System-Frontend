import { useSelector } from 'react-redux';

const TRANSLATIONS = {
    "data": "dataPreferences",
    "Napęd CD": "diskDrive",
    "Czytnik kart pamięci": "sdCardReader",
    "internet": "internetPreferences",
    "Slot na kartę SIM": "simCard",
    "Gniazdo LAN": "lanPort",
    "ram in units": "ramInUnits",
    "usage": "usageType",
    "price in units": "maxPricePLN",
    "size": "preferredScreenSizes",
    "screen": "screenPreferences",
    "Ekran dotykowy": "touchScreen",
    "HDMI": "HDMI",
    "Inne złącza wideo": "otherVideoConnectors",
    "battery in units": "batteryRunTime",
    "disk in units": "minDiscSize"
}

function isObject(yourVariable) {
    return typeof yourVariable === 'object' &&
        !Array.isArray(yourVariable) &&
        yourVariable !== null
}

function translate(obj) {
    const translatedResult = {}
    for (let [key, value] of Object.entries(obj)) {
        if (key in TRANSLATIONS) {
            key = TRANSLATIONS[key];
        }
        translatedResult[key] = isObject(value) ? translate(value) : value;
    }
    return translatedResult;
}

function formDataToRequest(data) {
    const result = { ...data }
    if ("usage" in result) {
        const checked = Object.entries(result["usage"]).find(e => e[1]);
        if (checked) {
            result["usage"] = checked[0];
        }
    }
    if ("size" in result) {
        result["size"] = Object.entries(result["size"])
            .filter(([key, value]) => value && key !== "Kartka A4" && key !== ">17")
            .map(([key, value]) => key);
    }
    const translatedResult = translate(result)
    if ("screenPreferences" in translatedResult)
        translatedResult.screenPreferences.touchScreen = false;

    return translatedResult;
}

function useFormData() {
    const forms = useSelector(state => state.forms);
    const formData = formDataToRequest(forms);
    return formData;
}

export default useFormData;