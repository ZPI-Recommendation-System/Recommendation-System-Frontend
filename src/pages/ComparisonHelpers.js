
const LAPTOP_PROPERTIES = {
    model: ["Model", ""],
    producentCode: ["Kod producenta", ""],
    batterySizeWH: ["Rozmiar baterii w WH", "Rozmiar baterii w wato godzinach"],
    batterySizeMAH: ["Rozmiar baterii w MAH", "Rozmiar baterii w mega ampero godzinach"],
    color: ["Kolor", ""],
    weight: ["Waga", ""],
    ramAmount: ["Pamięć RAM", `W pamięci RAM są przetrzymywane uruchomione gry i programy.
Jeżeli pamięć RAM jest dla nich zbyt niska będą one musiały przechowywać 
dane tymczasowe na dysku co spowoduje zacięcia.`],
    ramFrequency: ["Taktowanie RAM", ""],
    ramNumberOfSlots: ["Liczba slotów RAM", "Niektóre laptopy pozwalają na dokładanie pamięci RAM w postaci slotów."],
    ramNumberOfFreeSlots: ["Liczba wolnych slotów RAM", "Niektóre laptopy pozwalają na dokładanie pamięci RAM w postaci slotów."],
    ramType: ["Typ pamięci RAM", "Technologia w której wykonano, pamięci, im nowsza typ szybciej będzie działać."],
    ramMaxAmount: ["Maksymalna ilość RAM", ""],
    driveStorage: ["Wielkość dysku twardego", ""],
    driveType: ["Typ dysku twardego", "Dyski w technologii SSD są szybsze i przyspeszają start komputera"],
    processor: ["Procesor", "Procesor wpływa na ogólną prędkość komputera."],
    screen: ["Ekran", "Właściwości ekranu komputera."],
    graphics: ["GPU", "Procesor GPU jest używany do wyświetlania obiektów na ekranie."],
    communications: ["Komunikacja", ""],
    drives: ["Napędy", ""],
    connections: ["Gniazda", ""],
    controls: ["Sterowanie", `Komponenty służące do komunikacji z komputerem, 
  np.: klawiatura, touchpad, ekran.`]
}

export function getTranslationAndDescription(name) {
    if (name in LAPTOP_PROPERTIES) {
        return LAPTOP_PROPERTIES[name];
    } else {
        return [name, ""]
    }
}

export function processDetails(details) {
    delete details.id;
    delete details.name;
    delete details.images;
    delete details.type;

    delete details.producentCode;
    delete details.driveType;

    delete details.model;
    delete details.screen?.screenType;
    delete details.graphics?.graphicsCardType;
    delete details.processor?.series;

    const withIds = ["screen", "graphics", "processor"]
    const singleFieldObjectsArrays = ["controls", "communications", "connections", "drives"]

    details.graphics = `${details.graphics.graphicsCardModel}
  VRAM: ${details.graphics.graphicsCardVRam ?? "?"}`

    details.processor = `${details.processor.model}
  Liczba rdzeni: ${details.processor.cores}
  Taktowanie: ${details.processor.frequency}`

    details.screen = `Rozdzielczość ${details.screen.resolution}
  Przekątna ${details.screen.diagonalScreenInches} cali
  Powierzchnia: ${details.screen.screenFinish}`
        + (details.screen.refreshRate ? ("\nSzybkość odświeżania: " + details.screen.refreshRate + "Hz") : "")
        + (details.screen.touchScreen ? "Ekran dotykowy" : "")

    for (const field of withIds) {
        if (details[field]) {
            delete details[field].id;
        }
    }

    for (const field of singleFieldObjectsArrays) {
        if (!(field in details)) {
            continue;
        }
        const processed = []
        for (const value of details[field]) {
            processed.push("- " + Object.values(value)[0].toString())
        }
        details[field] = processed
    }

    for (const [key, value] of Object.entries(details)) {
        if (value === null || value === undefined || value.length === 0) {
            delete details[key];
        } else if (typeof value === 'object') {
            details[key] = JSON.stringify(value, null, 1).replace(/["'{}[\],]/g, "")
        }
    }
}
