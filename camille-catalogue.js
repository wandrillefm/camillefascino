// ─────────────────────────────────────────────
//  CATALOGUE CAMILLE FASCINO
//  3 navy tees — same price, same cut
// ─────────────────────────────────────────────

const COLLECTIONS = [
  { id: 'drop1', label: 'Drop 1' }
];

const TYPES = [
  { 
    id: 'tshirt', 
    label: 'T-Shirt', 
    code: '1', 
    price: { drop1: 39 }
  }
];

const COLORS = [
  { id: 'blue', label: 'Light Blue', code: '1' },
  { id: 'pink', label: 'Soft Pink', code: '2' },
  { id: 'yellow', label: 'Pastel Yellow', code: '3' },
  { id: 'white', label: 'White', code: '4' }
];

const SIZES = ['S', 'M', 'L', 'XL'];

// ─── DESIGNS ───────────────────────────────
// Camille Fascino — 3 pieces, same philosophy

const DESIGNS = [
  {
    id: '1', 
    key: 'love', 
    label: 'LOVE TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Groupe 41.jpeg', 'Groupe 42.jpeg', 'Groupe 43.jpeg', 'Groupe 44.jpeg'],
    collection: 'drop1',
  },
  {
    id: '2', 
    key: 'sorry', 
    label: 'SORRY TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Groupe 45.jpeg', 'Groupe 46.jpeg', 'Groupe 47.jpeg', 'Groupe 48.jpeg'],
    collection: 'drop1',
  },
  {
    id: '3', 
    key: 'kid', 
    label: 'KID TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Groupe 49.jpeg', 'Groupe 50.jpeg', 'Groupe 51.jpeg', 'Groupe 52.jpeg'],
    collection: 'drop1',
  },
  {
    id: '4', 
    key: 'life', 
    label: 'LIFE TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Groupe 53.jpeg', 'Groupe 54.jpeg', 'Groupe 55.jpeg', 'Groupe 56.jpeg'],
    collection: 'drop1',
  },
  {
    id: '5', 
    key: 'words', 
    label: 'WORDS TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Groupe 57.jpeg', 'Groupe 58.jpeg', 'Groupe 59.jpeg', 'Groupe 60.jpeg'],
    collection: 'drop1',
  },
  {
    id: '6', 
    key: 'choice', 
    label: 'CHOICE TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Groupe 61.jpeg', 'Groupe 62.jpeg', 'Groupe 63.jpeg', 'Groupe 64.jpeg'],
    collection: 'drop1',
  }
//  {
//    id: '7', 
//    key: 'advice', 
//    label: 'ADVICE TEE',
//    description: "",
//    types:  ['tshirt'],
//    colors: ['blue','pink','yellow','white'],
//    images: ['Groupe 65.jpeg', 'Groupe 66.jpeg', 'Groupe 67.jpeg', 'Groupe 68.jpeg'],
//    collection: 'drop1',
//  },
];

// ─── HELPERS ───────────────────────────────

/** First image of a design (grid card fallback) */
function coverImg(designKey) {
  const d = DESIGNS.find(x => x.key === designKey);
  return d && d.images.length ? d.images[0] : 'placeholder.png';
}

/**
 * Get product price
 * @param {string} designKey - Design slug (ex: 'ardere')
 * @param {string} typeId - Item type (always 'tshirt' for now)
 * @returns {number} Price in euros
 */
function getProductPrice(designKey, typeId) {
  const design = DESIGNS.find(d => d.key === designKey);
  const type = TYPES.find(t => t.id === typeId);
  
  if (!design || !type) return 0;
  
  return type.price[design.collection] || 0;
}

if (typeof module !== 'undefined') {
  module.exports = { COLLECTIONS, TYPES, COLORS, SIZES, DESIGNS, coverImg, getProductPrice };
}
