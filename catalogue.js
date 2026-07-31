// ─────────────────────────────────────────────
//  CATALOGUE TRADISCOUT
//  Source de vérité unique — front + API
// ─────────────────────────────────────────────

const COLLECTIONS = [
  { id: 'premium', label: 'Premium'    },
  { id: 'scouts',  label: 'Classique'  },
  { id: 'ete2026', label: 'Été 2026'    }

];

const TYPES = [
  { 
    id: 'tshirt', 
    label: 'T-Shirt', 
    code: '1', 
    price: { scouts: 15, premium: 15 , ete2026: 15 }
  },
  { 
    id: 'sweat',  
    label: 'Sweat',  
    code: '2', 
    price: { scouts: 33, premium: 33, ete2026: 35 } 
  },
  { 
    id: 'hoodie', 
    label: 'Hoodie', 
    code: '3', 
    price: { scouts: 37, premium: 37, ete2026: 39 } 
  }
];

const COLORS = [
  { id: 'blanc', label: 'Blanc',  code: '1' },
  { id: 'ciel', label: 'Ciel',  code: '2' },
  { id: 'marine',  label: 'Marine', code: '3' }
];

const SIZES = ['S', 'M', 'L', 'XL'];

// ─── DESIGNS ───────────────────────────────
// Chaque produit :
//   id          → identifiant unique (string)
//   key         → slug URL-safe
//   label       → nom affiché
//   description → courte phrase affichée dans la lightbox
//   types       → sous-ensemble de TYPES disponibles
//   colors      → sous-ensemble de COLORS disponibles
//   images      → liste de noms de fichiers dans /images/
//                 (n'importe quel nom, lifestyle ou pack shot)
//   collection  → id d'une COLLECTION

const DESIGNS = [
  //CLASSIQUES
  {
    id: '8', key: 'st-michel', label: 'St Michel',
    description: 'DOS - Saint patron des para<br>Hoodie = sweat avec capuche',
    types:  ['tshirt','sweat','hoodie'],
    colors: ['blanc', 'fonce'],
    images: ['StMichelW.jpg','StMichelB.png','image 19.jpg','image20.png','image 15.jpg','image 16.png'],
    collection: 'scouts',
  },
  {
    id: '9', key: 'st-jean-marie-vianney', label: 'St Jean-Marie Vianney',
    description: 'DOS - Saint patron des prêtres<br>Hoodie = sweat avec capuche',
    types:  ['tshirt','sweat','hoodie'],
    colors: ['blanc', 'fonce'],
    images: ['StVianneyW.jpg','StVianneyB.png','image 25.jpg','image 26.png','image 21.jpg','image 22.png'],
    collection: 'scouts',
  },
  {
    id: '10', key: 'st-george', label: 'St George',
    description: 'DOS - Saint patron des scouts<br>Hoodie = sweat avec capuche',
    types:  ['tshirt', 'sweat', 'hoodie'],
    colors: ['blanc', 'fonce'],
    images: ['StGeorgeW.jpg','StGeorgeB.png','image 24.jpg','image 23.png','image 18.jpg','image 17.png'],
    collection: 'scouts',
  },
  //PREMIUM
  {
    id: '11', key: 'lys', label: 'Cinq Lys',
    description: 'DEVANT - Symbole de royauté depuis 496',
    types:  ['tshirt', 'sweat'],
    colors: ['blanc', 'fonce'],
    images: ['image 79.png', 'image 80.png', 'image 83.png', 'image 81.png'],
    collection: 'premium',
  },
  {
    id: '12', key: 'rose', label: 'Rose Mystique',
    description: 'DEVANT - Nom donné à la Vierge Marie',
    types:  ['tshirt', 'sweat'],
    colors: ['blanc', 'fonce'],
    images: ['image 90.png', 'image 89.png', 'image 85.png', 'image 86.png'],
    collection: 'premium',
  },
  {
    id: '13', key: 'corsacrum', label: 'Cor Sacrum Jesu',
    description: 'DEVANT - Dévoilé à Sainte Marguerite-Marie',
    types:  ['tshirt', 'sweat'],
    colors: ['blanc', 'fonce'],
    images: ['image 94.png', 'image 95.png', 'image 98.png', 'image 99.png'],
    collection: 'premium',
  },
  {
    id: '14', key: 'sacrecoeur', label: 'Sacré-Cœur de Jésus',
    description: 'DOS - Depuis la fin du XVIIe siècle<br>Hoodie = sweat avec capuche',
    types:  ['tshirt', 'sweat', 'hoodie'],
    colors: ['blanc', 'fonce'],
    images: ['image 97.png', 'image 96.png', 'img1.jpeg', 'img2.jpeg', 'img3.jpeg', 'img4.jpeg'],
    collection: 'premium',
  },
  // PRECOMMANDES
  {
    id: '15', key: 'grosrosamytica', label: 'Rosa Mystica',
    description: 'DOS et DEVANT - Marie, la rose sans épines',
    types:  ['tshirt', 'sweat'],
    colors: ['blanc', 'clair', 'fonce'],
    images: ['Group 30.png', 'Group 32.png', 'Group 34.png', 'Group 36.png'],
    collection: 'ete2026',
  },
  {
    id: '16', key: 'grossacrumjesu', label: 'Cor Sacrum Jesu',
    description: 'DOS et DEVANT - Dévotion datant du XVIIe',
    types:  ['tshirt', 'sweat'],
    colors: ['blanc', 'clair', 'fonce'],
    images: ['Group 30.png', 'Group 29.png', 'Group 34.png', 'Group 33.png'],
    collection: 'ete2026',
  },
  {
    id: '17', key: 'espritsaint', label: "Poussé par l'Esprit Saint",
    description: 'DOS et DEVANT - Jean 16:13',
    types:  ['tshirt'],
    colors: ['blanc', 'clair'],
    images: ['image 137.png', 'image 139.png', 'Group 38.png'],
    collection: 'ete2026',
  },
  {
    id: '18', key: 'sportsclub', label: 'Sports Club',
    description: 'DOS et DEVANT - Fort dans la foi',
    types:  ['tshirt'],
    colors: ['blanc', 'clair'],
    images: ['image 137.png', 'image 127.png', 'Group 37.png'],
    collection: 'ete2026',
  },
];
// ATTENTION A L'ID IL FAUT QU'IL SOIT UNIQUE POUR CHAQUE PRODUIT

// ─── HELPERS ───────────────────────────────

/** Première image d'un design (fallback carte grille) */
function coverImg(designKey) {
  const d = DESIGNS.find(x => x.key === designKey);
  return d && d.images.length ? d.images[0] : 'placeholder.png';
}

/**
 * Récupère le prix d'un produit selon son type et sa collection
 * @param {string} designKey - Le slug du design (ex: 'tradiscout' ou 'croixnika')
 * @param {string} typeId - Le type de vêtement (ex: 'tshirt', 'sweat')
 * @returns {number} Le prix correspondant ou 0 si non trouvé
 */
function getProductPrice(designKey, typeId) {
  const design = DESIGNS.find(d => d.key === designKey);
  const type = TYPES.find(t => t.id === typeId);
  
  if (!design || !type) return 0;
  
  // Récupère le prix de la collection du design, ou un fallback s'il y a un souci
  return type.price[design.collection] || 0;
}

if (typeof module !== 'undefined') {
  module.exports = { COLLECTIONS, TYPES, COLORS, SIZES, DESIGNS, coverImg, getProductPrice };
}
