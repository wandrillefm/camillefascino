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
  { id: 'navy', label: 'Navy', code: '1' }
];

const SIZES = ['S', 'M', 'L', 'XL'];

// ─── DESIGNS ───────────────────────────────
// Camille Fascino — 3 pieces, same philosophy

const DESIGNS = [
  {
    id: '1', 
    key: 'ardere', 
    label: 'Ardere',
    description: 'Just do your best and trust God.<br>Back-print • Navy tee • €39',
    types:  ['tshirt'],
    colors: ['navy'],
    images: ['sailboat.jpg', 'sailboat-lifestyle.jpg'],
    collection: 'drop1',
  },
  {
    id: '2', 
    key: 'enjoy-life', 
    label: 'Enjoy Life',
    description: 'Enjoy your life while it\'s hot.<br>Back-print • Navy tee • €39',
    types:  ['tshirt'],
    colors: ['navy'],
    images: ['cat.jpg', 'cat-lifestyle.jpg'],
    collection: 'drop1',
  },
  {
    id: '3', 
    key: 'persevere', 
    label: 'Persevere',
    description: "I'm not lucky, I just kept trying.<br>Back-print • Navy tee • €39",
    types:  ['tshirt'],
    colors: ['navy'],
    images: ['athlete.jpg', 'athlete-lifestyle.jpg'],
    collection: 'drop1',
  }
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
