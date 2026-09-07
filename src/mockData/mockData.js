// mockData.js
// -----------------------------------------------------------------------------
// Single source of data for ReturnLess. Every export here is shaped the way
// the real Flask API is expected to respond, so swapping this file out for
// real fetch() calls later should require touching only the functions below
// (not the components that consume them).
//
// `products` below is real product data (name, category, price, image),
// cleaned from the Flipkart e-commerce sample dataset:
//   - parsed the nested category-tree column down to a top-level category
//   - extracted the first working image URL out of each product's image list
//   - dropped rows with a missing name, category, image, or price, and rows
//     where the discounted price exceeded the retail price
//   - deduplicated on product id and on (name, category)
//   - filtered to five fashion-relevant categories and a ₹200–₹6,000 price
//     band so the catalog fits a shopper demo, and upgraded image URLs to
//     https to avoid mixed-content warnings
//   - prices are in Indian Rupees (₹), matching the source dataset
// See flipkart_cleaned.csv for the full cleaned dataset (12,677 rows) this
// catalog was sampled from. Everything past `products` (risk scores, seller
// stats, activity log) is still illustrative mock data, not derived from the
// CSV, since the source dataset has no return/order history in it.
//
// Example future swap:
//   export const getProducts = () => fetch('/api/products').then(r => r.json());
//   export const checkReturnRisk = (payload) =>
//     fetch('/predict', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     }).then(r => r.json());
// -----------------------------------------------------------------------------

