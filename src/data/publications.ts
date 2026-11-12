import type { ImageMetadata } from "astro";

export interface Publication {
  year: number;
  title: string;
  authors: string[];
  venue: string;
  href: string;
  source: string;
  imageFolder?: string;
  image?: { src: ImageMetadata; alt: string; caption?: string };
}

// Newest first. Years follow the journal volume / formal publication year,
// rather than the first online date. In particular, the Combustion Institute
// papers in volumes 37 and 38 appeared online in 2018 and 2020, respectively,
// but their journal volumes are dated 2019 and 2021. The water-distribution
// paper appeared online in 2012 and in the February 2014 journal issue.
// Public list: confirmed peer-reviewed journal articles and SAE technical papers.
// SAE documents its Technical Paper peer review at:
// https://saemobilus.sae.org/technical-papers
// The public page also includes phdThesis. Other research outputs stay internal.
export const publications: Publication[] = [
  {
    year: 2025,
    imageFolder: "2025_Sharma_SAE",
    title:
      "Effect of Geometrical Manipulation of the Pre-Chamber Design Parameters on the Combustion Performance of an Argon Power Cycle Engine",
    authors: [
      "Eshan Sharma",
      "Joohan Kim",
      "Tyler Strickland",
      "Riccardo Scarcelli",
      "Guillaume Beardsell",
      "Christopher Nilsen",
      "Miguel Sierra Aznar",
    ],
    venue:
      "SAE International Journal of Advances and Current Practices in Mobility 7(5), 2473–2485",
    href: "https://doi.org/10.4271/2025-01-8405",
    source:
      "https://saemobilus.sae.org/articles/effect-geometrical-manipulation-pre-chamber-design-parameters-combustion-performance-argon-power-cycle-engine-2025-01-8405",
  },
  {
    year: 2024,
    imageFolder: "2024_Kim_SAE",
    title:
      "Modeling Pre-Chamber Assisted Efficient Combustion in an Argon Power Cycle Engine",
    authors: [
      "Joohan Kim",
      "Riccardo Scarcelli",
      "Guillaume Beardsell",
      "Tyler Strickland",
      "Christopher Nilsen",
      "Miguel Sierra Aznar",
    ],
    venue: "SAE Technical Paper 2024-01-2690",
    href: "https://doi.org/10.4271/2024-01-2690",
    source:
      "https://saemobilus.sae.org/papers/modeling-pre-chamber-assisted-efficient-combustion-argon-power-cycle-engine-2024-01-2690",
  },
  {
    year: 2023,
    imageFolder: "2023_Baumgart_JCP",
    title:
      "Analytical closure to the spatially-filtered Euler equations for shock-dominated flows",
    authors: [
      "Alexandra Baumgart",
      "Guillaume Beardsell",
      "Guillaume Blanquart",
    ],
    venue: "Journal of Computational Physics 477, 111946",
    href: "https://doi.org/10.1016/j.jcp.2023.111946",
    source: "https://authors.library.caltech.edu/records/8bjrc-my073",
  },
  {
    year: 2021,
    imageFolder: "2021_Ruiz_PCI",
    title: "Framework for simulating stationary spherical flames",
    authors: ["Fernando Ruiz", "Guillaume Beardsell", "Guillaume Blanquart"],
    venue: "Proceedings of the Combustion Institute 38(2), 2109–2117",
    href: "https://doi.org/10.1016/j.proci.2020.06.013",
    source:
      "https://www.sciencedirect.com/science/article/pii/S1540748920300389",
  },
  {
    year: 2021,
    imageFolder: "2021_Beardsell_PCI",
    title:
      "Fully compressible simulations of the impact of acoustic waves on the dynamics of laminar premixed flames for engine-relevant conditions",
    authors: ["Guillaume Beardsell", "Guillaume Blanquart"],
    venue: "Proceedings of the Combustion Institute 38(2), 1923–1931",
    href: "https://doi.org/10.1016/j.proci.2020.06.003",
    source:
      "https://www.sciencedirect.com/science/article/pii/S1540748920300286",
  },
  {
    year: 2020,
    imageFolder: "2020_Beardsell_JCP",
    title:
      "A cost-effective semi-implicit method for the time integration of fully compressible reacting flows with stiff chemistry",
    authors: ["Guillaume Beardsell", "Guillaume Blanquart"],
    venue: "Journal of Computational Physics 414, 109479",
    href: "https://doi.org/10.1016/j.jcp.2020.109479",
    source: "https://authors.library.caltech.edu/records/q0waz-32h44",
  },
  {
    year: 2020,
    imageFolder: "2020_Fillo_JCP",
    title:
      "A fast, low-memory, and stable algorithm for implementing multicomponent transport in direct numerical simulations",
    authors: [
      "Aaron J. Fillo",
      "Jason Schlup",
      "Guillaume Beardsell",
      "Guillaume Blanquart",
      "Kyle E. Niemeyer",
    ],
    venue: "Journal of Computational Physics 406, 109185",
    href: "https://doi.org/10.1016/j.jcp.2019.109185",
    source: "https://authors.library.caltech.edu/records/cj91d-p2y66",
  },
  {
    year: 2019,
    imageFolder: "2019_Beardsell_PCI",
    title:
      "Impact of pressure fluctuations on the dynamics of laminar premixed flames",
    authors: ["Guillaume Beardsell", "Guillaume Blanquart"],
    venue: "Proceedings of the Combustion Institute 37(2), 1895–1902",
    href: "https://doi.org/10.1016/j.proci.2018.07.125",
    source:
      "https://www.sciencedirect.com/science/article/abs/pii/S1540748918306394",
  },
  {
    year: 2016,
    imageFolder: "2016_Beardsell_PoF",
    title:
      "Investigation of the viscous reconnection phenomenon of two vortex tubes through spectral simulations",
    authors: ["Guillaume Beardsell", "Louis Dufresne", "Guy Dumas"],
    venue: "Physics of Fluids 28(9)",
    href: "https://doi.org/10.1063/1.4961078",
    source:
      "https://pure.etsmtl.ca/en/publications/investigation-of-the-viscous-reconnection-phenomenon-of-two-vorte/",
  },
  {
    year: 2014,
    imageFolder: "2014_Toumbou_JPSEP",
    title:
      "General Model for Water-Distribution Pipe Breaks: Development, Methodology, and Application to a Small City in Quebec, Canada",
    authors: [
      "Babacar Toumbou",
      "Jean-Pierre Villeneuve",
      "Guillaume Beardsell",
      "Sophie Duchesne",
    ],
    venue: "Journal of Pipeline Systems Engineering and Practice 5(1)",
    href: "https://doi.org/10.1061/(ASCE)PS.1949-1204.0000135",
    source:
      "https://ascelibrary.org/doi/abs/10.1061/%28ASCE%29PS.1949-1204.0000135",
  },
  {
    year: 2013,
    imageFolder: "2013_Duchesne_CACIE",
    title: "A Survival Analysis Model for Sewer Pipe Structural Deterioration",
    authors: [
      "Sophie Duchesne",
      "Guillaume Beardsell",
      "Jean-Pierre Villeneuve",
      "Babacar Toumbou",
      "Kassandra Bouchard",
    ],
    venue: "Computer-Aided Civil and Infrastructure Engineering 28(2), 146–160",
    href: "https://doi.org/10.1111/j.1467-8667.2012.00773.x",
    source:
      "https://espace.inrs.ca/view/creators/Beardsell%3D3AGuillaume%3D3A%3D3A.html",
  },
  {
    year: 2012,
    imageFolder: "2012_Gagnon_SAE",
    title:
      "The Process of Making an Aerodynamically Efficient Car Body for the SAE Supermileage Competition",
    authors: [
      "Louis Gagnon",
      "Marc Richard",
      "Guillaume Beardsell",
      "Matthieu Boudreau",
    ],
    venue: "SAE Technical Paper 2012-01-0176",
    href: "https://doi.org/10.4271/2012-01-0176",
    source:
      "https://saemobilus.sae.org/papers/process-making-aerodynamically-efficient-car-body-sae-supermileage-competition-2012-01-0176",
  },
];

