/**
 * ============================================================
 * UITGELICHTE FIETSEN — hier beheer je wat er op de site staat
 * ============================================================
 *
 * Hoe toevoegen?
 * 1. Zet de foto in:  assets/images/uitgelicht/
 * 2. Kopieer hieronder een blok { ... },
 * 3. Vul image / brand / model / price in
 * 4. (Optioneel) brandLogo — override logo-pad als de merkmapping niet klopt
 * 5. (Optioneel) description — wordt momenteel niet getoond,
 *    handig als je later details wilt tonen
 *
 * Hoe verwijderen?
 * - Verwijder het hele { ... }-blok (inclusief de komma)
 *
 * Tips:
 * - Laat FEATURED_BIKES leeg ([]) om de hele sectie te verbergen
 * - Volgorde = weergavevolgorde (bovenste eerst)
 * - Prijs is een getal zonder € of puntjes: 2999 → wordt € 2.999
 * - image-pad: relatief vanaf de site-root, of alleen bestandsnaam
 *   (dan zoekt hij in assets/images/uitgelicht/)
 */
const FEATURED_BIKES = [
  {
    image: "victoriatresalo5.webp",
    brand: "Victoria",
    model: "Tresalo 5 Wave",
    price: 2999,
    description:
      "Allrounder voor stad en platteland. Bosch Performance Line, 540 Wh accu, Nexus 5, kettingaandrijving en Purion 200 display.",
  },
  {
    image: "victoriatresalo7.avif",
    brand: "Victoria",
    model: "Tresalo 7 Wave",
    price: 3499,
    description:
      "Veelzijdige e-bike voor stad en tochten. Bosch Performance Line, 540 Wh accu, Nexus 5, Gates riemaandrijving en Kiox 300 display.",
  },
  {
    image: "victoriatresalo9.avif",
    brand: "Victoria",
    model: "Tresalo 9 Trapeze",
    price: 3999,
    description:
      "Comfortabele e-bike met trapeze-frame. Bosch Performance Line, 800 Wh accu, Nexus 5, Gates riemaandrijving en Kiox 300 display.",
  },
  {
    image: "conwaycaironcfs.avif",
    brand: "Conway",
    model: "Cairon C FS 2.0",
    price: 4199,
    description:
      "Volledig geveerde e-SUV. Bosch Performance Line PX, 800 Wh PowerTube, Shimano Cues 9-speed en Purion 200 display.",
  },
  {
    image: "nortacitytourbgreen.webp",
    brand: "Norta",
    model: "City&Tour B-4050",
    price: 4999,
    description:
      "Comfortabele city- en toer-e-bike. Bosch Performance Line PX (90 Nm), PowerTube 600 Wh, Enviolo Automatiq, Gates riem en Purion 200 display.",
  },
  {
    image: "victoriafybron8diamant.avif",
    brand: "Victoria",
    model: "Fybron 8 Diamant",
    price: 7999,
    description:
      "Lichte carbon allroad. Bosch Performance Line CX, PowerTube 750 Wh, SRAM Eagle AXS 12-speed, FOX AWL-vork en Magura MT7 remmen.",
  },
];
