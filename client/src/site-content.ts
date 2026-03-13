export const BRAND_NAME = "AI Practitioner";
export const BRAND_ALT_NAME = "Automationskurs";
export const CONTACT_EMAIL = "management@purplezebraconsulting.com";
export const FACEBOOK_PAGE = "https://www.facebook.com/kientdecken";
export const LOGO_PATH = "/images/logo.webp";
export const HERO_OG_IMAGE_PATH = "/images/hero-bg.webp";

export type TrainerProfile = {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  specialties: string[];
  image: string;
  sameAs?: string[];
};

export const trainerProfiles: TrainerProfile[] = [
  {
    id: "nikolaus-schauersberger",
    name: "Nikolaus Schauersberger",
    role: "Technische Leitung und Produzent",
    shortBio:
      "Seit 15 Jahren Software-Experte und Anforderungsmanager in Großprojekten. Er verantwortet die technische Leitung und den Produktionsaufbau des AI Practitioners.",
    specialties: [
      "KI-Automatisierungsarchitektur",
      "Systemdesign für Lernplattformen",
      "Projektfeedback und technisches Sparring",
    ],
    image: "/images/nikolaus-schauersberger.jpg",
  },
  {
    id: "markus-habermehl",
    name: "Markus Habermehl",
    role: "Didaktische Leitung und Automatisierungsexperte",
    shortBio:
      "Gründer des größten KI Clubs im DACH-Raum und Automatisierungsexperte. Er verantwortet die didaktische Leitung und die Umsetzungsnähe der Ausbildung.",
    specialties: [
      "Didaktik für berufsbegleitende Weiterbildung",
      "Automatisierungen für KMU",
      "Praxisnahe KI-Workflows",
    ],
    image: "/images/markus-habermehl.jpg",
    sameAs: [FACEBOOK_PAGE],
  },
];

export const homeFaqs = [
  {
    question: "Brauche ich Programmierkenntnisse für die KI-Weiterbildung?",
    answer:
      "Nein. Die Ausbildung nutzt No-Code-Tools wie Make, n8n und Voiceflow. Du lernst KI-Automatisierung Schritt für Schritt – ganz ohne Programmierkenntnisse.",
  },
  {
    question: "Wie viel Zeit muss ich pro Woche investieren?",
    answer:
      "Plane etwa 10 Stunden pro Woche ein. Die KI-Weiterbildung umfasst 61 Unterrichtseinheiten über 13 Wochen. Du hast lebenslangen Zugang und kannst in deinem Tempo lernen.",
  },
  {
    question: "Ist das IHK-Zertifikat bundesweit anerkannt?",
    answer:
      "Ja. Das Zertifikat wird direkt von der Industrie- und Handelskammer (IHK) ausgestellt und ist bundesweit anerkannt. Es bestätigt deine Qualifikation als KI-Automatisierungsexperte.",
  },
  {
    question: "Kann ich mit KI-Automatisierung wirklich Geld verdienen?",
    answer:
      "Ja. Absolventen verdienen durchschnittlich 3.000–10.000€ pro KI-Automatisierungsprojekt. Die Nachfrage nach KI-Experten wächst stark, besonders bei KMU und im Mittelstand.",
  },
  {
    question: "Was lerne ich in der KI-Ausbildung konkret?",
    answer:
      "Du lernst Chatbots zu erstellen, RAG-Systeme mit Flowise aufzubauen, Prozesse mit Make und n8n zu automatisieren, KI-Agenten zu entwickeln und Kunden für KI-Projekte zu gewinnen – alles praxisnah in 7 Modulen.",
  },
  {
    question: "Was ist der Unterschied zwischen AI Practitioner und anderen KI-Kursen?",
    answer:
      "Unsere KI-Weiterbildung ist die einzige mit IHK-Zertifikat. Du lernst nicht nur Theorie, sondern baust echte Automatisierungsprojekte mit professionellen Tools wie Make, n8n, Voiceflow und Flowise.",
  },
  {
    question: "Für wen ist die KI-Weiterbildung geeignet?",
    answer:
      "Die Ausbildung richtet sich an Berater, Freelancer, Unternehmer und Angestellte, die KI-Automatisierung als neue Kompetenz oder Einnahmequelle aufbauen möchten. Vorkenntnisse sind nicht erforderlich.",
  },
  {
    question: "Gibt es eine Geld-zurück-Garantie?",
    answer:
      "Ja. Du hast eine 14-Tage Geld-zurück-Garantie. Wenn die Ausbildung nicht deinen Erwartungen entspricht, erhältst du den vollen Betrag zurück – ohne Wenn und Aber.",
  },
  {
    question: "Kann ich die KI-Ausbildung neben dem Beruf absolvieren?",
    answer:
      "Absolut. Die Weiterbildung ist berufsbegleitend konzipiert. Mit ca. 10 Stunden pro Woche und lebenslangem Zugang kannst du flexibel lernen und die Module in deinem eigenen Tempo durcharbeiten.",
  },
  {
    question: "Was kostet die KI-Weiterbildung mit IHK-Zertifikat?",
    answer:
      "Die Ausbildung zum KI-Automatisierungsexperten kostet 4.997 € zzgl. MwSt. als einmalige Investition. Darin enthalten sind alle 7 Module, das IHK-Zertifikat, lebenslanger Zugang und alle zukünftigen Updates.",
  },
  {
    question: "Welche Tools lerne ich in der Ausbildung?",
    answer:
      "Du arbeitest mit den führenden KI-Automatisierungstools: ChatGPT, Make, n8n, Zapier, Voiceflow, ManyChat und Flowise. Damit deckst du das gesamte Spektrum von Chatbots über Prozessautomatisierung bis hin zu RAG-Systemen ab.",
  },
  {
    question: "Erhalte ich nach Abschluss Unterstützung?",
    answer:
      "Ja. Du erhältst lebenslangen Zugang zu allen Kursinhalten und Updates. Zusätzlich profitierst du von der Community der Absolventen für Austausch und Networking.",
  },
] as const;

