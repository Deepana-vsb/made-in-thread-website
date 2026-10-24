/**
 * =====================================================================
 * MADE IN THREAD — PRODUCT CATALOGUE
 * =====================================================================
 * 
 * BEGINNER GUIDE FOR UPDATING PRODUCTS:
 * 
 * 1. HOW TO CHANGE A PRICE:
 *    Find the product below and edit the "price" number.
 *    Example: change `price: 1499` to `price: 1850`.
 * 
 * 2. HOW TO ADD A NEW PRODUCT:
 *    - Save your image inside the `public/products/` folder (e.g. `public/products/yellow-saree.jpeg`).
 *    - Copy one of the product blocks below, paste it at the bottom of the list,
 *      give it a unique `id` (e.g. 15), and set `image: "/products/yellow-saree.jpeg"`.
 * 
 * 3. HOW TO REMOVE A PRODUCT:
 *    Delete or comment out its block from the `products` list.
 * 
 * 4. NOTE ON CURRENT PRICES:
 *    Prices currently listed are editable placeholders (₹1,499).
 *    Once you have decided your actual selling prices, simply update the numbers here!
 */

export interface Product {
  id: number;
  name: string;
  category: "Chettinad Sarees" | "Festive Weaves" | "Pastels & Neutrals";
  price: number; // Placeholder price in INR (e.g. 1499)
  isPricePlaceholder?: boolean;
  image: string;
  description: string;
  fabric: string;
  inStock: boolean;
  tag?: string;
}

export const categories = [
  "All",
  "Chettinad Sarees",
  "Festive Weaves",
  "Pastels & Neutrals",
] as const;

export type Category = (typeof categories)[number];

export const products: Product[] = [
  {
    id: 1,
    name: "Teal Chettinad Cotton Saree",
    category: "Chettinad Sarees",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    tag: "BESTSELLER",
    image: "/products/chettinadsaree.jpeg",
    description: "Deep peacock teal drape with traditional temple borders and breathable handloom cotton weave.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 2,
    name: "Rose Pink Chettinad Saree",
    category: "Chettinad Sarees",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    tag: "POPULAR",
    image: "/products/pink-saree.jpeg",
    description: "Graceful rose pink cotton saree with finely woven contrast pallu, light and comfortable for all-day wear.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 3,
    name: "Coffee Brown Chettinad Saree",
    category: "Chettinad Sarees",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    tag: "CLASSIC",
    image: "/products/brown-saree.jpeg",
    description: "Rich earthy coffee brown body paired with warm traditional motifs, suited for festive gatherings.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 4,
    name: "Crimson Red Chettinad Saree",
    category: "Festive Weaves",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    tag: "FESTIVE",
    image: "/products/red-saree.jpeg",
    description: "Auspicious vermilion red cotton drape with classic South Indian temple border accents.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 5,
    name: "Bottle Green Chettinad Saree",
    category: "Chettinad Sarees",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    tag: "HERITAGE",
    image: "/products/green-saree.jpeg",
    description: "Regal forest bottle green shade featuring crisp handwoven textures and enduring elegance.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 6,
    name: "Mustard Gold Chettinad Saree",
    category: "Festive Weaves",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    tag: "NEW",
    image: "/products/mustard-saree.jpeg",
    description: "Warm haldi mustard cotton weave with artisanal border detailing, ideal for daytime celebrations.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 7,
    name: "Plum Wine Chettinad Saree",
    category: "Festive Weaves",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    tag: "EXCLUSIVE",
    image: "/products/wine-saree.jpeg",
    description: "Opulent plum wine handloom drape that brings a graceful blend of tradition and modern charm.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 8,
    name: "Olive Green Chettinad Saree",
    category: "Pastels & Neutrals",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    image: "/products/olive-saree.jpeg",
    description: "Subtle earthy olive tone designed for relaxed, understated style with breathable cotton comfort.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 9,
    name: "Berry Magenta Chettinad Saree",
    category: "Festive Weaves",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    tag: "TRENDING",
    image: "/products/magenta-saree.jpeg",
    description: "Striking berry magenta body with intricate contrast borders that stand out effortlessly.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 10,
    name: "Tussar Cream Chettinad Saree",
    category: "Pastels & Neutrals",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    tag: "ELEGANT",
    image: "/products/cream-saree.jpeg",
    description: "Serene natural cream base complemented by timeless border stripes and refined handloom finish.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 11,
    name: "Rust Orange Chettinad Saree",
    category: "Festive Weaves",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    image: "/products/rust-saree.jpeg",
    description: "Warm terracotta rust cotton weave with authentic Chettinad border patterns and soft drape.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 12,
    name: "Coral Red Chettinad Saree",
    category: "Festive Weaves",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    image: "/products/coral-saree.jpeg",
    description: "Radiant coral red saree crafted with fine count cotton yarn for featherlight comfort.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 13,
    name: "Cocoa Mauve Chettinad Saree",
    category: "Pastels & Neutrals",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    image: "/products/mauve-saree.jpeg",
    description: "Sophisticated cocoa mauve shade that effortlessly balances contemporary minimalism and heritage.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
  {
    id: 14,
    name: "Peach Blush Chettinad Saree",
    category: "Pastels & Neutrals",
    price: 1499, // EDITABLE PLACEHOLDER — Update with your actual selling price
    isPricePlaceholder: true,
    tag: "PASTEL",
    image: "/products/peach-saree.jpeg",
    description: "Soft peach blush tone with delicate pallu accents, creating an airy and luminous everyday drape.",
    fabric: "100% Pure Chettinad Cotton",
    inStock: true,
  },
];
