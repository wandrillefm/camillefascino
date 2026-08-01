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
    images: ['351a8e9c1fe84aa2bce3cd9d492fd983.png', 'ec179cf81bbc42289c714ec412d7df7c.png'],
    collection: 'drop1',
  },
  {
    id: '2', 
    key: 'godersi', 
    label: 'Godersi',
    description: 'Enjoy your life while it\'s hot.<br>Back-print • Navy tee • €39',
    types:  ['tshirt'],
    colors: ['navy'],
    images: ['cb8d510654be44519cf5f8a048a0e2a3.png', 'ec179cf81bbc42289c714ec412d7df7c.png'],
    collection: 'drop1',
  },
  {
    id: '3', 
    key: 'persevera', 
    label: 'Persevera',
    description: "I'm not lucky, I just kept trying.<br>Back-print • Navy tee • €39",
    types:  ['tshirt'],
    colors: ['navy'],
    images: ['3e2bf36eaf3d47a8a8e878d653ed0d1f.png', 'ec179cf81bbc42289c714ec412d7df7c.png'],
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
