export const site = {
  name: "Kabelanschluss VF",
  domain: "https://kabelanschluss-vf.de",
  title: "Kostenlose Vodafone Beratung",
  description:
    "Kostenlose persönliche Vodafone Beratung für Wietze, Celle, Hannover und Umgebung: Internet, Glasfaser, Kabel je nach Adresse, DSL, Mobilfunk und TV.",
  phone: "+4915126915595",
  phoneDisplay: "+49 1512 6915595",
  email: "j.mirzo@vertriebspartner-vfkd.de",
  advisor: "Jan Mirzo",
  role: "Vodafone Vertriebspartner",
  whatsapp:
    "https://wa.me/4915126915595?text=Hallo%20Jan%2C%20ich%20moechte%20eine%20kostenlose%20Vodafone%20Beratung.%20Es%20geht%20um%20Internet%2C%20Glasfaser%2C%20Kabel%2C%20DSL%2C%20Mobilfunk%20oder%20TV."
};

export const assets = {
  logo: "/assets/vodafone-logo.svg",
  fiberBuild: "/assets/vodafone-glasfaser-baustelle.jpeg",
  coax: "/assets/koaxialkabel-aufbau.jpg",
  networkCompare: "/assets/netzvergleich-dsl-glasfaser-kabel.jpg",
  gigaNetwork: "/assets/giga-glasfaser-netz.webp",
  docsis: "/assets/docsis-evolution.webp",
  networkExpansion: "/assets/glasfaser-kabelnetz-ausbau.jpg",
  fiberInside: "/assets/glasfaser-innenansicht.jpg",
  fiberHouse: "/assets/glasfaser-im-haus.png",
  connectivity: "/assets/home-router-editorial-v2.jpg"
};

export const navItems = [
  { href: "/", label: "Start" },
  { href: "/#beratung", label: "Beratung" },
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/verfuegbarkeit-pruefen", label: "Verfügbarkeit" },
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/faq", label: "FAQ" },
  { href: "/#kontakt", label: "Kontakt" }
];

export type LocationPage = {
  slug: string;
  name: string;
  intro: string;
  focus: string;
  nearby: string[];
};

