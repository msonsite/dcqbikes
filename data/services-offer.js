/**
 * Ons aanbod — data
 * Pas titels, teksten, afbeeldingen en merken hier aan.
 */
const SERVICES_OFFER = [
    {
        id: 'electric',
        title: 'Elektrische fietsen',
        icon: 'fa-bolt',
        image: 'assets/images/onsaanbod/IMG_7734.jpg',
        description: 'Elektrische fietsen combineren jouw trapkracht met een elektrische motor en accu, waardoor je makkelijker langere afstanden, hellingen en woon‑werktrajecten kunt doen. In onze winkel kijk je samen met een expert welk type e‑bike het best aansluit op jouw ritten. Of het nu gaat om compacte stadsmodellen, all‑round e-bikes of iets dat daar tussenin ligt.',
        brandsLabel: 'Onze merken',
        brands: [
            { name: 'Victoria', logo: 'assets/images/brands/large/victoria-groot.png', url: 'https://www.victoria-bikes.com/nl/' },
            { name: 'Norta', logo: 'assets/images/brands/large/norta.png', url: 'https://norta.be/nl/home' },
            { name: 'Conway', logo: 'assets/images/brands/large/conway.png', url: 'https://www.conway-bikes.com/nl/' },
            { name: 'Oxford', logo: 'assets/images/brands/large/oxfordlogo.webp', url: 'https://www.oxfordbikes.be/' },
            { name: 'Qio', logo: 'assets/images/brands/large/qio.png', url: 'https://www.qio-bikes.com/nl/' }
        ]
    },
    {
        id: 'city',
        title: 'Stadsfietsen',
        icon: 'fa-bicycle',
        image: 'assets/images/onsaanbod/IMG_8020.jpg',
        description: 'Onze selectie Victoria‑ en Oxford‑stadsfietsen draait om eenvoud, comfort en degelijkheid. Deze fietsen zijn ontworpen voor dagelijks gebruik — scherpe wendbaarheid, betrouwbare onderdelen en een zithouding die je helpt ontspannen door de stad of buurt te bewegen. Iedere fiets wordt door onze technici afgesteld, afgestemd op jouw maat en voorkeur.',
        brandsLabel: 'Onze merken',
        brands: [
            { name: 'Victoria', logo: 'assets/images/brands/large/victoria-groot.png', url: 'https://www.victoria-bikes.com/nl/' },
            { name: 'Oxford', logo: 'assets/images/brands/large/oxfordlogo.webp', url: 'https://www.oxfordbikes.be/' }
        ]
    },
    {
        id: 'repair',
        title: 'Onderhoud & herstel',
        icon: 'fa-wrench',
        image: 'assets/images/onsaanbod/IMG_7875.jpg',
        description: 'Fietsonderhoud is meer dan “even nalopen”. Wij voeren gecontroleerde beurten uit volgens fabrikantstandaarden, inspecteren remmen en versnellingen, stellen elektra en mechaniek precies af, en brengen je fiets in optimale staat. Of het nu om kabelspanning, trapas, velgen of software‑diagnose gaat: onze monteurs pakken het gestructureerd aan met het juiste gereedschap en ervaring.',
        brandsLabel: 'Enkele van onze partners',
        brands: [
            { name: 'Shimano', logo: 'assets/images/brands/small/shimano.png', url: 'https://www.shimano.com/' },
            { name: 'Bosch', logo: 'assets/images/brands/small/bosch.png', url: 'https://www.bosch-ebike.com/' },
            { name: 'Michelin', logo: 'assets/images/brands/small/michelin.png', url: 'https://www.michelin.com/' }
        ]
    },
    {
        id: 'parts',
        title: 'Onderdelen & accessoires',
        icon: 'fa-puzzle-piece',
        image: 'assets/images/onsaanbod/IMG_7736.jpg',
        description: 'Van specifieke onderdelen zoals remmen, kettingen en verlichting tot praktische accessoires zoals tassen, manden, sloten en kinderzitjes: we bieden een uitgebreid assortiment dat aansluit op echte functionele behoeften. Alle componenten zijn gericht op veiligheid, compatibiliteit en meer comfort onderweg, zodat je fiets precies doet wat je verwacht.',
        brandsLabel: 'Enkele van onze merken',
        brands: [
            { name: 'Abus', logo: 'assets/images/brands/medium/abus.webp', url: 'https://www.abus.com/' },
            { name: 'Basil', logo: 'assets/images/brands/medium/basil.webp', url: 'https://www.basil.nl/' },
            { name: 'Axa', logo: 'assets/images/brands/medium/axa.avif', url: 'https://www.axa-security.com/' }
        ]
    },
    {
        id: 'garden',
        title: 'Grasmaaiers & tuin',
        icon: 'fa-leaf',
        image: 'assets/images/onsaanbod/IMG_7748.jpg',
        description: 'Je tuin onderhouden zonder lawaai of uitstoot. EGO Power+ geeft je alles wat je nodig hebt: grasmaaiers, bladblazers, trimmers en nog veel meer. Allemaal stil, krachtig en volledig elektrisch. En het slimste? Eén batterij past in al je apparaten. Eén keer investeren, jarenlang genieten van een perfect onderhouden tuin.',
        brandsLabel: 'Ons merk',
        brands: [
            { name: 'EGO', logo: 'assets/images/brands/large/ego-logo.png', url: 'https://egopowerplus.be/' }
        ]
    }
];
