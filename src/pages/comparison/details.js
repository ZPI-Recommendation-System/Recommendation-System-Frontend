
const LAPTOP_PROPERTIES = {
    model: ["Model", "", false],
    producentCode: ["Kod producenta", "", false],
    batterySizeWH: ["Rozmiar baterii w WH", "Rozmiar baterii w wato godzinach", true],
    batterySizeMAH: ["Rozmiar baterii w MAH", "Rozmiar baterii w mega ampero godzinach", true],
    color: ["Kolor", "", false],
    weight: ["Waga", "", false],
    width: ["Szerokość", "", false],
    length: ["Długość", "", false],
    depth: ["Głębokość", "", false],
    ramAmount: ["Pamięć RAM", `W pamięci RAM są przetrzymywane uruchomione gry i programy.
Jeżeli pamięć RAM jest dla nich zbyt niska będą one musiały przechowywać 
dane tymczasowe na dysku co spowoduje zacięcia.`, true],
    ramFrequency: ["Taktowanie RAM", "", true],
    ramNumberOfSlots: ["Liczba slotów RAM", "Niektóre laptopy pozwalają na dokładanie pamięci RAM w postaci slotów.", true],
    ramNumberOfFreeSlots: ["Liczba wolnych slotów RAM", "Niektóre laptopy pozwalają na dokładanie pamięci RAM w postaci slotów.", true],
    ramType: ["Typ pamięci RAM", "Technologia w której wykonano, pamięci, im nowsza typ szybciej będzie działać.", false],
    ramMaxAmount: ["Maksymalna ilość RAM", "", true],
    driveStorage: ["Wielkość dysku twardego", "", true],
    driveType: ["Typ dysku twardego", "Dyski w technologii SSD są szybsze i przyspeszają start komputera", false],
    processor: ["Procesor", "Procesor wpływa na ogólną prędkość komputera.", false],
    screen: ["Ekran", "Właściwości ekranu komputera.", false],
    graphics: ["GPU", "Procesor GPU jest używany do wyświetlania obiektów na ekranie.", false],
    communications: ["Komunikacja", "", false],
    drives: ["Napędy", "", false],
    connections: ["Gniazda", "", false],
    controls: ["Sterowanie", `Komponenty służące do komunikacji z komputerem, 
  np.: klawiatura, touchpad, ekran.`]
}

export function getTranslationDescriptionAndComparable(name) {
    if (name in LAPTOP_PROPERTIES) {
        return LAPTOP_PROPERTIES[name];
    } else {
        return [name, "", false]
    }
}

export function processDetails(details) {

    const withIds = ["screen", "graphics", "processor"]
    const singleFieldObjectsArrays = ["controls", "communications", "connections", "drives"]

    details.graphics = `${details.graphics.graphicsCardModel}
    VRAM: ${details.graphics.graphicsCardVRam ?? "?"}
    Wydajność: ${details.graphics.benchmark.benchmark} pkt`

    details.processor = `${details.processor.model}
    Liczba rdzeni: ${details.processor.cores}
    Taktowanie: ${details.processor.frequency}
    Wydajność: ${details.processor.benchmark.benchmark} pkt`

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
        } else if (typeof value === 'object' && key!=="images") {
            details[key] = JSON.stringify(value, null, 1).replace(/["'{}[\],]/g, "")
        }
    }
}