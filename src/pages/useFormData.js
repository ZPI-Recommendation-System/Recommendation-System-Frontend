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

const FORM_DEFAULTS = {
    "usageType": "Modelowanie 3D i digital art",
    "dataPreferences": {
      "diskDrive": false,
      "sdCardReader": false
    },
    "preferredScreenSizes": [],
    "screenPreferences": {
      "touchScreen": false,
      "HDMI": false,
      "otherVideoConnectors": false
    },
    "internetPreferences": {
      "simCard": false,
      "lanPort": false
    },
    "ram": 0,
    "ramInUnits": 0.0,
    "disk": 100,
    "minDiscSize": 100,
    "price": Number.MAX_SAFE_INTEGER,
    "maxPricePLN": Number.MAX_SAFE_INTEGER,
    "battery": 1,
    "batteryRunTime": 1
  }

function formDataToRequest(data) {
    const result = { ...data }
    if ("usage" in result) {
        const checked = Object.entries(result["usage"]).find(e => e[1]);
        if (checked) {
            result["usage"] = checked[0];
        }
        // TOREMOVE:
        result["usage"] = "Aplikacje biurowe i internet";
    }
    if ("size" in result) {
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }
        result["size"] = Object.entries(result["size"])
            .filter(([key, value]) => value && key !== "Kartka A4" && key !== ">17")
            .filter(onlyUnique)
            .map(([key, value]) => key);
    }
    const translatedResult = translate(result)
    if ("screenPreferences" in translatedResult)
        translatedResult.screenPreferences.touchScreen = false;

    // "minDiscSize must not be less than 100"
    result["disk in units"] = Math.max(result["disk in units"], 100);

    // backend breaks when there are missing fields in form data
    const withDefaults = { ...FORM_DEFAULTS, ...translatedResult }
    return withDefaults;
}

function useFormData() {
    const forms = useSelector(state => state.forms);
    const formData = formDataToRequest(forms);
    return formData;
}

export default useFormData;