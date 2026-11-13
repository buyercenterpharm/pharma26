// Catalogue supplied by PHARMA26. Categories are catalogue groupings, not stock claims.
// Mölnlycke and ENEOMEY spellings confirmed by the user; original spellings remain search aliases.
export const brandCategories = [
  {
    "id": "dermocosmetics",
    "label": "Dermocosmetics"
  },
  {
    "id": "cosmetics",
    "label": "Cosmetics"
  },
  {
    "id": "perfumes",
    "label": "Perfumes"
  },
  {
    "id": "professional-haircare",
    "label": "Professional Haircare"
  },
  {
    "id": "pharmacy",
    "label": "Pharmacy"
  },
  {
    "id": "other-brands",
    "label": "Other Brands"
  }
] as const;
export type BrandCategory = typeof brandCategories[number]['id'];
export interface VerifiedBrandLogo {
  src: string;
  width: number;
  height: number;
  sourceUrl: string;
  verifiedAt: string;
  usageBasis: string;
  identityVerified: true;
  usageApproved: true;
}
export interface Brand {
  id: string;
  name: string;
  categories: BrandCategory[];
  aliases?: string[];
  logo?: VerifiedBrandLogo;
}
// No unverified logos: populate logo only after source/identity and usage review.
export const brands: Brand[] = [
  {
    "id": "la-roche-posay",
    "name": "La Roche-Posay",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "vichy",
    "name": "Vichy",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "nuxe",
    "name": "Nuxe",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "avene",
    "name": "Avène",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "bioderma",
    "name": "Bioderma",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "uriage",
    "name": "Uriage",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "filorga",
    "name": "Filorga",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "caudalie",
    "name": "Caudalie",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "embryolisse",
    "name": "Embryolisse",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "eucerin",
    "name": "Eucerin",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "isdin",
    "name": "ISDIN",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "melvita",
    "name": "Melvita",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "l-occitane",
    "name": "L'Occitane",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "roger-gallet",
    "name": "Roger & Gallet",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "sesderma",
    "name": "Sesderma",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "skinceuticals",
    "name": "SkinCeuticals",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "mustela",
    "name": "Mustela",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "weleda",
    "name": "Weleda",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "a-derma",
    "name": "A-Derma",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "biocyte",
    "name": "Biocyte",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "phyto",
    "name": "Phyto",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "physiogel",
    "name": "Physiogel",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "evian",
    "name": "Evian",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "etiaxil",
    "name": "Etiaxil",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "roge-cavailles",
    "name": "Rogé Cavaillès",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "dr-hauschka",
    "name": "Dr. Hauschka",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "eneomey",
    "name": "ENEOMEY",
    "categories": [
      "dermocosmetics"
    ],
    "aliases": [
      "Eneomay"
    ]
  },
  {
    "id": "pileje",
    "name": "PiLeJe",
    "categories": [
      "dermocosmetics"
    ]
  },
  {
    "id": "lancome",
    "name": "Lancôme",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "martiderm",
    "name": "MartiDerm",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "la-mer",
    "name": "La Mer",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "la-prairie",
    "name": "La Prairie",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "guerlain",
    "name": "Guerlain",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "chanel",
    "name": "Chanel",
    "categories": [
      "cosmetics",
      "perfumes"
    ]
  },
  {
    "id": "bourjois",
    "name": "Bourjois",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "svr",
    "name": "SVR",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "darphin",
    "name": "Darphin",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "clarins",
    "name": "Clarins",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "yves-saint-laurent",
    "name": "Yves Saint Laurent",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "shiseido",
    "name": "Shiseido",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "bionike",
    "name": "BioNike",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "natura-bisse",
    "name": "Natura Bissé",
    "categories": [
      "cosmetics"
    ]
  },
  {
    "id": "creed",
    "name": "Creed",
    "categories": [
      "perfumes"
    ]
  },
  {
    "id": "dior",
    "name": "Dior",
    "categories": [
      "perfumes"
    ]
  },
  {
    "id": "dolce-gabbana",
    "name": "Dolce & Gabbana",
    "categories": [
      "perfumes"
    ]
  },
  {
    "id": "klorane",
    "name": "Klorane",
    "categories": [
      "professional-haircare"
    ]
  },
  {
    "id": "moroccanoil",
    "name": "Moroccanoil",
    "categories": [
      "professional-haircare"
    ]
  },
  {
    "id": "kerastase",
    "name": "Kérastase",
    "categories": [
      "professional-haircare"
    ]
  },
  {
    "id": "rene-furterer",
    "name": "René Furterer",
    "categories": [
      "professional-haircare"
    ]
  },
  {
    "id": "nioxin",
    "name": "Nioxin",
    "categories": [
      "professional-haircare"
    ]
  },
  {
    "id": "redken",
    "name": "Redken",
    "categories": [
      "professional-haircare"
    ]
  },
  {
    "id": "alpecin",
    "name": "Alpecin",
    "categories": [
      "professional-haircare"
    ]
  },
  {
    "id": "ghd",
    "name": "GHD",
    "categories": [
      "professional-haircare"
    ]
  },
  {
    "id": "tigi",
    "name": "TIGI",
    "categories": [
      "professional-haircare"
    ]
  },
  {
    "id": "olaplex",
    "name": "Olaplex",
    "categories": [
      "professional-haircare"
    ]
  },
  {
    "id": "shu-uemura",
    "name": "Shu Uemura",
    "categories": [
      "professional-haircare"
    ]
  },
  {
    "id": "contour-next",
    "name": "Contour Next",
    "categories": [
      "pharmacy"
    ]
  },
  {
    "id": "verio",
    "name": "Verio",
    "categories": [
      "pharmacy"
    ]
  },
  {
    "id": "accu-chek",
    "name": "Accu-Chek",
    "categories": [
      "pharmacy"
    ]
  },
  {
    "id": "freestyle",
    "name": "FreeStyle",
    "categories": [
      "pharmacy"
    ]
  },
  {
    "id": "revitacare",
    "name": "Revitacare",
    "categories": [
      "pharmacy"
    ]
  },
  {
    "id": "kelo-cote",
    "name": "Kelo-Cote",
    "categories": [
      "other-brands"
    ]
  },
  {
    "id": "somatoline",
    "name": "Somatoline",
    "categories": [
      "other-brands"
    ]
  },
  {
    "id": "pediakid",
    "name": "Pediakid",
    "categories": [
      "other-brands"
    ]
  },
  {
    "id": "braun",
    "name": "Braun",
    "categories": [
      "other-brands"
    ]
  },
  {
    "id": "oral-b",
    "name": "Oral-B",
    "categories": [
      "other-brands"
    ]
  },
  {
    "id": "herbacin",
    "name": "Herbacin",
    "categories": [
      "other-brands"
    ]
  },
  {
    "id": "vitacreme-b12",
    "name": "Vitacreme B12",
    "categories": [
      "other-brands"
    ]
  },
  {
    "id": "medela",
    "name": "Medela",
    "categories": [
      "other-brands"
    ]
  },
  {
    "id": "avent",
    "name": "Avent",
    "categories": [
      "other-brands"
    ]
  },
  {
    "id": "dyson",
    "name": "Dyson",
    "categories": [
      "other-brands"
    ]
  },
  {
    "id": "molnlycke",
    "name": "Mölnlycke",
    "categories": [
      "other-brands"
    ],
    "aliases": [
      "Molnycke"
    ]
  },
  {
    "id": "physiolac",
    "name": "Physiolac",
    "categories": [
      "other-brands"
    ]
  },
  {
    "id": "systane",
    "name": "Systane",
    "categories": [
      "other-brands"
    ]
  },
  {
    "id": "audispray",
    "name": "Audispray",
    "categories": [
      "other-brands"
    ]
  }
];
export const brandDisclaimer = 'Brand availability is subject to sourcing and market conditions. All trademarks and logos belong to their respective owners. Brand references do not imply official affiliation or endorsement.';
export const categoryCount = (id: BrandCategory) => brands.filter(brand => brand.categories.includes(id)).length;
export const categoryLabel = (id: BrandCategory) => brandCategories.find(category => category.id === id)!.label;
export const normalizeBrandSearch = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('en').replace(/[^a-z0-9]/g, '');
export function findBrands(category: string, query: string) {
  const search = normalizeBrandSearch(query);
  return brands.filter(brand => (category === 'all' || brand.categories.includes(category as BrandCategory)) &&
    [brand.name, ...(brand.aliases ?? [])].some(name => normalizeBrandSearch(name).includes(search)))
    .sort((a,b) => a.name.localeCompare(b.name, 'en', {sensitivity:'base'}));
}
export const showcasedBrands = ['la-roche-posay','nuxe','caudalie','la-mer','creed','kerastase','contour-next','medela'].map(id => brands.find(brand => brand.id === id)!);