function toAbsoluteUrl(origin: string, path: string) {
  return new URL(path, origin).toString();
}

function buildPersonJsonLd(origin: string, trainer: TrainerProfile) {
  return {
    "@type": "Person",
    "@id": `${toAbsoluteUrl(origin, `/trainer#${trainer.id}`)}`,
    name: trainer.name,
    jobTitle: trainer.role,
    description: trainer.shortBio,
    image: toAbsoluteUrl(origin, trainer.image),
    url: toAbsoluteUrl(origin, "/trainer"),
    knowsAbout: trainer.specialties,
    sameAs: trainer.sameAs ?? [],
  };
}

export function getOrganizationJsonLd(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${toAbsoluteUrl(origin, "/")}#organization`,
    name: BRAND_NAME,
    alternateName: BRAND_ALT_NAME,
    url: toAbsoluteUrl(origin, "/"),
    logo: toAbsoluteUrl(origin, LOGO_PATH),
    image: toAbsoluteUrl(origin, HERO_OG_IMAGE_PATH),
    email: CONTACT_EMAIL,
    sameAs: [FACEBOOK_PAGE],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      availableLanguage: ["de", "en"],
    },
  };
}

export function getWebsiteJsonLd(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${toAbsoluteUrl(origin, "/")}#website`,
    name: BRAND_NAME,
    alternateName: BRAND_ALT_NAME,
    url: toAbsoluteUrl(origin, "/"),
    inLanguage: "de-DE",
  };
}

export function getCourseJsonLd(origin: string) {
  const people = trainerProfiles.map(trainer => buildPersonJsonLd(origin, trainer));

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${toAbsoluteUrl(origin, "/")}#course`,
    name: "KI-Automatisierungsexperte (IHK) – AI Practitioner Weiterbildung",
    description:
      "In 13 Wochen zum IHK-zertifizierten KI-Experten. Lerne KI-Automatisierung mit Chatbots, RAG-Systemen, Make und n8n.",
    provider: {
      "@id": `${toAbsoluteUrl(origin, "/")}#organization`,
    },
    author: people,
    educationalCredentialAwarded: "IHK-Zertifikat KI-Automatisierungsexperte",
    courseMode: "Online",
    timeToComplete: "P13W",
    numberOfCredits: "61 Unterrichtseinheiten",
    inLanguage: "de-DE",
    image: toAbsoluteUrl(origin, HERO_OG_IMAGE_PATH),
    url: toAbsoluteUrl(origin, "/"),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT10H/Woche",
      instructor: people,
    },
    offers: {
      "@type": "Offer",
      price: "4997",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${toAbsoluteUrl(origin, "/")}#pricing`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "40",
      bestRating: "5",
    },
  };
}

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getTrainerPageJsonLd(origin: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${toAbsoluteUrl(origin, "/trainer")}#about-page`,
      url: toAbsoluteUrl(origin, "/trainer"),
      name: "Deine Trainer | AI Practitioner",
      about: trainerProfiles.map(trainer => ({
        "@id": `${toAbsoluteUrl(origin, `/trainer#${trainer.id}`)}`,
      })),
      isPartOf: {
        "@id": `${toAbsoluteUrl(origin, "/")}#website`,
      },
    },
    ...trainerProfiles.map(trainer => ({
      "@context": "https://schema.org",
      ...buildPersonJsonLd(origin, trainer),
      worksFor: {
        "@id": `${toAbsoluteUrl(origin, "/")}#organization`,
      },
    })),
  ];
}