export const products = [
  {
    id: 'acc973250a',
    name: 'Okane Solid Men\'s Polo Neck T-Shirt',
    category: 'Clothing',
    price: 699.0,
    image: 'https://img5a.flixcart.com/image/t-shirt/3/z/v/ot-9162-d-khaki-okane-xxl-original-imae8hfeerhvdk2a.jpeg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '50d9ee480b',
    name: 'Tapyti Casual Short Sleeve Solid Women\'s Top',
    category: 'Clothing',
    price: 681.0,
    image: 'https://img6a.flixcart.com/image/top/x/h/x/1-1-tap-lt-1065-tapyti-l-original-imaeyvue2hrw6urs.jpeg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '444dd89ad1',
    name: 'Norwood Striped Men\'s Polo Neck T-Shirt',
    category: 'Clothing',
    price: 349.0,
    image: 'https://img5a.flixcart.com/image/t-shirt/m/k/u/nwmultilb-norwood-xl-original-imae5pjhqeuyykhz.jpeg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '102f3dfe56',
    name: 'Starsy Printed Women\'s Round Neck White T-Shirt',
    category: 'Clothing',
    price: 879.0,
    image: 'https://img5a.flixcart.com/image/t-shirt/a/a/9/ts0143white-starsy-xxl-1000x1000-imaegf432hen7c66.jpeg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '2011057a3f',
    name: 'maggie Women\'s Empire Waist Dress',
    category: 'Clothing',
    price: 999.0,
    image: 'https://img6a.flixcart.com/image/dress/h/h/k/1-1-mg211-maggie-36-original-imaechwvhd9vqzdf.jpeg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'ed7667446d',
    name: 'YK Regular Fit Boy\'s Jeans',
    category: 'Clothing',
    price: 839.0,
    image: 'https://img6a.flixcart.com/image/jean/8/z/x/1098764-yk-4-5-years-original-imaegwsqvjhnhzex.jpeg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '0b722a089f',
    name: 'Zobello Casual Shoes',
    category: 'Footwear',
    price: 1599.0,
    image: 'https://img6a.flixcart.com/image/shoe/y/e/z/black-mesh-91028a-zobello-11-original-imaeefgsvadqzqk3.jpeg',
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: '123bf9d6d7',
    name: 'Arden Terry Derby Boots',
    category: 'Footwear',
    price: 1644.0,
    image: 'https://img5a.flixcart.com/image/shoe/2/2/v/brown-198856-bd3-arden-42-1000x1000-imaecabuyx3fgbqr.jpeg',
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: 'a6568cd8d1',
    name: 'BrandTrendz Loafers',
    category: 'Footwear',
    price: 599.0,
    image: 'https://img5a.flixcart.com/image/shoe/f/x/z/blue-t-s538bl-brandtrendz-10-original-imaeg32cntcxzfsv.jpeg',
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: 'e648ef4d46',
    name: 'Asian Walking Shoes',
    category: 'Footwear',
    price: 499.0,
    image: 'https://img5a.flixcart.com/image/shoe/p/8/w/white-expo-asian-38-original-imaehgmwhxfgd4se.jpeg',
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: 'c369241fe7',
    name: 'Katalogue Women, Girls Flats',
    category: 'Footwear',
    price: 1750.0,
    image: 'https://img5a.flixcart.com/image/sandal/h/r/z/brown47-katalogue42-katalogue-38-original-imaehzhyn3xsfj9h.jpeg',
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: '552c806010',
    name: 'Arden Walker Derby Corporate Casuals',
    category: 'Footwear',
    price: 1994.0,
    image: 'https://img6a.flixcart.com/image/shoe/j/k/d/brown-198898-b-arden-42-original-imadysh4uwyfun8k.jpeg',
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: 'ccb6f176f8',
    name: 'Vatsalya Creation Traditional Alloy Jewel Set',
    category: 'Jewellery',
    price: 900.0,
    image: 'https://img5a.flixcart.com/image/jewellery-set/f/s/k/4003-rw-vatsalya-creation-original-imae7pzbx6d9wevz.jpeg',
    sizes: ['One Size'],
  },
  {
    id: '9c92a6e15e',
    name: 'Imitzworld Alloy Necklace',
    category: 'Jewellery',
    price: 349.0,
    image: 'https://img5a.flixcart.com/image/necklace-chain/m/s/e/105imwns-imitzworld-necklace-original-imaebud9nzwefmgz.jpeg',
    sizes: ['One Size'],
  },
  {
    id: 'c5da4c1290',
    name: 'KUHUK Plastic Bangle Set',
    category: 'Jewellery',
    price: 350.0,
    image: 'https://img6a.flixcart.com/image/bangle-bracelet-armlet/a/t/9/tbc244-2-6-kuhuk-9-1100x1100-imae8yzznxwuzfsg.jpeg',
    sizes: ['One Size'],
  },
  {
    id: 'bc03a54e3b',
    name: 'Fashion Pitaraa Stainless Steel Necklace',
    category: 'Jewellery',
    price: 378.0,
    image: 'https://img5a.flixcart.com/image/necklace-chain/4/q/g/fpfs152280-fashion-pitaraa-necklace-original-imaecnh3qatygkfp.jpeg',
    sizes: ['One Size'],
  },
  {
    id: '0af880b259',
    name: 'Junk Yamini Plastic Necklace',
    category: 'Jewellery',
    price: 300.0,
    image: 'https://img6a.flixcart.com/image/necklace-chain/x/x/s/mod-n1052-junk-necklace-1100x1100-imaecf8ggrzmwzjp.jpeg',
    sizes: ['One Size'],
  },
  {
    id: '19812af7ed',
    name: 'Shivam Plastic Chudas',
    category: 'Jewellery',
    price: 600.0,
    image: 'https://img6a.flixcart.com/image/bangle-bracelet-armlet/h/3/k/kuhul653-2-6-shivam-74-1100x1100-imaee8yaz3skawbr.jpeg',
    sizes: ['One Size'],
  },
  {
    id: '106428e790',
    name: 'Swiss Trend Artshai1630 Premium Analog Watch - For Men',
    category: 'Watches',
    price: 899.0,
    image: 'https://img6a.flixcart.com/image/watch/y/v/g/artshai1630-swiss-trend-original-imae9ywmhpfx35aj.jpeg',
    sizes: ['One Size'],
  },
  {
    id: '6667ff68a0',
    name: 'Forex 5501LT01 Casual Analog Watch - For Men',
    category: 'Watches',
    price: 995.0,
    image: 'https://img6a.flixcart.com/image/watch/7/w/m/5501lt01-forex-original-imae7ez9aac2urfx.jpeg',
    sizes: ['One Size'],
  },
  {
    id: '6501a11f23',
    name: 'Playboy BPB-1002-C Analog Watch - For Women',
    category: 'Watches',
    price: 3310.0,
    image: 'https://img5a.flixcart.com/image/watch/h/b/u/bpb-1002-c-playboy-original-imadppjqqzy7vgv5.jpeg',
    sizes: ['One Size'],
  },
  {
    id: '192fa83406',
    name: 'Perucci PC-312 Analog Watch - For Men',
    category: 'Watches',
    price: 1395.0,
    image: 'https://img6a.flixcart.com/image/watch/y/g/j/pc-312-perucci-original-imae3ff3ubcfvqg5.jpeg',
    sizes: ['One Size'],
  },
  {
    id: '3f9ba9e0e2',
    name: 'Maxima 04608CMGY Gold Analog Watch - For Men',
    category: 'Watches',
    price: 675.0,
    image: 'https://img5a.flixcart.com/image/watch/b/w/d/04608cmgy-maxima-original-imadzch7kg7tyadf.jpeg',
    sizes: ['One Size'],
  },
  {
    id: 'e834d49a0e',
    name: 'HMT B0348 Analog Watch - For Women',
    category: 'Watches',
    price: 595.0,
    image: 'https://img5a.flixcart.com/image/watch/e/t/e/b0348-hmt-1100x1360-imadzryxyhwvk7zu.jpeg',
    sizes: ['One Size'],
  },
  {
    id: '71677c4dff',
    name: 'Zwart GURNER 25 L Medium Laptop Backpack',
    category: 'Bags, Wallets & Belts',
    price: 492.0,
    image: 'https://img6a.flixcart.com/image/backpack/s/n/g/gurner-zwart-laptop-backpack-gurner-b-original-imaeajyby4kf5dh3.jpeg',
    sizes: ['One Size'],
  },
  {
    id: 'dee64864c0',
    name: 'Angelfish Silk Potali Potli',
    category: 'Bags, Wallets & Belts',
    price: 399.0,
    image: 'https://img6a.flixcart.com/image/pouch-potli/u/x/v/aelkabj01224-a-angelfish-potli-silk-potali-original-imaeeprygdj223es.jpeg',
    sizes: ['One Size'],
  },
  {
    id: '44696bb89a',
    name: 'MOOI-ZAK Girls, Women Blue PU Sling Bag',
    category: 'Bags, Wallets & Belts',
    price: 449.0,
    image: 'https://img6a.flixcart.com/image/sling-bag/y/r/r/ctwrk-sr1-mooi-zak-sling-bag-trendy-stylish-blue-sling-bag-ctwrk-1000x1000-imaejnvgzgryerdg.jpeg',
    sizes: ['One Size'],
  },
  {
    id: 'c7385d910b',
    name: 'Legato Rugsack Bag 2.5 L Backpack',
    category: 'Bags, Wallets & Belts',
    price: 989.0,
    image: 'https://img5a.flixcart.com/image/backpack/g/f/2/rs0400012prn-new-legato-backpack-rugsack-bag-original-imaeguzuhgvxwmxn.jpeg',
    sizes: ['One Size'],
  },
  {
    id: 'a245bd5123',
    name: 'Ligans NY Women Beige PU Sling Bag',
    category: 'Bags, Wallets & Belts',
    price: 1295.0,
    image: 'https://img5a.flixcart.com/image/sling-bag/n/k/t/lny-lb-mo-7147-ligans-ny-sling-bag-easton-mo-original-imae3vx6zvhgughx.jpeg',
    sizes: ['One Size'],
  },
  {
    id: '36da9c3c40',
    name: 'U United WILD FLOWER 14 L Backpack',
    category: 'Bags, Wallets & Belts',
    price: 615.0,
    image: 'https://img6a.flixcart.com/image/backpack/n/b/m/wldflwr01-u-united-backpack-wild-flower-original-imaegurvzkpvazg3.jpeg',
    sizes: ['One Size'],
  },
];

