export const ComparisonType = {
    none: null,
    moreIsBetter: "moreIsBetter",
    lessIsBetter: "lessIsBetter",
}

const LAPTOP_PROPERTIES = {
    model: ["Model", ""],
    producentCode: ["Kod producenta", ""],
    batterySizeWH: ["Rozmiar baterii w WH", "Rozmiar baterii w wato godzinach", ComparisonType.moreIsBetter],
    batterySizeMAH: ["Rozmiar baterii w MAH", "Rozmiar baterii w mega ampero godzinach", ComparisonType.moreIsBetter],
    color: ["Kolor", ""],
    weight: ["Waga", "", ComparisonType.lessIsBetter],
    width: ["Szerokość", ""],
    length: ["Długość", ""],
    depth: ["Głębokość", ""],
    ramAmount: ["Pamięć RAM", `W pamięci RAM są przetrzymywane uruchomione gry i programy.
Gdy pamięć RAM ulega zapełnieniu zaczyna być używana wolnejsza pamięć komputera.`, ComparisonType.moreIsBetter],
    ramFrequency: ["Taktowanie RAM", "", ComparisonType.moreIsBetter],
    ramNumberOfSlots: ["Liczba slotów RAM", "Niektóre laptopy pozwalają na dokładanie pamięci RAM w postaci slotów.", ComparisonType.moreIsBetter],
    ramNumberOfFreeSlots: ["Liczba wolnych slotów RAM", "Niektóre laptopy pozwalają na dokładanie pamięci RAM w postaci slotów.", ComparisonType.moreIsBetter],
    ramType: ["Typ pamięci RAM", "Technologia w której wykonano, pamięci, im nowsza typ szybciej będzie działać."],
    ramMaxAmount: ["Maksymalna ilość RAM", "", ComparisonType.moreIsBetter],
    driveStorage: ["Wielkość dysku twardego", "Im większy dysk tym więcej plików i programów zmieści się na komputerze", ComparisonType.moreIsBetter],
    driveType: ["Typ dysku twardego", "Dyski w technologii SSD są szybsze i przyspeszają start komputera"],
    processor: ["Procesor", "Procesor CPU wpływa na ogólną prędkość komputera.", ComparisonType.moreIsBetter],
    screen: ["Ekran", ""],
    graphics: ["GPU", "Procesor GPU jest używany do wyświetlania obiektów na ekranie.", ComparisonType.moreIsBetter],
    communications: ["Komunikacja", ""],
    drives: ["Napędy", ""],
    connections: ["Gniazda", ""],
    controls: ["Sterowanie", `Komponenty służące do komunikacji z komputerem, 
  np.: klawiatura, touchpad, ekran.`],
    price : ["Przybliżona cena", "", ComparisonType.lessIsBetter],
}

export function getTranslationDescriptionAndComparisonType(name) {
    if (name in LAPTOP_PROPERTIES) {
        if (LAPTOP_PROPERTIES[name].length === 2) {
            return [...LAPTOP_PROPERTIES[name], ComparisonType.none]
        } else {
            return LAPTOP_PROPERTIES[name];
        }
    } else {
        return [name, "", ComparisonType.none]
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