export const locations: LocationPage[] = [
  {
    slug: "vodafone-beratung-wietze",
    name: "Wietze",
    focus: "Glasfaser-Fokus für Wietze",
    intro:
      "Für Zuhause gibt es in Wietze kein Kabelinternet. Deshalb liegt der Schwerpunkt hier auf Glasfaser und der genauen Prüfung deiner Adresse.",
    nearby: ["Celle", "Hambühren", "Winsen (Aller)"]
  },
  {
    slug: "vodafone-beratung-celle",
    name: "Celle",
    focus: "Internet, Kabel je nach Adresse, Glasfaser, Mobilfunk und TV",
    intro:
      "In Celle beraten wir zu Internet, Kabel je nach Adresse, Glasfaser, DSL, Mobilfunk und TV. Welche Lösung möglich ist, zeigt erst die Prüfung der konkreten Adresse.",
    nearby: ["Wietze", "Bergen", "Lachendorf"]
  },
  {
    slug: "vodafone-beratung-hannover",
    name: "Hannover",
    focus: "Vodafone Beratung für Internet, Mobilfunk und TV",
    intro:
      "In Hannover klären wir, welche Vodafone-Produkte zu deiner Adresse, deinem Haushalt und deiner Nutzung passen. Du bekommst eine verständliche Empfehlung und einen klaren nächsten Schritt.",
    nearby: ["Langenhagen", "Isernhagen", "Burgwedel"]
  },
  { slug: "vodafone-beratung-hambuehren", name: "Hambühren", focus: "Internetoptionen je Adresse", intro: "In Hambühren prüfen wir Internet, Glasfaser, Kabel je nach Adresse, DSL, Mobilfunk und TV und erklären dir die verfügbaren Möglichkeiten.", nearby: ["Wietze", "Celle", "Winsen (Aller)"] },
  { slug: "vodafone-beratung-winsen-aller", name: "Winsen (Aller)", focus: "Glasfaser, Internet und Mobilfunk", intro: "Für Winsen (Aller) klären wir Verfügbarkeit, Bedarf und mögliche Kombinationen persönlich und ohne Umweg über eine Hotline.", nearby: ["Wietze", "Hambühren", "Celle"] },
  { slug: "vodafone-beratung-bergen", name: "Bergen", focus: "Verfügbarkeit und Tarifberatung", intro: "In Bergen prüfen wir zuerst die Adresse, besprechen anschließend deinen Bedarf und begleiten die nächsten Schritte.", nearby: ["Celle", "Südheide", "Faßberg"] },
  { slug: "vodafone-beratung-suedheide", name: "Südheide", focus: "Glasfaser, Internet und DSL", intro: "Für die Südheide betrachten wir Ausbau, Adresse und Nutzung gemeinsam. So erfährst du, welche Verbindung zu deinem Zuhause passt.", nearby: ["Hermannsburg", "Unterlüß", "Bergen"] },
  { slug: "vodafone-beratung-hermannsburg", name: "Hermannsburg", focus: "Internet und Glasfaser", intro: "In Hermannsburg prüfen wir Adresse, Hausanschluss und Nutzung, bevor wir eine Empfehlung zu Internet oder Glasfaser geben.", nearby: ["Südheide", "Bergen", "Faßberg"] },
  { slug: "vodafone-beratung-unterluess", name: "Unterlüß", focus: "Glasfaser und DSL", intro: "Für Unterlüß erklären wir, welche Möglichkeiten für Glasfaser, DSL und weitere Vodafone-Produkte an deiner Adresse bestehen.", nearby: ["Südheide", "Eschede", "Hermannsburg"] },
  { slug: "vodafone-beratung-fassberg", name: "Faßberg", focus: "Internet je Adresse", intro: "In Faßberg klären wir, welche Anschlussart verfügbar ist, zu deiner Nutzung passt und wie die Aktivierung abläuft.", nearby: ["Bergen", "Südheide", "Eschede"] },
  { slug: "vodafone-beratung-eschede", name: "Eschede", focus: "Glasfaser und Internet", intro: "Für Eschede prüfen wir Internet, Glasfaser, DSL, Mobilfunk und TV passend zu deiner Adresse und deiner Nutzung.", nearby: ["Lachendorf", "Celle", "Unterlüß"] },
  { slug: "vodafone-beratung-lachendorf", name: "Lachendorf", focus: "Internet und Glasfaser", intro: "In Lachendorf bringen wir technische Möglichkeiten und deinen tatsächlichen Bedarf verständlich zusammen.", nearby: ["Celle", "Eschede", "Wienhausen"] },
  { slug: "vodafone-beratung-wienhausen", name: "Wienhausen", focus: "Internetoptionen", intro: "Für Wienhausen prüfen wir Internet, Glasfaser, Kabel je nach Adresse, DSL und Mobilfunk und empfehlen nur, was zu dir passt.", nearby: ["Celle", "Lachendorf", "Wathlingen"] },
  { slug: "vodafone-beratung-nienhagen", name: "Nienhagen", focus: "Internet je Adresse", intro: "In Nienhagen erhältst du eine persönliche Empfehlung auf Basis von Verfügbarkeit, Haushalt und Nutzung.", nearby: ["Celle", "Wathlingen", "Adelheidsdorf"] },
  { slug: "vodafone-beratung-adelheidsdorf", name: "Adelheidsdorf", focus: "Vodafone Beratung für Zuhause und unterwegs", intro: "Für Adelheidsdorf betrachten wir Internet, Mobilfunk und TV gemeinsam, wenn eine Kombination für deinen Haushalt sinnvoll ist.", nearby: ["Nienhagen", "Celle", "Wathlingen"] },
  { slug: "vodafone-beratung-wathlingen", name: "Wathlingen", focus: "Internet je Adresse", intro: "In Wathlingen prüfen wir deine Adresse und erklären, welche Technik und welcher Tarifbedarf dazu passen.", nearby: ["Nienhagen", "Wienhausen", "Celle"] },
  { slug: "vodafone-beratung-burgdorf", name: "Burgdorf", focus: "Internet und Kabel je nach Adresse", intro: "Für Burgdorf klären wir Kabelinternet je nach Adresse, Glasfaser, DSL, Mobilfunk und TV in einem persönlichen Gespräch.", nearby: ["Uetze", "Burgwedel", "Hannover"] },
  { slug: "vodafone-beratung-burgwedel", name: "Burgwedel", focus: "Internetoptionen im Hannover-Umkreis", intro: "In Burgwedel beginnt die Beratung mit deiner Adresse und endet mit einer Empfehlung, die zu deinem Bedarf passt.", nearby: ["Hannover", "Isernhagen", "Wedemark"] },
  { slug: "vodafone-beratung-wedemark", name: "Wedemark", focus: "Internet je Adresse", intro: "Für die Wedemark prüfen wir Internet, Glasfaser, Kabel je nach Adresse, DSL und Mobilfunk und melden uns persönlich zurück.", nearby: ["Burgwedel", "Langenhagen", "Schwarmstedt"] },
  { slug: "vodafone-beratung-langenhagen", name: "Langenhagen", focus: "Internet, Kabel je nach Adresse und Mobilfunk", intro: "In Langenhagen klären wir, wie Internet zuhause, Mobilfunk und TV sinnvoll zusammenspielen können.", nearby: ["Hannover", "Isernhagen", "Burgwedel"] },
  { slug: "vodafone-beratung-isernhagen", name: "Isernhagen", focus: "Internetoptionen", intro: "Für Isernhagen erklären wir die Möglichkeiten an deiner Adresse verständlich und mit einem direkten Ansprechpartner.", nearby: ["Hannover", "Burgwedel", "Langenhagen"] },
  { slug: "vodafone-beratung-schwarmstedt", name: "Schwarmstedt", focus: "Internet und Glasfaser", intro: "In Schwarmstedt begleiten wir dich von der Verfügbarkeitsprüfung bis zu den nächsten Schritten der Aktivierung.", nearby: ["Wietze", "Wedemark", "Winsen (Aller)"] },
  { slug: "vodafone-beratung-uetze", name: "Uetze", focus: "Internet je Adresse", intro: "Für Uetze prüfen wir Internet, Glasfaser, Kabel je nach Adresse, Mobilfunk und TV und erklären dir die passende Auswahl.", nearby: ["Burgdorf", "Celle", "Hannover"] }
];

export type ServicePage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  icon: string;
  points: string[];
};

