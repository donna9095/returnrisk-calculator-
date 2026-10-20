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
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '50d9ee480b',
    name: 'Tapyti Casual Short Sleeve Solid Women\'s Top',
    category: 'Clothing',
    price: 681.0,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '444dd89ad1',
    name: 'Norwood Striped Men\'s Polo Neck T-Shirt',
    category: 'Clothing',
    price: 349.0,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '102f3dfe56',
    name: 'Starsy Printed Women\'s Round Neck White T-Shirt',
    category: 'Clothing',
    price: 879.0,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '2011057a3f',
    name: 'maggie Women\'s Empire Waist Dress',
    category: 'Clothing',
    price: 999.0,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'ed7667446d',
    name: 'YK Regular Fit Boy\'s Jeans',
    category: 'Clothing',
    price: 839.0,
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=600&auto=format&fit=crop&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '0b722a089f',
    name: 'Zobello Casual Shoes',
    category: 'Footwear',
    price: 1599.0,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: '123bf9d6d7',
    name: 'Arden Terry Derby Boots',
    category: 'Footwear',
    price: 1644.0,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop&q=80',
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: 'a6568cd8d1',
    name: 'BrandTrendz Loafers',
    category: 'Footwear',
    price: 599.0,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80',
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: 'e648ef4d46',
    name: 'Asian Walking Shoes',
    category: 'Footwear',
    price: 499.0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: 'c369241fe7',
    name: 'Katalogue Women, Girls Flats',
    category: 'Footwear',
    price: 1750.0,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: '552c806010',
    name: 'Arden Walker Derby Corporate Casuals',
    category: 'Footwear',
    price: 1994.0,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop&q=80',
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: 'ccb6f176f8',
    name: 'Vatsalya Creation Traditional Alloy Jewel Set',
    category: 'Jewellery',
    price: 900.0,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: '9c92a6e15e',
    name: 'Imitzworld Alloy Necklace',
    category: 'Jewellery',
    price: 349.0,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: 'c5da4c1290',
    name: 'KUHUK Plastic Bangle Set',
    category: 'Jewellery',
    price: 350.0,
    image: 'https://images.unsplash.com/photo-1611591475878-1a742a0b41aa?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: 'bc03a54e3b',
    name: 'Fashion Pitaraa Stainless Steel Necklace',
    category: 'Jewellery',
    price: 378.0,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: '0af880b259',
    name: 'Junk Yamini Plastic Necklace',
    category: 'Jewellery',
    price: 300.0,
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: '19812af7ed',
    name: 'Shivam Plastic Chudas',
    category: 'Jewellery',
    price: 600.0,
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: '106428e790',
    name: 'Swiss Trend Artshai1630 Premium Analog Watch - For Men',
    category: 'Watches',
    price: 899.0,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: '6667ff68a0',
    name: 'Forex 5501LT01 Casual Analog Watch - For Men',
    category: 'Watches',
    price: 995.0,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: '6501a11f23',
    name: 'Playboy BPB-1002-C Analog Watch - For Women',
    category: 'Watches',
    price: 3310.0,
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: '192fa83406',
    name: 'Perucci PC-312 Analog Watch - For Men',
    category: 'Watches',
    price: 1395.0,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: '3f9ba9e0e2',
    name: 'Maxima 04608CMGY Gold Analog Watch - For Men',
    category: 'Watches',
    price: 675.0,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: 'e834d49a0e',
    name: 'HMT B0348 Analog Watch - For Women',
    category: 'Watches',
    price: 595.0,
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: '71677c4dff',
    name: 'Zwart GURNER 25 L Medium Laptop Backpack',
    category: 'Bags, Wallets & Belts',
    price: 492.0,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: 'dee64864c0',
    name: 'Angelfish Silk Potali Potli',
    category: 'Bags, Wallets & Belts',
    price: 399.0,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: '44696bb89a',
    name: 'MOOI-ZAK Girls, Women Blue PU Sling Bag',
    category: 'Bags, Wallets & Belts',
    price: 449.0,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: 'c7385d910b',
    name: 'Legato Rugsack Bag 2.5 L Backpack',
    category: 'Bags, Wallets & Belts',
    price: 989.0,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: 'a245bd5123',
    name: 'Ligans NY Women Beige PU Sling Bag',
    category: 'Bags, Wallets & Belts',
    price: 1295.0,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80',
    sizes: ['One Size'],
  },
  {
    id: '36da9c3c40',
    name: 'U United WILD FLOWER 14 L Backpack',
    category: 'Bags, Wallets & Belts',
    price: 615.0,
    image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=600&auto=format&fit=crop&q=80',
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
