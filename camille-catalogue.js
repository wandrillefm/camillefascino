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
    images: ['Groupe 41.jpg', 'Groupe 42.jpg', 'Groupe 43.jpg', 'Groupe 44.jpg'],
    collection: 'drop1',
  },
  {
    id: '2', 
    key: 'sorry', 
    label: 'SORRY TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Groupe 45.jpg', 'Groupe 46.jpg', 'Groupe 47.jpg', 'Groupe 48.jpg'],
    collection: 'drop1',
  },
  {
    id: '3', 
    key: 'kid', 
    label: 'KID TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Groupe 49.jpg', 'Groupe 50.jpg', 'Groupe 51.jpg', 'Groupe 52.jpg'],
    collection: 'drop1',
  },
  {
    id: '4', 
    key: 'life', 
    label: 'LIFE TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Groupe 53.jpg', 'Groupe 54.jpg', 'Groupe 55.jpg', 'Groupe 56.jpg'],
    collection: 'drop1',
  },
  {
    id: '5', 
    key: 'words', 
    label: 'WORDS TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Groupe 57.jpg', 'Groupe 58.jpg', 'Groupe 59.jpg', 'Groupe 60.jpg'],
    collection: 'drop1',
  },
  {
    id: '6', 
    key: 'choice', 
    label: 'CHOICE TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Groupe 61.jpg', 'Groupe 62.jpg', 'Groupe 63.jpg', 'Groupe 64.jpg'],
    collection: 'drop1',
  }
//  {
//    id: '7', 
//    key: 'advice', 
//    label: 'ADVICE TEE',
//    description: "",
//    types:  ['tshirt'],
//    colors: ['blue','pink','yellow','white'],
//    images: ['Groupe 65.jpg', 'Groupe 66.jpg', 'Groupe 67.jpg', 'Groupe 68.jpg'],
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