// Shopper's own return-behavior score, shown as a badge on their dashboard.
export const shopperScore = {
  score: 782,
  tier: 'Trusted Shopper',
  maxScore: 1000,
  returnsLast90Days: 1,
  ordersLast90Days: 9,
};

// Returns a deterministic-ish "risk report" for a given product + size so the
// UI has something believable to render. A real backend would run a model
// against the shopper's history, the product, and the chosen size.
export function checkReturnRisk(productId, size) {
  const product = products.find((p) => p.id === productId);

  // Simple hash so the same product/size combo always looks the same in a demo.
  const seed = (productId + size).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const riskPercent = 20 + (seed % 65); // 20-84%

  const reasons =
    riskPercent > 60
      ? [
          { reason: 'Size fit', value: 48 },
          { reason: 'Review sentiment', value: 32 },
          { reason: 'Color accuracy', value: 20 },
        ]
      : [
          { reason: 'Size fit', value: 45 },
          { reason: 'Review sentiment', value: 30 },
          { reason: 'Color accuracy', value: 25 },
        ];

  const explanation =
    riskPercent > 60
      ? `Shoppers who bought "${product?.name}" in size ${size} returned it more often than average, mostly citing sizing and fit. Consider checking the size guide before you buy.`
      : `"${product?.name}" in size ${size} has a solid fit history among similar shoppers. Reviews and color accuracy line up well with expectations.`;

  return {
    productId,
    size,
    riskPercent,
    riskLabel: riskPercent > 60 ? 'High' : riskPercent > 35 ? 'Moderate' : 'Low',
    explanation,
    reasonBreakdown: reasons,
  };
}