export const services: ServicePage[] = [
  {
    slug: "internet-kabel",
    title: "Internet & Kabel Beratung | Vodafone verständlich erklärt",
    h1: "Internet & Kabel Beratung",
    description:
      "Vodafone Internet und Kabel je nach Adresse verständlich einordnen lassen: HFC, Koax, HÜP, Router und Verfügbarkeit erklärt.",
    intro:
      "Ob Kabelinternet an deiner Adresse möglich ist, hängt vom Netz und vom Gebäude ab. Wir erklären HFC, Koaxialkabel und Hausanschluss verständlich.",
    icon: "coax",
    points: ["HFC und Koax verständlich erklärt", "Adresse und Gebäude prüfen", "Möglichkeiten realistisch einordnen"]
  },
  {
    slug: "glasfaser",
    title: "Glasfaser Beratung | Vodafone in Wietze, Celle & Umgebung",
    h1: "Glasfaser Beratung",
    description:
      "Vodafone Glasfaser Beratung für Wietze, Celle, Hannover und Umgebung: Ausbau, Buchbarkeit und Aktivierung verständlich einordnen.",
    intro:
      "Glasfaser wird nach Ausbaugebiet, Buchbarkeit, Hausanschluss und Aktivierung betrachtet. Besonders in Wietze liegt der Fokus klar auf Glasfaser.",
    icon: "fiber",
    points: ["Ausbau und Buchbarkeit unterscheiden", "Hausanschluss einordnen", "Schritte bis zur Aktivierung klären"]
  },
  {
    slug: "dsl",
    title: "DSL Beratung | Vodafone Alternativen prüfen lassen",
    h1: "DSL Beratung",
    description:
      "DSL als mögliche Vodafone Internetlösung prüfen lassen, wenn Glasfaser oder Kabel je nach Adresse nicht passen.",
    intro:
      "DSL kann eine sinnvolle Alternative sein, wenn andere Technologien an der Adresse nicht verfügbar oder nicht passend sind.",
    icon: "router",
    points: ["Verfügbarkeit einordnen", "Bedarf und Nutzung prüfen", "Alternativen sauber vergleichen"]
  },
  {
    slug: "mobilfunk",
    title: "Mobilfunk Beratung | Vodafone Tarife und Zusatzkarten",
    h1: "Mobilfunk Beratung",
    description:
      "Vodafone Mobilfunk Beratung für Celle, Hannover, Wietze und Umgebung: Tarife, Zusatzkarten und Kombi-Möglichkeiten verständlich erklärt.",
    intro:
      "Mobilfunk wird nach echtem Nutzungsverhalten, Familie, Datenbedarf und Kombi-Möglichkeiten betrachtet.",
    icon: "phone",
    points: ["Nutzung statt Tarifchaos", "Zusatzkarten einordnen", "Kombi nur wenn sinnvoll"]
  },
  {
    slug: "tv-gigatv",
    title: "TV & GigaTV Beratung | Vodafone verständlich erklärt",
    h1: "TV & GigaTV Beratung",
    description:
      "Vodafone TV und GigaTV verständlich beraten lassen: Sender, Komfortfunktionen und Kombi-Möglichkeiten einordnen.",
    intro:
      "Bei TV zählen Sender, Bedienkomfort, Geräte und die passende Kombination mit deinem Internetanschluss.",
    icon: "tv",
    points: ["TV-Setup verständlich machen", "GigaTV einordnen", "Kombi mit Internet prüfen"]
  },
  {
    slug: "kombi-beratung",
    title: "Kombi-Beratung | Internet, Mobilfunk und TV sinnvoll verbinden",
    h1: "Kombi-Beratung",
    description:
      "Vodafone Kombi-Beratung für Internet, Mobilfunk und TV: nur empfehlen, wenn es wirklich zum Bedarf passt.",
    intro:
      "Internet, Mobilfunk und TV werden gemeinsam betrachtet, ohne automatisch alles zusammenzubuchen.",
    icon: "signal",
    points: ["Haushalt und Familie betrachten", "Doppelte Leistungen vermeiden", "Empfehlung nach Bedarf"]
  },
  {
    slug: "verfuegbarkeit-pruefen",
    title: "Vodafone Verfügbarkeit prüfen lassen | Adresse einordnen",
    h1: "Verfügbarkeit prüfen lassen",
    description:
      "Vodafone Verfügbarkeit für Internet, Glasfaser, Kabel je nach Adresse, DSL, Mobilfunk und TV persönlich prüfen lassen.",
    intro:
      "Deine Möglichkeiten werden anhand von Ort, Adresse, Gebäude und Produktwunsch eingeordnet.",
    icon: "check",
    points: ["Adresse genau angeben", "Technologie verständlich einordnen", "Rückmeldung mit Empfehlung"]
  }
];

