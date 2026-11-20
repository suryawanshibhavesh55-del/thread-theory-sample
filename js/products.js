// THREAD THEORY by Khushboo - Luxury Product Catalog
// All assets mapped directly to verified boutique image assets

const PRODUCTS_DATA = [
  {
    id: "tt-14",
    name: "Chandni Champagne Raw Silk Set",
    slug: "chandni-champagne-raw-silk-set",
    price: 16800,
    originalPrice: null,
    category: "Farshi",
    categorySlug: "farshi",
    collection: ["new-in", "festive-edit", "the-collection"],
    badge: "NEW",
    isNew: true,
    isFestive: true,
    isBestSeller: true,
    image: "assets/WhatsApp Image 2026-11-18 at 11.46.06 AM.jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.46.06 AM.jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.46.07 AM.jpeg"
    ],
    color: "Light Champagne",
    fabric: "Loom-Spun Raw Silk",
    craft: "Fine Marodi & Zardozi Needlecraft",
    description: "The essence of timeless Indian luxury. Crafted from heirloom-grade loom-spun raw silk in champagne gold, featuring intricate marodi borders that glisten under festive lights.",
    details: [
      "Classic royal neckline with handcrafted buttons",
      "Voluminous palazzo with broad embroidered border",
      "Silk organza dupatta with hand-finished fringes",
      "Tailored at the Mumbai atelier"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "tt-15",
    name: "Nazneen Mauve Bloom Georgette Suit",
    slug: "nazneen-mauve-bloom-georgette-suit",
    price: 13900,
    originalPrice: null,
    category: "Kurta Sets",
    categorySlug: "summer-casuals",
    collection: ["new-in", "the-collection"],
    badge: "NEW",
    isNew: true,
    isFestive: false,
    isBestSeller: false,
    image: "assets/WhatsApp Image 2026-11-18 at 11.46.07 AM (1).jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.46.07 AM (1).jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.46.05 AM (2).jpeg"
    ],
    color: "Mauve Bloom",
    fabric: "Pure Viscose Georgette",
    craft: "Chikankari & Mukaish Highlights",
    description: "A romantic blend of ethereal drape and artisanal needlework. The Nazneen suit is rendered in dusty mauve georgette with tonal Chikankari florals and sparkling mukaish dots.",
    details: [
      "Calf-length tunic with full lining",
      "Comfort-fit straight pants with pocket",
      "Pre-shrunk artisanal fabric",
      "Comes with matching dupatta"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "tt-16",
    name: "Alizeh Pearl White Farshi Ensemble",
    slug: "alizeh-pearl-white-farshi-ensemble",
    price: 18500,
    originalPrice: 21000,
    category: "Farshi",
    categorySlug: "farshi",
    collection: ["new-in", "festive-edit", "the-collection"],
    badge: "EXCLUSIVE",
    isNew: true,
    isFestive: true,
    isBestSeller: true,
    image: "assets/WhatsApp Image 2026-11-18 at 11.46.07 AM.jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.46.07 AM.jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.46.06 AM.jpeg"
    ],
    color: "Pearl White",
    fabric: "Mulberry Silk Brocade",
    craft: "Antique Silver Zari & Pearl Tassels",
    description: "The crown jewel of Khushboo's festive curation. Alizeh brings the monumental elegance of the farshi gharara into modern couture, detailed with hand-strung freshwater pearls.",
    details: [
      "Paneled Farshi flared skirt with stiffened hem",
      "Short kurti with scalloped border and keyhole back",
      "Embellished organza veil with hand-twisted tassels",
      "Handcrafted in limited editions only"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "tt-03",
    name: "Noor Zardozi Crepe Tunic",
    slug: "noor-zardozi-crepe-tunic",
    price: 12800,
    originalPrice: null,
    category: "Kurta Sets",
    categorySlug: "summer-casuals",
    collection: ["the-collection"],
    badge: null,
    isNew: false,
    isFestive: false,
    isBestSeller: false,
    image: "assets/WhatsApp Image 2026-11-18 at 11.45.47 AM.jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.45.47 AM.jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.45.51 AM.jpeg"
    ],
    color: "Oyster White",
    fabric: "High-Twist Silk Crepe",
    craft: "Hand Cutwork with Dabka",
    description: "Effortlessly poised for daytime intimate gatherings and evening celebrations alike. Noor combines a sculpted mandarin collar with fluid drape and tonal hand embroidery.",
    details: [
      "Structured shoulder with comfortable drape",
      "Delicate cutwork at cuffs and hemline",
      "Breathable natural fiber blend",
      "Includes slip dress"
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "tt-05",
    name: "Zarin Marigold Resham Kaftan",
    slug: "zarin-marigold-resham-kaftan",
    price: 9450,
    originalPrice: null,
    category: "Kaftans",
    categorySlug: "kaftans",
    collection: ["festive-edit", "new-in"],
    badge: "NEW",
    isNew: true,
    isFestive: true,
    isBestSeller: true,
    image: "assets/WhatsApp Image 2026-11-18 at 11.45.56 AM.jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.45.56 AM.jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.46.02 AM.jpeg"
    ],
    color: "Golden Marigold",
    fabric: "Pure Cupro Chiffon",
    craft: "Resham Needlecraft & Gota Patti",
    description: "Radiant, sun-kissed warmth woven into flowing luxury. The Zarin Kaftan features a flattering deep V-neckline framed with intricate hand-embroidered border motifs and tassel drawstrings.",
    details: [
      "Adjustable inner bust cinch for bespoke fit",
      "Cascading flutter sleeves",
      "Handmade silk thread tassels with brass bells",
      "Lightweight, crease-resistant finish"
    ],
    sizes: ["Free Size (XS-XXL)"]
  },
  {
    id: "tt-06",
    name: "Sitara Slate Indigo Farshi Suit",
    slug: "sitara-slate-indigo-farshi-suit",
    price: 15800,
    originalPrice: null,
    category: "Farshi",
    categorySlug: "farshi",
    collection: ["festive-edit", "the-collection"],
    badge: "FESTIVE",
    isNew: false,
    isFestive: true,
    isBestSeller: true,
    image: "assets/WhatsApp Image 2026-11-18 at 11.46.02 AM (1).jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.46.02 AM (1).jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.46.05 AM.jpeg"
    ],
    color: "Slate Indigo",
    fabric: "Organza Brocade & Tissue Silk",
    craft: "Tilla Zari & Resham Border Embroidery",
    description: "Inspired by the royal courts of Awadh, the Sitara Farshi ensemble is engineered with dramatic flared bottoms that sweep the floor with unmatched grace.",
    details: [
      "Structured kurti with side zip fastening",
      "Voluminous Farshi pajama with weighted border",
      "Dual-tone zari embroidery along hem",
      "Comes with handcrafted tissue stole"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "tt-07",
    name: "Mehr Terracotta Printed Kaftan",
    slug: "mehr-terracotta-printed-kaftan",
    price: 8900,
    originalPrice: 10500,
    category: "Kaftans",
    categorySlug: "kaftans",
    collection: ["the-collection", "sale"],
    badge: "SALE",
    isNew: false,
    isFestive: false,
    isBestSeller: false,
    image: "assets/WhatsApp Image 2026-11-18 at 11.46.02 AM.jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.46.02 AM.jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.45.56 AM.jpeg"
    ],
    color: "Terracotta Rust",
    fabric: "Modal Satin",
    craft: "Artisanal Woodblock Print & Mirror Accents",
    description: "Earthy hues meet bohemian luxury in the Mehr Kaftan. Drapes like a dream over the silhouette, adorned with micro-mirror highlights that capture candlelight.",
    details: [
      "Hand block-printed with natural azo-free dyes",
      "Soft sheen modal satin with liquid fall",
      "Gentle side slit for ease of movement",
      "Hand wash cold separately"
    ],
    sizes: ["Free Size (XS-XXL)"]
  },
  {
    id: "tt-08",
    name: "Ruhi Oyster Organza Kurta Set",
    slug: "ruhi-oyster-organza-kurta-set",
    price: 13500,
    originalPrice: null,
    category: "Kurta Sets",
    categorySlug: "summer-casuals",
    collection: ["new-in", "the-collection"],
    badge: "NEW",
    isNew: true,
    isFestive: false,
    isBestSeller: false,
    image: "assets/WhatsApp Image 2026-11-18 at 11.46.03 AM.jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.46.03 AM.jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.46.07 AM.jpeg"
    ],
    color: "Oyster Crepe",
    fabric: "Tissue Organza with Cotton Mul",
    craft: "Parchinkari Thread Embroidery",
    description: "Subtle opulence at its finest. The Ruhi Kurta Set carries intricate geometric needlework along the yoke, complemented by a lustrous organza sheen.",
    details: [
      "Straight tunic with keyhole neckline",
      "Full sleeves with pearl buttoned cuffs",
      "Tapered ankle-length pants included",
      "Handmade by master artisans in Lucknow"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "tt-09",
    name: "Tara Sandstone Muted Co-ord",
    slug: "tara-sandstone-muted-co-ord",
    price: 10500,
    originalPrice: null,
    category: "Co-ord Sets",
    categorySlug: "co-ord-sets",
    collection: ["the-collection", "new-in"],
    badge: "NEW",
    isNew: true,
    isFestive: false,
    isBestSeller: true,
    image: "assets/WhatsApp Image 2026-11-18 at 11.46.04 AM (1).jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.46.04 AM (1).jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.45.51 AM.jpeg"
    ],
    color: "Sandstone Mocha",
    fabric: "Slub Linen Silk Blend",
    craft: "Tone-on-Tone Stitchwork",
    description: "Minimalist architecture translated into wearable fashion. Clean lines, a modern notch collar, and a forgiving oversized silhouette tailored for the discerning modern woman.",
    details: [
      "Contemporary asymmetric hemline",
      "Wide pleated trouser with tailored waistband",
      "Breathable high-density weave",
      "Iron on low heat"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "tt-10",
    name: "Gulabi Ruby Wine Velvet Farshi",
    slug: "gulabi-ruby-wine-velvet-farshi",
    price: 17900,
    originalPrice: null,
    category: "Farshi",
    categorySlug: "farshi",
    collection: ["festive-edit", "new-in"],
    badge: "EXCLUSIVE",
    isNew: true,
    isFestive: true,
    isBestSeller: true,
    image: "assets/WhatsApp Image 2026-11-18 at 11.46.04 AM.jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.46.04 AM.jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.46.02 AM (1).jpeg"
    ],
    color: "Ruby Wine",
    fabric: "Micro Velvet & Tissue Organza",
    craft: "Heavy Zardozi with Real Gota & Dabka",
    description: "An extraordinary showstopper for winter weddings and grand soirees. Lush jewel-toned micro velvet adorned with dense antique gold embroidery inspired by Mughal motifs.",
    details: [
      "Rich micro velvet with deep pile and sumptuous drape",
      "Heavily embroidered neckplate with ruby crystal drops",
      "Paired with flared farshi bottoms and gossamer dupatta",
      "Made to order in our Mumbai atelier"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "tt-11",
    name: "Anahita Pistachio Sage Tussar Set",
    slug: "anahita-pistachio-sage-tussar-set",
    price: 12400,
    originalPrice: 14000,
    category: "Co-ord Sets",
    categorySlug: "co-ord-sets",
    collection: ["the-collection", "sale"],
    badge: "SALE",
    isNew: false,
    isFestive: false,
    isBestSeller: false,
    image: "assets/WhatsApp Image 2026-11-18 at 11.46.05 AM (1).jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.46.05 AM (1).jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.46.05 AM (2).jpeg"
    ],
    color: "Pistachio Sage",
    fabric: "Desi Tussar Silk",
    craft: "Hand Kantha Stitchwork",
    description: "Serene and grounded, the Anahita set pairs botanical tranquility with refined tailoring. Cut in textured Tussar silk that softens beautifully with every wear.",
    details: [
      "Three-quarter sleeves with contrast piped trims",
      "Straight pants with side slit and pocket",
      "Natural organic dyes",
      "Gentle steam press recommended"
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "tt-12",
    name: "Afreen Peach Blossom Kurta Set",
    slug: "afreen-peach-blossom-kurta-set",
    price: 11200,
    originalPrice: null,
    category: "Kurta Sets",
    categorySlug: "summer-casuals",
    collection: ["new-in", "the-collection"],
    badge: "NEW",
    isNew: true,
    isFestive: false,
    isBestSeller: true,
    image: "assets/WhatsApp Image 2026-11-18 at 11.46.05 AM (2).jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.46.05 AM (2).jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.46.07 AM (1).jpeg"
    ],
    color: "Peach Blossom",
    fabric: "Chanderi Cotton Silk",
    craft: "Floral Shadow Work Embroidery",
    description: "Evoking fresh morning garden blooms, Afreen features delicate pastel threadwork on crisp Chanderi. A versatile wardrobe staple for festivities and intimate dinners.",
    details: [
      "Round neck with delicate thread tasseling",
      "Breathable pure cotton voile lining",
      "Straight cigarette pants included",
      "Featherlight silhouette"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "tt-13",
    name: "Shab-e-Noor Midnight Onyx Kaftan",
    slug: "shab-e-noor-midnight-onyx-kaftan",
    price: 14900,
    originalPrice: null,
    category: "Kaftans",
    categorySlug: "kaftans",
    collection: ["festive-edit", "new-in"],
    badge: "NEW",
    isNew: true,
    isFestive: true,
    isBestSeller: true,
    image: "assets/WhatsApp Image 2026-11-18 at 11.46.05 AM.jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.46.05 AM.jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.46.04 AM.jpeg"
    ],
    color: "Midnight Onyx",
    fabric: "Hammered Crepe Silk",
    craft: "Swarovski Crystal & Matte Black Beadwork",
    description: "Dramatic evening glamour personified. The Shab-e-Noor Kaftan cascades like liquid midnight, illuminated by subtle hand-placed crystals that catch the ambient light.",
    details: [
      "Plunging neckline with inner modesty snap",
      "Floor-length dramatic wingspan",
      "Weighted hem for clean fall",
      "Signature Khushboo silhouette"
    ],
    sizes: ["Free Size (XS-XXL)"]
  },
  {
    id: "tt-01",
    name: "Sabaa Ivory Hand-Embroidered Kurta Set",
    slug: "sabaa-ivory-hand-embroidered-kurta-set",
    price: 14500,
    originalPrice: 16500,
    category: "Kurta Sets",
    categorySlug: "summer-casuals",
    collection: ["the-collection"],
    badge: null,
    isNew: false,
    isFestive: false,
    isBestSeller: true,
    image: "assets/WhatsApp Image 2026-11-18 at 11.45.31 AM.jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.45.31 AM.jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.45.43 AM.jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.45.47 AM.jpeg"
    ],
    color: "Ivory Pearl",
    fabric: "Pure Chanderi Silk with Mulmul Lining",
    craft: "Hand Zardozi & Delicate Mukaish Detailing",
    description: "An ode to understated Indian royalty, the Sabaa Kurta Set is meticulously crafted from featherlight Chanderi silk. Features a relaxed straight silhouette adorned with hand-worked floral needlecraft along the neckline and cuffs, paired with tailored straight-fit trousers and a scalloped organza dupatta.",
    details: [
      "Straight-cut tunic with side slits",
      "Hand-embroidered yoke with mother-of-pearl accents",
      "Concealed in-seam pockets in trouser",
      "Includes 2.5m translucent organza dupatta",
      "Dry clean only"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "tt-02",
    name: "Zoya Chiffon Lace Anarkali Set",
    slug: "zoya-chiffon-lace-anarkali-set",
    price: 16200,
    originalPrice: null,
    category: "Farshi",
    categorySlug: "farshi",
    collection: ["the-collection", "festive-edit"],
    badge: null,
    isNew: false,
    isFestive: true,
    isBestSeller: true,
    image: "assets/WhatsApp Image 2026-11-18 at 11.45.43 AM.jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.45.43 AM.jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.45.31 AM.jpeg"
    ],
    color: "Soft Ecru",
    fabric: "Georgette Chiffon & Cotton Silk",
    craft: "Pita Work & Vintage Lace Borders",
    description: "Sweeping floor-grazing flared silhouette crafted with delicate tiered pleats. The Zoya Anarkali strikes a harmonious balance between traditional festivity and contemporary ease, punctuated with antique zari accents.",
    details: [
      "Kalidar paneled silhouette with 4.5m flare",
      "Intricate threadwork with gold corded piping",
      "Fitted churidar with elasticated waistband",
      "Pre-washed artisanal fabric",
      "Specialist dry clean"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "tt-04",
    name: "Mehroosh Handloom Silk Co-ord",
    slug: "mehroosh-handloom-silk-co-ord",
    price: 11900,
    originalPrice: 13500,
    category: "Co-ord Sets",
    categorySlug: "co-ord-sets",
    collection: ["the-collection"],
    badge: "SALE",
    isNew: false,
    isFestive: false,
    isBestSeller: true,
    image: "assets/WhatsApp Image 2026-11-18 at 11.45.51 AM.jpeg",
    gallery: [
      "assets/WhatsApp Image 2026-11-18 at 11.45.51 AM.jpeg",
      "assets/WhatsApp Image 2026-11-18 at 11.45.47 AM.jpeg"
    ],
    color: "Champagne Cream",
    fabric: "Raw Matka Silk",
    craft: "Aari Stitch and Geometric Threadwork",
    description: "A masterclass in modern festive tailoring. The Mehroosh Co-ord Set unites a relaxed high-low tunic shirt with cropped wide-leg trousers, finished with artisanal buttons.",
    details: [
      "Concealed placket with horn buttons",
      "Wide-leg palazzo trousers with drawcord waist",
      "Two deep functional side pockets",
      "Designed for all-day comfort"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  }
];

