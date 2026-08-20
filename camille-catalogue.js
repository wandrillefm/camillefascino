// ─────────────────────────────────────────────
//   CATALOGUE CAMILLE FASCINO
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
  { id: 'blue', label: 'blue', code: '1', hex: '#B4D4ED' },
  { id: 'pink', label: 'pink', code: '2', hex: '#FFDAD2' },
  { id: 'yellow', label: 'yellow', code: '3', hex: '#FDF1BD' },
  { id: 'white', label: 'white', code: '4', hex: '#F5F4F2' }
];

const SIZES = ['S', 'M', 'L', 'XL'];

// ─── DESIGNS ───────────────────────────────

const DESIGNS = [
  {
    id: '1', 
    key: 'love', 
    label: 'LOVE TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Group 41.jpg', 'Group 42.jpg', 'Group 43.jpg', 'Group 44.jpg'],
    collection: 'drop1',
  },
  {
    id: '2', 
    key: 'sorry', 
    label: 'SORRY TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Group 45.jpg', 'Group 46.jpg', 'Group 47.jpg', 'Group 48.jpg'],
    collection: 'drop1',
  },
  {
    id: '3', 
    key: 'kid', 
    label: 'KID TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Group 49.jpg', 'Group 50.jpg', 'Group 51.jpg', 'Group 52.jpg'],
    collection: 'drop1',
  },
  {
    id: '4', 
    key: 'life', 
    label: 'LIFE TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Group 53.jpg', 'Group 54.jpg', 'Group 55.jpg', 'Group 56.jpg'],
    collection: 'drop1',
  },
  {
    id: '5', 
    key: 'words', 
    label: 'WORDS TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Group 57.jpg', 'Group 58.jpg', 'Group 59.jpg', 'Group 60.jpg'],
    collection: 'drop1',
  },
  {
    id: '6', 
    key: 'choice', 
    label: 'CHOICE TEE',
    description: "",
    types:  ['tshirt'],
    colors: ['blue','pink','yellow','white'],
    images: ['Group 61.jpg', 'Group 62.jpg', 'Group 63.jpg', 'Group 64.jpg'],
    collection: 'drop1',
  }
];

// ─── HELPERS ───────────────────────────────

/** First image of a design */
function coverImg(designKey) {
  const d = DESIGNS.find(x => x.key === designKey);
  return d && d.images.length ? d.images[0] : 'placeholder.png';
}

/** Get product price */
function getProductPrice(designKey, typeId) {
  const design = DESIGNS.find(d => d.key === designKey);
  const type = TYPES.find(t => t.id === typeId);
  if (!design || !type) return 0;
  return type.price[design.collection] || 0;
}

/** Get color hex or label from color ID */
function getColorHex(colorId) {
  const c = COLORS.find(x => x.id === colorId);
  return c ? c.hex : colorId;
}

function getColorLabel(colorId) {
  const c = COLORS.find(x => x.id === colorId);
  return c ? c.label : colorId;
}

if (typeof module !== 'undefined') {
  module.exports = { COLLECTIONS, TYPES, COLORS, SIZES, DESIGNS, coverImg, getProductPrice, getColorHex, getColorLabel };
}
