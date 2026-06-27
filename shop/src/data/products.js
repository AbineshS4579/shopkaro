export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'apparel', label: 'Apparel' },
  { id: 'home', label: 'Home & Living' },
  { id: 'sports', label: 'Sports' },
];

export const products = [
  {
    id: 1, category: 'electronics',
    name: 'Arc Wireless Headphones',
    price: 289, originalPrice: 349,
    rating: 4.8, reviews: 1240,
    badge: 'Best Seller',
    description: '40-hour battery, adaptive noise cancellation, premium audio drivers engineered for clarity.',
    specs: ['40hr Battery', 'ANC', 'USB-C', 'Foldable'],
    color: '#1a1a2e',
    emoji: '🎧',
  },
  {
    id: 2, category: 'electronics',
    name: 'Lumina Smart Watch',
    price: 199, originalPrice: 249,
    rating: 4.6, reviews: 876,
    badge: 'New',
    description: 'Always-on AMOLED display, health monitoring suite, 7-day battery life.',
    specs: ['AMOLED', 'GPS', '7-Day Battery', 'Water Resistant'],
    color: '#0f3460',
    emoji: '⌚',
  },
  {
    id: 3, category: 'electronics',
    name: 'Quantum Earbuds Pro',
    price: 149, originalPrice: 179,
    rating: 4.7, reviews: 2105,
    badge: 'Sale',
    description: 'Spatial audio, 8mm drivers, ergonomic fit for all-day comfort.',
    specs: ['Spatial Audio', '8hr Playtime', 'IPX5', 'Fast Charge'],
    color: '#16213e',
    emoji: '🎵',
  },
  {
    id: 4, category: 'apparel',
    name: 'Meridian Zip Hoodie',
    price: 89, originalPrice: 120,
    rating: 4.5, reviews: 534,
    badge: 'Sale',
    description: 'Japanese cotton blend, structured hood, ribbed cuffs. Built to wear for years.',
    specs: ['100% Cotton Blend', 'Machine Wash', 'Unisex Fit', 'Sizes XS–3XL'],
    color: '#2c3e50',
    emoji: '🧥',
  },
  {
    id: 5, category: 'apparel',
    name: 'Core Performance Tee',
    price: 45, originalPrice: 55,
    rating: 4.4, reviews: 892,
    badge: null,
    description: 'Moisture-wicking, four-way stretch. Engineered for movement.',
    specs: ['Quick Dry', '4-Way Stretch', 'UV Protection', 'Anti-Odor'],
    color: '#34495e',
    emoji: '👕',
  },
  {
    id: 6, category: 'home',
    name: 'Halo Desk Lamp',
    price: 129, originalPrice: 159,
    rating: 4.9, reviews: 445,
    badge: 'Top Rated',
    description: 'Circadian-aware lighting, USB-A & USB-C ports built in, touch dimmer.',
    specs: ['3 Color Temps', 'USB Charging', 'Touch Dimmer', 'Energy Star'],
    color: '#b8860b',
    emoji: '💡',
  },
  {
    id: 7, category: 'home',
    name: 'Timber Pour-Over Set',
    price: 75, originalPrice: 90,
    rating: 4.7, reviews: 328,
    badge: null,
    description: 'Acacia handle carafe with borosilicate glass. For the ritual coffee drinker.',
    specs: ['600ml Capacity', 'Borosilicate', 'Heat Resistant', 'Gift Box'],
    color: '#8B4513',
    emoji: '☕',
  },
  {
    id: 8, category: 'sports',
    name: 'Apex Running Shoes',
    price: 159, originalPrice: 199,
    rating: 4.6, reviews: 1567,
    badge: 'Best Seller',
    description: 'Carbon fiber plate, responsive foam stack, engineered mesh upper.',
    specs: ['Carbon Plate', 'EU 36–48', 'Zero Drop', '220g'],
    color: '#1a472a',
    emoji: '👟',
  },
  {
    id: 9, category: 'sports',
    name: 'FlexGrip Yoga Mat',
    price: 65, originalPrice: 80,
    rating: 4.5, reviews: 723,
    badge: 'New',
    description: '6mm natural rubber, alignment lines, antimicrobial coating.',
    specs: ['6mm Thick', 'Natural Rubber', '183cm × 61cm', 'Carry Strap'],
    color: '#4a235a',
    emoji: '🧘',
  },
];

export const getSortedProducts = (products, sort) => {
  const copy = [...products];
  if (sort === 'price-asc') return copy.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') return copy.sort((a, b) => b.price - a.price);
  if (sort === 'rating') return copy.sort((a, b) => b.rating - a.rating);
  if (sort === 'reviews') return copy.sort((a, b) => b.reviews - a.reviews);
  return copy;
};