// Category definitions matching the reference screenshot layout
const CATEGORIES_DATA = [
  {
    name: "Co-ord Sets",
    slug: "co-ord-sets",
    count: 4,
    image: "assets/WhatsApp Image 2026-11-18 at 11.45.51 AM.jpeg",
    description: "Effortless contemporary two-piece ensembles"
  },
  {
    name: "Farshi",
    slug: "farshi",
    count: 5,
    image: "assets/WhatsApp Image 2026-11-18 at 11.46.02 AM (1).jpeg",
    description: "Regal flared silhouettes inspired by royal ateliers"
  },
  {
    name: "Kaftans",
    slug: "kaftans",
    count: 3,
    image: "assets/WhatsApp Image 2026-11-18 at 11.45.56 AM.jpeg",
    description: "Flowing artisanal silhouettes for celebrations"
  },
  {
    name: "Summer Casuals",
    slug: "summer-casuals",
    count: 4,
    image: "assets/WhatsApp Image 2026-11-18 at 11.45.31 AM.jpeg",
    description: "Breathable silk and chanderi daywear essentials"
  }
];

// Currency conversion rates (base INR)
const CURRENCIES = {
  INR: { symbol: "₹", rate: 1, label: "India | INR ₹" },
  USD: { symbol: "$", rate: 0.012, label: "USA | USD $" },
  GBP: { symbol: "£", rate: 0.0095, label: "UK | GBP £" },
  EUR: { symbol: "€", rate: 0.011, label: "Europe | EUR €" }
};