// Caltech's degree/repository year is 2021; the defense took place in 2020.
export const phdThesis: Publication = {
  year: 2021,
  imageFolder: "2021_Beardsell_Caltech_Thesis",
  title:
    "Numerical Investigation of Compressibility Effects in Reacting Subsonic Flows",
  authors: ["Guillaume Beardsell"],
  venue: "Ph.D. dissertation, California Institute of Technology",
  href: "https://doi.org/10.7907/dtfx-gy14",
  source: "https://thesis.caltech.edu/13996/",
};

// The Laval master's thesis link is the persistent handle exposed by Érudit.
export const theses: Publication[] = [
  phdThesis,
  {
    year: 2016,
    title: "Spectral simulations of the reconnection process of two vortices",
    authors: ["Guillaume Beardsell"],
    venue: "M.Sc. thesis, Université Laval",
    href: "https://hdl.handle.net/20.500.11794/26651",
    source:
      "https://www.erudit.org/fr/theses/laval/B/?page=7&sort_by=title_asc",
  },
];

// The original JCP paper cites both OSU datasets as 2019 (references 62–63).
// Scholar displays 2020 for the multicomponent record; the repository could
// not be fetched during verification, so the original authored citation is
// retained here. The Zenodo title preserves the dataset's original wording.
export const datasets: Publication[] = [
  {
    year: 2019,
    title:
      'Figures, plotting scripts, and data for "A fast, low-cost, and stable memory algorithm for implementing multicomponent transport in direct numerical simulations"',
    authors: [
      "Aaron J. Fillo",
      "Jason Schlup",
      "Guillaume Beardsell",
      "Guillaume Blanquart",
      "Kyle E. Niemeyer",
    ],
    venue: "Dataset, Zenodo",
    href: "https://doi.org/10.5281/zenodo.3519910",
    source: "https://zenodo.org/records/3519910",
  },
  {
    year: 2019,
    title:
      "Direct numerical simulation results for turbulent hydrogen/air flame: multicomponent diffusion model",
    authors: [
      "Aaron J. Fillo",
      "Jason Schlup",
      "Guillaume Beardsell",
      "Guillaume Blanquart",
      "Kyle E. Niemeyer",
    ],
    venue: "Dataset, Oregon State University",
    href: "https://doi.org/10.7267/2f75rf80s",
    source: "https://par.nsf.gov/servlets/purl/10191202",
  },
  {
    year: 2019,
    title:
      "Direct numerical simulation results for turbulent hydrogen/air flame: mixture-averaged diffusion model",
    authors: [
      "Aaron J. Fillo",
      "Jason Schlup",
      "Guillaume Beardsell",
      "Guillaume Blanquart",
      "Kyle E. Niemeyer",
    ],
    venue: "Dataset, Oregon State University",
    href: "https://doi.org/10.7267/c247f0072",
    source: "https://par.nsf.gov/servlets/purl/10191202",
  },
];
