/**
 * Ons aanbod — data
 * Pas titels, teksten, afbeeldingen en merken hier aan.
 */
const SERVICES_OFFER = [
    {
        id: 'electric',
        title: 'Elektrische fietsen',
        icon: 'fa-bolt',
        image: 'assets/images/onsaanbod/IMG_7908.jpg',
        description: 'Op zoek naar een e-bike die écht bij je past? Bij DCQ Bikes nemen we de tijd om naar jouw wensen te luisteren. Of je nu dagelijks naar het werk fietst of graag lange tochten maakt, we helpen je de juiste keuze te maken. Je kan verschillende modellen proefrijden en we stellen je fiets perfect af op jouw lengte en zithouding. Zo vertrek je met een e-bike waar je jarenlang zorgeloos van geniet.',
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
        image: 'assets/images/onsaanbod/IMG_7963.jpg',
        description: 'Een goede stadsfiets moet vooral betrouwbaar en comfortabel zijn. Daarom kiezen we bewust voor kwaliteitsmerken zoals Victoria en Oxford. Ideaal voor dagelijkse verplaatsingen naar het werk, school of de winkel. Geen overbodige technologie, wel een degelijke fiets die jarenlang meegaat en volledig wordt afgesteld op jouw voorkeur.',
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
        image: 'assets/images/onsaanbod/IMG_7891.jpg',
        description: 'Een goed onderhouden fiets rijdt niet alleen aangenamer, maar gaat ook langer mee. In onze eigen werkplaats voeren we onderhoud en herstellingen uit aan zowel gewone fietsen als e-bikes, ongeacht waar je ze kocht. Voor de meeste herstellingen hoef je zelfs geen afspraak te maken. Zodra je fiets klaarstaat, brengen we je via sms op de hoogte.',
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
        image: 'assets/images/onsaanbod/IMG_8073.jpg',
        description: 'Van een degelijk slot tot een comfortabele fietstas of een veilige kinderstoel: de juiste accessoires maken elke rit aangenamer. Daarnaast vind je bij ons ook verlichting, banden, helmen en tal van andere onderdelen. We helpen je graag kiezen wat het beste past bij jouw fiets en hoe je die gebruikt.',
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
        image: 'assets/images/onsaanbod/IMG_7992.jpg',
        description: 'Ook voor tuinmachines ben je bij DCQ Bikes aan het juiste adres. Met EGO Power+ kies je voor krachtige accu-aangedreven machines die stil, gebruiksvriendelijk en onderhoudsarm zijn. Van grasmaaiers en bladblazers tot trimmers en heggenscharen: één batterij werkt op het volledige assortiment. Kom gerust langs en ontdek zelf hoe aangenaam elektrisch tuinieren is.',
        brandsLabel: 'Ons merk',
        brands: [
            { name: 'EGO', logo: 'assets/images/brands/large/ego-logo.png', url: 'https://egopowerplus.be/' }
        ]
    }
];
