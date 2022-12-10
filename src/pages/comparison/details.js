
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
Gdy pamięć RAM ulega zapełnieniu zaczyna być używana wolnejsza pamięć komputera.`, true],
    ramFrequency: ["Taktowanie RAM", "", true],
    ramNumberOfSlots: ["Liczba slotów RAM", "Niektóre laptopy pozwalają na dokładanie pamięci RAM w postaci slotów.", true],
    ramNumberOfFreeSlots: ["Liczba wolnych slotów RAM", "Niektóre laptopy pozwalają na dokładanie pamięci RAM w postaci slotów.", true],
    ramType: ["Typ pamięci RAM", "Technologia w której wykonano, pamięci, im nowsza typ szybciej będzie działać.", false],
    ramMaxAmount: ["Maksymalna ilość RAM", "", true],
    driveStorage: ["Wielkość dysku twardego", "", true],
    driveType: ["Typ dysku twardego", "Dyski w technologii SSD są szybsze i przyspeszają start komputera", false],
    processor: ["Procesor", "Procesor CPU wpływa na ogólną prędkość komputera.", true],
    screen: ["Ekran", "", false],
    graphics: ["GPU", "Procesor GPU jest używany do wyświetlania obiektów na ekranie.", true],
    communications: ["Komunikacja", "", false],
    drives: ["Napędy", "", false],
    connections: ["Gniazda", "", false],
    controls: ["Sterowanie", `Komponenty służące do komunikacji z komputerem, 
  np.: klawiatura, touchpad, ekran.`],
    price : ["Przybliżona cena", "Cena jest przewidywana na bazie cen z przeszłości więc może nie być dokładna", false]
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
    
    const withUnits = [
        ["batterySizeWH", "WH"],
        ["batterySizeMAH", "MAH"],
        ["weight", "kg"],
        ["width", "cm"],
        ["length", "cm"],
        ["depth", "cm"],
        ["ramFrequency", "MHz"],
        ["ramAmount", "GB"],
        ["ramMaxAmount", "GB"],
        ["driveStorage", "GB"],
    ]

    details.graphics = [`${details.graphics.graphicsCardModel}
    VRAM: ${details.graphics.graphicsCardVRam ?? "?"}
    Wydajność: ${details.graphics.benchmark.benchmark} pkt`, details.graphics.benchmark.benchmark]

    details.processor = [`${details.processor.model}
    Liczba rdzeni: ${details.processor.cores}
    Taktowanie: ${details.processor.frequency} GHz
    Wydajność: ${details.processor.benchmark.benchmark} pkt`, details.processor.benchmark.benchmark]

    details.screen = `Rozdzielczość ${details.screen.resolution}
  Przekątna ${details.screen.diagonalScreenInches} cali
  Powierzchnia: ${details.screen.screenFinish}`
        + (details.screen.refreshRate ? ("\nSzybkość odświeżania: " + details.screen.refreshRate + "Hz") : "")
        + (details.screen.touchScreen ? "Ekran dotykowy" : "")
    
    for (const [key, unit] of withUnits) {
        if (details[key]) {
            details[key] = [details[key] + " " + unit, details[key]]
        }
    }

    if (details.price===0) {
        details.price = "-"
    } else {
        details.price = ["~"+ details.price + " zł", details.price]
    }

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
        details[field] =  processed.join("\n")
    }

    for (const [key, value] of Object.entries(details)) {
        if (value === null || value === undefined || value.length === 0) {
            delete details[key];
        }
    }
}