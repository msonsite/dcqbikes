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
        description: 'Op zoek naar een e-bike? Kom gerust langs — we nemen de tijd om te kijken wat bij jou past. Geen druk, geen onnodige opties: wel eerlijk advies, proefrijden en afstellen op jouw lengte. Zo ga je naar huis met een fiets die écht bij je past.',
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
        description: 'Niet iedereen wil een motor erbij. Voor wie gewoon een degelijke stadsfiets zoekt, naar de bakker, school of station, hebben we Victoria en Oxford in huis. Eenvoudig, comfortabel en afgesteld op jouw lengte. Geen overbodige opties, wel een fiets die jarenlang meegaat.',
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
        description: 'Het meeste werk zit vandaag bij e-bikes: regelmatig onderhoud houdt remmen, versnellingen, batterij en software in orde. We herstellen alle merken, ook als je de fiets elders kocht. Geen afspraak nodig voor de meeste jobs. Klaar? Dan krijg je een SMS.',
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
        description: 'Kom je voor een onderdeel of accessoire, dan weet je meestal al wat je zoekt — en dat hebben we vaak liggen. Remblokken, kettingen, banden, sloten, tassen, kinderzitjes: voor wie zelf herstelt of iets wil bijbestellen. Past het niet of weet je het niet zeker? Vraag het even, we denken mee.',
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
        description: 'Met EGO Power+ start je toestel meteen — geen trekkoord, geen stank, geen lawaai. Veel klanten stappen over van benzine omdat elektrisch sneller en aangenamer is. Grasmaaier, bladblazer, trimmer: één batterij voor al je apparaten. Kom gerust eens kijken in de winkel.',
        brandsLabel: 'Ons merk',
        brands: [
            { name: 'EGO', logo: 'assets/images/brands/large/ego-logo.png', url: 'https://egopowerplus.be/' }
        ]
    }
];
