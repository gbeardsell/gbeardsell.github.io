import type { Publication } from "./publications";

// Conference outputs are listed separately from journal and SAE papers.
// APS records are conference abstracts, not journal research articles.
// The 2017 APS entry uses the author's verified Scholar record while a
// stable APS presentation URL is being located.
// A similarly titled 2016 APS abstract with Simon Lapointe as a coauthor
// appears in NASA ADS / Science.gov, but is omitted pending verification
// against the original APS record. The verified 2017 proceedings paper
// below has two authors and is a distinct conference output.
export const conferencePublications: Publication[] = [
  {
    year: 2020,
    title: "Thermodynamic fluctuations in compressible homogeneous turbulence",
    authors: ["Guillaume Beardsell", "Guillaume Blanquart"],
    venue: "Conference abstract, APS Division of Fluid Dynamics, P15.00006",
    href: "https://meetings.aps.org/Meeting/DFD20/Session/P15.6",
    source: "https://meetings-archive.aps.org/dfd/2020/p15/",
  },
  {
    year: 2020,
    title:
      "Detonation simulations by solving the spatially-filtered Euler equations",
    authors: [
      "Alexandra Baumgart",
      "Guillaume Beardsell",
      "Guillaume Blanquart",
    ],
    venue: "Conference abstract, APS Division of Fluid Dynamics, Z13.00003",
    href: "https://meetings.aps.org/Meeting/DFD20/Session/Z13.3",
    source: "https://torroja.dmt.upm.es/congresos/APS2020/all_DFD20.pdf",
  },
  {
    year: 2019,
    title:
      "Reproducing the local characteristics of compressible turbulent flows at a low cost: derivation and application",
    authors: ["Guillaume Beardsell", "Guillaume Blanquart"],
    venue: "Conference abstract, APS Division of Fluid Dynamics, Q18.00006",
    href: "https://meetings-archive.aps.org/dfd/2019/q18/6/",
    source: "https://meetings-archive.aps.org/dfd/2019/q18/6/",
  },
  {
    year: 2018,
    title:
      "Missing large scales: Development and implementation of a physics-based turbulence forcing scheme for numerical simulations of compressible flows",
    authors: ["Guillaume Beardsell", "Guillaume Blanquart"],
    venue: "Conference abstract, APS Division of Fluid Dynamics, F38.00005",
    href: "https://meetings.aps.org/Meeting/DFD18/Session/F38.5",
    source: "https://meetings.aps.org/Meeting/DFD18/Session/F38.5",
  },
  {
    year: 2017,
    title:
      "Simulations of turbulent compressible flows using periodic boundary conditions: high fidelity on a budget",
    authors: ["Guillaume Beardsell", "Guillaume Blanquart"],
    venue: "Conference abstract, Bulletin of the American Physical Society 62",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=SbOSHxcAAAAJ&citation_for_view=SbOSHxcAAAAJ:Tyk-4Ss8FVUC",
    source:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=SbOSHxcAAAAJ&citation_for_view=SbOSHxcAAAAJ:Tyk-4Ss8FVUC",
  },
  {
    year: 2017,
    title:
      "Effects of pressure fluctuations on the combustion process in turbulent premixed flames",
    authors: ["Guillaume Beardsell", "Guillaume Blanquart"],
    venue:
      "Conference proceedings, 10th U.S. National Combustion Meeting, paper 2E05, p. 1800",
    href: "https://www.proceedings.com/content/034/034904webtoc.pdf",
    source: "https://rotavera.uga.edu/Documents/Program-a.pdf",
  },
  {
    year: 2015,
    title:
      "Investigation of the reconnection process of two vortices through spectral simulations",
    authors: ["Guillaume Beardsell", "Louis Dufresne", "Guy Dumas"],
    venue:
      "Conference proceedings, 62nd CASI Aeronautics Conference and AGM / 3rd GARDN Conference",
    href: "https://espace2.etsmtl.ca/id/eprint/12907/",
    source: "https://www.etsmtl.ca/etudier-a-lets/corps-professoral/ldufresne",
  },
  {
    year: 2014,
    title: "Quantifying the reconnection process of two vortices",
    authors: ["Guillaume Beardsell", "Louis Dufresne", "Guy Dumas"],
    venue: "Conference abstract, APS Division of Fluid Dynamics, G18.00001",
    href: "https://meetings.aps.org/Meeting/DFD14/Session/G18.1",
    source: "https://meetings.aps.org/Meeting/DFD14/Session/G18.1",
  },
  {
    year: 2013,
    title:
      "Spectral simulations of the partial reconnection phenomena of aircraft wake vortices",
    authors: ["Guillaume Beardsell", "Louis Dufresne", "Guy Dumas"],
    venue:
      "Conference proceedings, 21st Annual Conference of the CFD Society of Canada",
    href: "https://espace2.etsmtl.ca/id/eprint/8519/",
    source: "https://www.etsmtl.ca/etudier-a-lets/corps-professoral/ldufresne",
  },
  {
    year: 2012,
    title: "Partial reconnection of orthogonal vortices",
    authors: ["Louis Dufresne", "Guillaume Beardsell", "Guy Dumas"],
    venue: "Conference abstract, APS Division of Fluid Dynamics, M12.00006",
    href: "https://meetings.aps.org/Meeting/DFD12/Session/M12.6",
    source: "https://apsdfd2012.ucsd.edu/files/DFD_Schedule.php",
  },
];

export const reports: Publication[] = [
  {
    year: 2012,
    title:
      "Modélisation des bris d’aqueduc et analyse des résultats pour la ville de St-Georges",
    authors: [
      "Sophie Duchesne",
      "Jean-Pierre Villeneuve",
      "Babacar Toumbou",
      "Amélie Thériault",
      "Guillaume Beardsell",
      "Nabila Bouzida",
    ],
    venue: "Research report R1281, INRS, Centre Eau Terre Environnement",
    href: "https://espace.inrs.ca/872/1/R001281.pdf",
    source: "https://espace.inrs.ca/872/1/R001281.pdf",
  },
  {
    year: 2012,
    title:
      "Modélisation des bris d’aqueduc et analyse des résultats pour la ville de Gatineau (secteur de Gatineau)",
    authors: [
      "Sophie Duchesne",
      "Jean-Pierre Villeneuve",
      "Babacar Toumbou",
      "Amélie Thériault",
      "Guillaume Beardsell",
      "Nabila Bouzida",
    ],
    venue: "Research report R1280, INRS, Centre Eau Terre Environnement",
    href: "https://espace.inrs.ca/id/eprint/870/1/R001280.pdf",
    source: "https://espace.inrs.ca/id/eprint/870/",
  },
];