export type GuidePage = {
  slug: string;
  category: string;
  icon: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  sections: Array<{
    title: string;
    body: string;
    bullets?: string[];
    type?: "hfc" | "fiber" | "compare" | "availability" | "usage" | "hotline" | "combo" | "region";
  }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const guides: GuidePage[] = [
  {
    slug: "wie-funktioniert-kabel-internet",
    category: "Kabelinternet",
    icon: "coax",
    title: "Wie funktioniert Kabelinternet | HFC, Koax, HÜP & Router",
    h1: "Wie funktioniert Kabelinternet?",
    description:
      "Kabelinternet verständlich erklärt: Hybrid Fiber Coax, Glasfaser bis Fiber Node, Koaxialkabel, HÜP, Multimediadose, Kabelrouter und Verfügbarkeit.",
    intro:
      "Kabelinternet nutzt ein Kabel-Glasfaser-Hybridnetz, auch Hybrid Fiber Coax oder HFC. Große Strecken laufen über Glasfaser; der letzte Abschnitt zum Gebäude kann je nach Ausbau über Koaxialkabel laufen.",
    image: assets.coax,
    imageAlt: "Aufbau eines Koaxialkabels mit Innenleiter, Dielektrikum, Schirmung und Kabelmantel",
    sections: [
      {
        title: "Kurz erklärt",
        body:
          "Kabelinternet ist nicht dasselbe wie reines Glasfaser bis in die Wohnung. Im HFC-Netz laufen große Datenstrecken über Glasfaser bis zu Hubs, Verteilpunkten oder Fiber Nodes. Von dort übernimmt im letzten Abschnitt häufig Koaxialkabel.",
        bullets: ["Hybrid Fiber Coax / HFC", "Glasfaser bis Hub oder Fiber Node", "Koaxialkabel im letzten Abschnitt", "HÜP, Multimediadose und Kabelrouter im Gebäude"],
        type: "hfc"
      },
      {
        title: "Der Weg des Signals",
        body:
          "Vereinfacht läuft das Signal über Internet/Backbone, Glasfaserstrecken, regionalen Hub, Fiber Node, Verstärkerpunkte, Koaxialkabel, HÜP im Keller, Multimediadose und Kabelrouter. Danach verteilt der Router das Signal per WLAN oder LAN an Endgeräte.",
        type: "hfc"
      },
      {
        title: "Warum Koaxialkabel wichtig ist",
        body:
          "Koaxialkabel ist deutlich dicker und stärker abgeschirmt als eine einzelne Glasfaserfaser oder klassische Telefonleitung. Es besteht aus Innenleiter, Dielektrikum, Schirmfolie oder Schirmgeflecht und Kabelmantel.",
        bullets: ["Innenleiter", "Dielektrikum", "Schirmfolie und Schirmgeflecht", "Kabelmantel"],
        type: "compare"
      },
      {
        title: "HÜP im Keller",
        body:
          "HÜP steht für Hausübergabepunkt. Er sitzt häufig im Keller oder Technikbereich und markiert den Übergang vom Netz in das Gebäude. Danach geht es über die Hausverkabelung zur Multimediadose oder Kabeldose.",
        type: "hfc"
      },
      {
        title: "Router, WLAN und Verfügbarkeit",
        body:
          "Der Kabelrouter wird an der Multimediadose angeschlossen. Die tatsächliche Leistung hängt von Tarif, Netz, Gebäudeinstallation, Router, WLAN-Umgebung und Endgeräten ab. Deshalb ist eine adressbezogene Prüfung sinnvoll.",
        type: "availability"
      }
    ],
    faqs: [
      { question: "Ist Kabelinternet dasselbe wie Glasfaser?", answer: "Nein. Kabelinternet ist häufig ein Kabel-Glasfaser-Hybridnetz. Glasfaser läuft bis zum Knoten; der letzte Abschnitt kann Koaxialkabel nutzen." },
      { question: "Was ist ein HÜP?", answer: "Der HÜP ist der Hausübergabepunkt. Dort kommt der Anschluss ins Gebäude und wird zur Hausverkabelung weitergeführt." },
      { question: "Warum muss die Adresse geprüft werden?", answer: "Netz, Gebäude, Hausverkabelung und Produktverfügbarkeit unterscheiden sich je Adresse." }
    ]
  },
  {
    slug: "wie-funktioniert-glasfaser",
    category: "Glasfaser",
    icon: "fiber",
    title: "Wie funktioniert Glasfaser | Lichtsignal, FTTH & FTTB",
    h1: "Wie funktioniert Glasfaser?",
    description:
      "Glasfaser verständlich erklärt: Lichtsignale, dünne Fasern, Unterschied zu Koax, FTTH/FTTB und Verfügbarkeit je Adresse.",
    intro:
      "Glasfaser überträgt Daten über Lichtsignale. Für Kundinnen und Kunden zählt vor allem, ob die Adresse im Ausbaugebiet liegt, buchbar ist und wie die Aktivierung abläuft.",
    image: assets.fiberInside,
    imageAlt: "Glasfaserleitungen von innen mit Lichtsignalen",
    sections: [
      { title: "Daten als Lichtsignal", body: "In Glasfasern werden Informationen als Lichtimpulse übertragen. Die Fasern sind sehr dünn, können aber große Datenmengen transportieren.", type: "fiber" },
      { title: "Unterschied zu Koax und DSL", body: "DSL nutzt Telefonleitungen, Koaxialkabel nutzt einen abgeschirmten Innenleiter, Glasfaser arbeitet mit Licht in dünnen Fasern. Das sind unterschiedliche Technologien.", type: "compare" },
      { title: "FTTH und FTTB", body: "FTTH bedeutet Glasfaser bis ins Haus oder in die Wohnung. FTTB bedeutet Glasfaser bis ins Gebäude. Welche Variante relevant ist, hängt vom Ausbau und Gebäude ab.", type: "fiber" },
      { title: "Ausbau, Buchbarkeit, Aktivierung", body: "Ein Ausbauhinweis ist nicht automatisch ein aktiver Anschluss. Ausbaugebiet, Buchbarkeit, Installation und Aktivierung müssen getrennt betrachtet werden.", type: "availability" }
    ],
    faqs: [
      { question: "Ist Glasfaser überall verfügbar?", answer: "Nein. Entscheidend sind Ausbaugebiet, Adresse, Gebäude und Buchbarkeit." },
      { question: "Was bedeutet FTTH?", answer: "FTTH bedeutet Fiber to the Home, also Glasfaser bis ins Haus oder in die Wohnung." }
    ]
  },
  {
    slug: "kabel-oder-glasfaser",
    category: "Kabelinternet",
    icon: "check",
    title: "Kabel oder Glasfaser | Was passt besser?",
    h1: "Kabel oder Glasfaser — was passt besser?",
    description:
      "Kabelinternet und Glasfaser verständlich vergleichen: Anschlussart, Signalweg, Verfügbarkeit, Gebäudeinstallation und Beratung.",
    intro:
      "Die bessere Option hängt nicht von einem Werbeslogan ab, sondern von Adresse, Ausbau, Gebäude und Nutzung.",
    image: assets.networkCompare,
    imageAlt: "Vodafone Grafik mit Telefonkabel, Glasfaser und TV-Kabel im Vergleich",
    sections: [
      { title: "Signalweg vergleichen", body: "Kabelinternet arbeitet häufig als HFC-Netz: Glasfaser bis zum Knoten, Koax im letzten Abschnitt. Glasfaser kann je nach Ausbau näher ans Gebäude oder direkt in den Anschlussbereich führen.", type: "compare" },
      { title: "Gebäudeinstallation", body: "Beim Kabelweg sind HÜP, Hausverkabelung, Multimediadose und Kabelrouter wichtig. Bei Glasfaser können Hausanschluss, ONT und Router relevant werden.", type: "hfc" },
      { title: "Adresse entscheidet", body: "Nicht jeder Ort, nicht jede Straße und nicht jedes Gebäude hat die gleiche Produktmöglichkeit. Deshalb wird zuerst geprüft und danach empfohlen.", type: "availability" }
    ],
    faqs: [
      { question: "Ist Glasfaser immer besser?", answer: "Nicht pauschal. Entscheidend sind Adresse, Bedarf, Ausbau und konkrete Produktmöglichkeit." },
      { question: "Kann Kabelinternet sinnvoll sein?", answer: "Ja, wenn es an der konkreten Adresse verfügbar ist und zur Nutzung passt." }
    ]
  },
  {
    slug: "vodafone-verfuegbarkeit-pruefen",
    category: "Verfügbarkeit",
    icon: "pin",
    title: "Vodafone Verfügbarkeit prüfen lassen | Adresse statt Ratespiel",
    h1: "Vodafone Verfügbarkeit prüfen lassen",
    description:
      "Vodafone Verfügbarkeit prüfen lassen: Warum Adresse und Gebäude entscheidend sind, welche Angaben helfen und wie die persönliche Rückmeldung abläuft.",
    intro:
      "Eine verlässliche Einschätzung beginnt mit Ort, PLZ, Adresse, Produktwunsch und gegebenenfalls Angaben zum Gebäude.",
    image: assets.gigaNetwork,
    imageAlt: "Vodafone GigaGlasfaser- und Koax-Netz als technische Übersicht",
    sections: [
      { title: "Warum die Adresse zählt", body: "Ausbau, Hausanschluss, Knoten und Gebäude können schon innerhalb eines Ortes variieren.", type: "availability" },
      { title: "Welche Daten helfen", body: "PLZ, Ort, Adresse, Produktwunsch, aktueller Anbieter und Rückrufzeitraum helfen bei einer sauberen Einordnung.", type: "availability" },
      { title: "Persönliche Rückmeldung statt Sofortversprechen", body: "Die Anfrage wird mit Blick auf Adresse, Gebäude und Produktwunsch geprüft. Danach bekommst du eine verständliche Einschätzung.", type: "hotline" }
    ],
    faqs: [
      { question: "Welche Daten brauche ich?", answer: "PLZ, Ort, Adresse und gewünschte Produkte reichen für den Start meistens aus." },
      { question: "Ist das eine Live-Verfügbarkeitsprüfung?", answer: "Nein. Deine Angaben werden persönlich eingeordnet. Anschließend bekommst du eine Rückmeldung zu den Möglichkeiten an deiner Adresse." },
      { question: "Warum kann sich die Verfügbarkeit innerhalb eines Ortes unterscheiden?", answer: "Straße, Hausnummer, Gebäudeanschluss und Ausbaustand können sich bereits in derselben Nachbarschaft unterscheiden." }
    ]
  },
  {
    slug: "internet-tarif-waehlen",
    category: "Tarifwahl",
    icon: "router",
    title: "Internet-Tarif wählen | Bedarf statt Zahlenchaos",
    h1: "Den passenden Internet-Tarif wählen",
    description:
      "Vodafone Internet-Tarif passend zur Nutzung wählen: Single-Haushalt, Familie, Homeoffice, Streaming, Gaming, Router und Verfügbarkeit einordnen.",
    intro:
      "Ein guter Tarif passt zum Alltag. Geschwindigkeit ist wichtig, aber nicht die einzige Entscheidung.",
    image: assets.fiberHouse,
    imageAlt: "Hausanschluss-Grafik mit Router und WLAN",
    sections: [
      { title: "Nutzung entscheidet", body: "Single-Haushalt, Familie, Homeoffice, Streaming und Gaming haben unterschiedliche Anforderungen.", type: "usage" },
      { title: "Geschwindigkeit ist nicht alles", body: "Router, WLAN, Gebäude, Endgeräte und Verfügbarkeit beeinflussen die echte Nutzung.", type: "usage" },
      { title: "Kombi sinnvoll prüfen", body: "Mobilfunk oder TV können sinnvoll sein, wenn sie zum Bedarf passen. Sie sind kein automatischer Zusatz.", type: "combo" }
    ],
    faqs: [
      { question: "Reicht die höchste Geschwindigkeit immer?", answer: "Nein. Entscheidend ist die Kombination aus Nutzung, Technik, Router und Verfügbarkeit." },
      { question: "Was ist für Homeoffice wichtig?", answer: "Neben der Bandbreite zählen ein stabiler Anschluss, ein geeigneter Router und eine gute WLAN- oder LAN-Verbindung am Arbeitsplatz." },
      { question: "Wie viele Geräte sollte ich berücksichtigen?", answer: "Neben Smartphones und Computern zählen auch Fernseher, Konsolen, Lautsprecher und smarte Geräte, die gleichzeitig online sein können." }
    ]
  },
  {
    slug: "vodafone-beratung-statt-hotline",
    category: "Beratung",
    icon: "callback",
    title: "Vodafone Beratung statt Hotline | Persönlicher Ansprechpartner",
    h1: "Vodafone Beratung statt Hotline",
    description:
      "Vodafone Beratung statt Hotline: direkter Rückruf, persönlicher Ansprechpartner, verständliche Empfehlung und Begleitung bis zur Aktivierung.",
    intro:
      "Viele Menschen wollen keine Warteschleife. Sie wollen einen Ansprechpartner, der die Anfrage versteht.",
    image: assets.connectivity,
    imageAlt: "Internetrouter und Smartphone in einem hellen Wohnraum",
    sections: [
      { title: "Hotline fühlt sich anonym an", body: "Wiederholungen, Weiterleitungen und unklare Zuständigkeiten machen Entscheidungen schwer.", type: "hotline" },
      { title: "Persönlich heißt klarer", body: "Ein direkter Ansprechpartner kann Bedarf, Adresse und nächste Schritte besser zusammenführen.", type: "hotline" },
      { title: "Begleitung bis Aktivierung", body: "Die Beratung hört nicht beim ersten Formularfeld auf, sondern erklärt auch den weiteren Ablauf.", type: "availability" }
    ],
    faqs: [
      { question: "Ist das eine Hotline?", answer: "Nein. Der Fokus liegt auf persönlicher Vodafone Beratung mit direktem Kontakt." },
      { question: "Wie kann ich die Beratung starten?", answer: "Du kannst Jan per WhatsApp, Telefon oder über das Anfrageformular erreichen." },
      { question: "Bleibt der Ansprechpartner auch nach der Empfehlung erreichbar?", answer: "Ja. Die persönliche Begleitung umfasst auf Wunsch auch die nächsten Schritte bis zur Aktivierung." }
    ]
  },
  {
    slug: "internet-mobilfunk-tv-kombinieren",
    category: "Mobilfunk & TV",
    icon: "signal",
    title: "Internet, Mobilfunk und TV kombinieren | Vodafone verständlich",
    h1: "Internet, Mobilfunk und TV sinnvoll kombinieren",
    description:
      "Vodafone Internet, Mobilfunk und TV nach Bedarf kombinieren: Nutzung, vorhandene Verträge und aktuelle Konditionen gemeinsam einordnen lassen.",
    intro:
      "Kombi-Lösungen können helfen, wenn sie wirklich zum Haushalt passen. Die Beratung sortiert, was zusammengehört.",
    image: "/assets/premium-connectivity-hero.jpg",
    imageAlt: "Internetrouter und Smartphone als Verbindung von Zuhause, Mobilfunk und TV",
    sections: [
      { title: "Zuhause, unterwegs, Entertainment", body: "Internet zuhause, Mobilfunk unterwegs und TV im Wohnzimmer sollten zusammen funktionieren, nicht nur zusammen verkauft werden.", type: "combo" },
      { title: "Aktuelle Konditionen prüfen", body: "Mögliche Vorteile hängen von Verfügbarkeit und aktueller Angebotslage ab und werden passend zur Anfrage eingeordnet.", type: "hotline" },
      { title: "Bedarf zuerst", body: "Eine Kombi-Lösung wird nur betrachtet, wenn sie zur Nutzung passt.", type: "usage" }
    ],
    faqs: [
      { question: "Muss ich alles kombinieren?", answer: "Nein. Eine Kombination wird nur betrachtet, wenn sie zu deinem Haushalt und deiner Nutzung passt." },
      { question: "Sind Kombi-Vorteile immer gleich?", answer: "Nein. Konditionen und Produktmöglichkeiten können sich ändern und werden deshalb passend zur Anfrage geprüft." },
      { question: "Kann ich nur Mobilfunk oder nur TV beraten lassen?", answer: "Ja. Jedes Thema kann einzeln betrachtet werden." }
    ]
  },
  {
    slug: "glasfaser-in-wietze-celle-und-umgebung",
    category: "Glasfaser",
    icon: "pin",
    title: "Glasfaser in Wietze, Celle und Umgebung | Beratung",
    h1: "Glasfaser in Wietze, Celle und Umgebung",
    description:
      "Glasfaser in Wietze, Celle, Hannover und Umgebung verständlich einordnen: Ausbau, Buchbarkeit, Aktivierung und Beratung.",
    intro:
      "Glasfaser ist regional unterschiedlich. Besonders in Wietze liegt der Fokus klar auf Glasfaser statt Kabelinternet.",
    image: assets.networkExpansion,
    imageAlt: "Vodafone Netzausbau-Grafik mit Glasfasertechnik im Kabelnetz",
    sections: [
      { title: "Region verstehen", body: "Wietze, Celle, Hannover und der Umkreis werden mit Blick auf die jeweilige Adresse und die passende Anschlussart betrachtet.", type: "region" },
      { title: "Ausbau ist nicht Aktivierung", body: "Ausbaugebiet, Buchbarkeit und Aktivierung sind unterschiedliche Schritte.", type: "availability" },
      { title: "Adresse bleibt entscheidend", body: "Auch bei Glasfaser zählt die konkrete Adresse und das Gebäude.", type: "fiber" }
    ],
    faqs: [
      { question: "Gibt es Glasfaser in Wietze?", answer: "In Wietze liegt der Beratungsfokus auf Glasfaser. Die konkrete Möglichkeit wird je Adresse eingeordnet." },
      { question: "Was ist der Unterschied zwischen Ausbau und Buchbarkeit?", answer: "Ein Ausbau kann angekündigt oder im Bau sein, ohne dass an jeder Adresse sofort ein aktiver Tarif buchbar ist." },
      { question: "Welche Angaben helfen bei der regionalen Prüfung?", answer: "PLZ, Ort, Straße und Hausnummer helfen dabei, die Situation an deiner Adresse genauer einzuordnen." }
    ]
  }
];

export const faqItems = [
  { question: "Welche Vodafone-Produkte werden beraten?", answer: "Beraten werden Internet, Kabel je nach Adresse, Glasfaser, DSL, Mobilfunk, TV/GigaTV, Kombi-Lösungen und Verfügbarkeitsfragen." },
  { question: "Ist die Beratung kostenlos?", answer: "Ja. Die Beratung ist kostenlos." },
  { question: "Wie funktioniert Kabelinternet?", answer: "Kabelinternet nutzt häufig ein Kabel-Glasfaser-Hybridnetz, auch HFC genannt. Glasfaser reicht bis zu Hubs oder Fiber Nodes, im letzten Abschnitt kann Koaxialkabel zum Gebäude eingesetzt werden." },
  { question: "Was ist ein HÜP?", answer: "HÜP bedeutet Hausübergabepunkt. Dort kommt der Anschluss ins Gebäude, häufig im Keller oder Technikbereich." },
  { question: "Was ist Koaxialkabel?", answer: "Koaxialkabel hat Innenleiter, Dielektrikum, Schirmung und Kabelmantel. Es ist stärker abgeschirmt als eine klassische Telefonleitung und wird im Kabelnetz häufig im letzten Abschnitt genutzt." },
  { question: "Was bedeutet HFC?", answer: "HFC steht für Hybrid Fiber Coax. Große Strecken laufen über Glasfaser; im letzten Abschnitt zum Gebäude kann je nach Ausbau Koaxialkabel eingesetzt werden." },
  { question: "Was ist eine Multimediadose?", answer: "Die Multimediadose ist die Anschlussdose im Wohnraum. Dort wird bei einem Kabelanschluss in der Regel der Kabelrouter angeschlossen." },
  { question: "Was bedeutet DOCSIS?", answer: "DOCSIS ist ein technischer Standard für die Datenübertragung im Kabelnetz. Er beschreibt, wie Internetdaten über den koaxialen Netzabschnitt transportiert werden." },
  { question: "Was bedeuten FTTH und FTTB?", answer: "FTTH bedeutet Glasfaser bis ins Haus oder in die Wohnung. FTTB bedeutet Glasfaser bis ins Gebäude; der weitere Weg im Haus hängt von der Installation ab." },
  { question: "Kann ich prüfen lassen, ob Kabel, DSL oder Glasfaser verfügbar ist?", answer: "Ja. Ort, PLZ und Adresse helfen bei der Einordnung. In Wietze liegt der Fokus auf Glasfaser." },
  { question: "Welche Angaben werden für die Prüfung benötigt?", answer: "Hilfreich sind Name, Telefonnummer, PLZ, Ort, Straße und Hausnummer sowie das gewünschte Produkt." },
  { question: "Wie läuft die Rückmeldung ab?", answer: "Nach deiner Anfrage meldet sich Jan persönlich zurück, klärt offene Fragen und ordnet die verfügbaren Möglichkeiten verständlich ein." },
  { question: "Unterstützt ihr auch Mobilfunk und TV?", answer: "Ja. Mobilfunk, Zusatzkarten, TV/GigaTV und Kombi-Themen können gemeinsam betrachtet werden." },
  { question: "Unterstützt ihr bis zur Aktivierung?", answer: "Ja. Auf Wunsch werden auch die nächsten Schritte nach der Auswahl und Bestellung verständlich begleitet." },
  { question: "Gibt es Beratung in Wietze, Celle, Hannover und Umgebung?", answer: "Ja. Die Beratung richtet sich an Wietze, Celle, Hannover und zahlreiche Orte im Umkreis." },
  { question: "Kann ich eine Tarifempfehlung bekommen?", answer: "Ja. Die Empfehlung orientiert sich an Adresse, Verfügbarkeit, Haushalt und tatsächlicher Nutzung." },
  { question: "Ist das eine Hotline?", answer: "Nein. Der Fokus liegt auf persönlicher Beratung mit direktem Ansprechpartner." },
  { question: "Werden Preise direkt angezeigt?", answer: "Nein. Preise, Aktionen und Produktoptionen können je Adresse, Verfügbarkeit und aktueller Angebotslage variieren." }
];

export function locationFaqs(location: LocationPage) {
  const inWietze = location.slug === "vodafone-beratung-wietze";
  return [
    {
      question: `Welche Vodafone-Produkte werden in ${location.name} beraten?`,
      answer: inWietze
        ? "In Wietze beraten wir zu Glasfaser, DSL, Mobilfunk, TV und weiteren Internetmöglichkeiten. Kabelinternet ist dort keine Zuhause-Lösung."
        : `In ${location.name} beraten wir zu Internet, Glasfaser, Kabel je nach Adresse, DSL, Mobilfunk, TV und sinnvollen Kombinationen.`
    },
    {
      question: `Kann ich die Verfügbarkeit in ${location.name} prüfen lassen?`,
      answer: `Ja. Mit PLZ, Ort, Straße und Hausnummer lässt sich besser einordnen, welche Anschlussarten in ${location.name} an deiner Adresse möglich sein können.`
    },
    {
      question: `Ist die Beratung in ${location.name} kostenlos?`,
      answer: "Ja. Die persönliche Beratung ist kostenlos und unverbindlich."
    },
    {
      question: "Wie erhalte ich eine Rückmeldung?",
      answer: "Du kannst die Anfrage per WhatsApp oder Formular senden oder direkt anrufen. Jan meldet sich persönlich bei dir zurück."
    },
    {
      question: "Werde ich auch nach der Auswahl unterstützt?",
      answer: "Ja. Auf Wunsch werden die nächsten Schritte bis zur Aktivierung verständlich begleitet."
    }
  ];
}

export function serviceFaqs(service: ServicePage) {
  const common = [
    {
      question: `Ist die ${service.h1} kostenlos?`,
      answer: "Ja. Die persönliche Beratung ist kostenlos und unverbindlich."
    },
    {
      question: "Warum ist die Adresse wichtig?",
      answer: "Anschlussart, Ausbau, Gebäude und Produktmöglichkeiten können sich je Adresse unterscheiden."
    }
  ];

  const specific: Record<string, Array<{ question: string; answer: string }>> = {
    "internet-kabel": [
      { question: "Wie funktioniert Kabelinternet?", answer: "Kabelinternet nutzt häufig ein HFC-Netz: Glasfaser bis zum Knoten und je nach Ausbau Koaxialkabel im letzten Abschnitt zum Gebäude." },
      { question: "Was wird im Gebäude benötigt?", answer: "Je nach Installation sind Hausübergabepunkt, Hausverkabelung, Multimediadose und Kabelrouter relevant." }
    ],
    glasfaser: [
      { question: "Was bedeuten FTTH und FTTB?", answer: "FTTH führt Glasfaser bis ins Haus oder die Wohnung, FTTB bis ins Gebäude. Welche Variante gilt, hängt vom Ausbau ab." },
      { question: "Ist ein Ausbauhinweis schon eine Buchbarkeit?", answer: "Nicht unbedingt. Ausbau, Buchbarkeit, Installation und Aktivierung sind unterschiedliche Schritte." }
    ],
    dsl: [
      { question: "Wann kann DSL sinnvoll sein?", answer: "DSL kann eine Alternative sein, wenn Glasfaser oder Kabel an der Adresse nicht verfügbar oder nicht passend sind." },
      { question: "Welche Leitung nutzt DSL?", answer: "DSL nutzt die Telefonleitung. Die mögliche Leistung hängt unter anderem von Leitung und Standort ab." }
    ],
    mobilfunk: [
      { question: "Was wird bei Mobilfunk berücksichtigt?", answer: "Datenbedarf, Telefonie, Anzahl der Personen, Zusatzkarten und die Nutzung unterwegs werden gemeinsam betrachtet." },
      { question: "Muss Mobilfunk mit Internet kombiniert werden?", answer: "Nein. Eine Kombination wird nur geprüft, wenn sie zu deinem Bedarf passt." }
    ],
    "tv-gigatv": [
      { question: "Was wird bei TV und GigaTV geklärt?", answer: "Wichtig sind gewünschte Inhalte, Bedienkomfort, vorhandene Geräte und die Verbindung mit dem Internetanschluss." },
      { question: "Kann TV einzeln beraten werden?", answer: "Ja. TV kann einzeln oder zusammen mit Internet betrachtet werden." }
    ],
    "kombi-beratung": [
      { question: "Muss ich mehrere Produkte buchen?", answer: "Nein. Kombi-Möglichkeiten werden nur betrachtet, wenn sie zum Haushalt und zur Nutzung passen." },
      { question: "Sind mögliche Vorteile immer gleich?", answer: "Nein. Konditionen können sich ändern und werden passend zur Anfrage geprüft." }
    ],
    "verfuegbarkeit-pruefen": [
      { question: "Ist das eine automatische Live-Prüfung?", answer: "Nein. Deine Angaben werden persönlich geprüft und anschließend verständlich eingeordnet." },
      { question: "Welche Angaben helfen?", answer: "PLZ, Ort, Straße, Hausnummer und das gewünschte Produkt sind für den Start besonders hilfreich." }
    ]
  };

  return [...(specific[service.slug] ?? []), ...common];
}