// ---------------------------------------------------------------------------
// Seller dashboard data
// ---------------------------------------------------------------------------

export const sellerStats = {
  totalOrders: 4821,
  returnRate: 12.4, // percent
  highRiskOrdersToday: 37,
};

export const returnsByCategory = [
  { category: 'Clothing', returns: 164 },
  { category: 'Footwear', returns: 121 },
  { category: 'Jewellery', returns: 58 },
  { category: 'Watches', returns: 34 },
  { category: 'Bags, Wallets & Belts', returns: 22 },
];

export const returnReasonsBreakdown = [
  { name: 'Size / fit', value: 41 },
  { name: 'Changed mind', value: 24 },
  { name: 'Damaged / defective', value: 15 },
  { name: 'Not as described', value: 12 },
  { name: 'Late delivery', value: 8 },
];

export const highRiskOrders = [
  { orderId: 'ORD-10234', product: "Okane Solid Men's Polo Neck T-Shirt", size: 'L', shopper: 'j.marlowe@mail.com', riskPercent: 78, date: '2026-09-04', category: 'Clothing' },
  { orderId: 'ORD-10241', product: 'Arden Terry Derby Boots', size: '9', shopper: 'k.ito@mail.com', riskPercent: 71, date: '2026-09-04', category: 'Footwear' },
  { orderId: 'ORD-10255', product: "maggie Women's Empire Waist Dress", size: 'M', shopper: 'a.diaz@mail.com', riskPercent: 69, date: '2026-09-05', category: 'Clothing' },
  { orderId: 'ORD-10260', product: 'Katalogue Women, Girls Flats', size: '7', shopper: 'r.chen@mail.com', riskPercent: 66, date: '2026-09-05', category: 'Footwear' },
  { orderId: 'ORD-10266', product: 'Playboy BPB-1002-C Analog Watch - For Women', size: 'One Size', shopper: 'p.nkosi@mail.com', riskPercent: 64, date: '2026-09-06', category: 'Watches' },
  { orderId: 'ORD-10271', product: 'Ligans NY Women Beige PU Sling Bag', size: 'One Size', shopper: 's.novak@mail.com', riskPercent: 61, date: '2026-09-06', category: 'Bags, Wallets & Belts' },
];

export const categoryOptions = [
  'All Categories',
  'Clothing',
  'Footwear',
  'Jewellery',
  'Watches',
  'Bags, Wallets & Belts',
];

// ---------------------------------------------------------------------------
// Admin dashboard data
// ---------------------------------------------------------------------------

export const adminStats = {
  totalSellers: 214,
  totalShoppers: 58230,
  platformReturnRate: 11.8,
  modelAccuracy: 87.3,
  modelLastTrained: '2026-08-29',
};

export const activityLog = [
  { id: 1, timestamp: '2026-09-06 09:12', actor: 'system', action: 'Nightly risk scores recalculated', detail: '58,230 shoppers scored' },
  { id: 2, timestamp: '2026-09-06 08:47', actor: 'seller: nova-outfitters', action: 'Updated product catalog', detail: '12 items added' },
  { id: 3, timestamp: '2026-09-05 22:03', actor: 'admin: t.reyes', action: 'Adjusted risk threshold', detail: 'High-risk cutoff set to 60%' },
  { id: 4, timestamp: '2026-09-05 17:30', actor: 'system', action: 'Model evaluation run', detail: 'Accuracy 87.3% on holdout set' },
  { id: 5, timestamp: '2026-09-05 14:15', actor: 'seller: harborline', action: 'Exported returns report', detail: 'Q3 return summary (CSV)' },
  { id: 6, timestamp: '2026-09-04 11:02', actor: 'admin: t.reyes', action: 'Suspended seller account', detail: 'seller: quickthreads (policy review)' },
];
