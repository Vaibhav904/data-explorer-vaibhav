/**
 * Deterministic generator for 15,000 realistic order records.
 * Uses a pseudo-random seeded algorithm (LCG) so results are repeatable,
 * realistic, and instantly generated in-memory.
 */

const FIRST_NAMES = [
  "Rahul", "Priya", "Amit", "Sneha", "Vikram", "Ananya", "Rohan", "Pooja",
  "Arjun", "Neha", "Karan", "Divya", "Suresh", "Kavita", "Aditya", "Ritu",
  "Manish", "Deepika", "Sanjay", "Meera", "Rajesh", "Simran", "Naveen", "Swati",
  "Vivek", "Tanvi", "Gaurav", "Sunita", "Harsh", "Shruti", "Mohit", "Aarti",
  "Nikhil", "Isha", "Abhishek", "Roshni", "Varun", "Pallavi", "Alok", "Shweta",
  "John", "Sarah", "Michael", "Emma", "David", "Sophia", "James", "Olivia"
];

const LAST_NAMES = [
  "Sharma", "Verma", "Patel", "Singh", "Kumar", "Gupta", "Reddy", "Mehta",
  "Nair", "Joshi", "Chopra", "Bose", "Iyer", "Malhotra", "Kapoor", "Saxena",
  "Mishra", "Deshmukh", "Choudhury", "Bhat", "Rao", "Pandey", "Agarwal", "Bansal",
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson"
];

const PRODUCTS_BY_CATEGORY = {
  Electronics: [
    { name: "MacBook Air M2", minPrice: 85000, maxPrice: 115000 },
    { name: "iPhone 15 Pro", minPrice: 120000, maxPrice: 145000 },
    { name: "Sony WH-1000XM5 Headphones", minPrice: 24999, maxPrice: 29999 },
    { name: "Dell XPS 13 Laptop", minPrice: 95000, maxPrice: 130000 },
    { name: "iPad Pro 11-inch", minPrice: 69900, maxPrice: 89900 },
    { name: "Samsung Galaxy S24 Ultra", minPrice: 110000, maxPrice: 135000 },
    { name: "Logitech MX Master 3S Mouse", minPrice: 7995, maxPrice: 9995 },
    { name: "LG 27-inch 4K Monitor", minPrice: 28000, maxPrice: 38000 },
    { name: "Kindle Paperwhite", minPrice: 12999, maxPrice: 14999 },
    { name: "Apple Watch Series 9", minPrice: 38900, maxPrice: 45900 }
  ],
  Clothing: [
    { name: "Levi's 511 Slim Jeans", minPrice: 2499, maxPrice: 3999 },
    { name: "Zara Linen Casual Shirt", minPrice: 1990, maxPrice: 3290 },
    { name: "Nike Dri-FIT Running Tee", minPrice: 1495, maxPrice: 2295 },
    { name: "H&M Wool Blend Overcoat", minPrice: 4999, maxPrice: 7999 },
    { name: "Adidas Trefoil Hoodie", minPrice: 3299, maxPrice: 4999 },
    { name: "Uniqlo Ultra Light Down Jacket", minPrice: 4990, maxPrice: 6990 },
    { name: "Puma Track Pants", minPrice: 1799, maxPrice: 2799 },
    { name: "Tommy Hilfiger Polo Shirt", minPrice: 3500, maxPrice: 5500 }
  ],
  Home: [
    { name: "Dyson V12 Cordless Vacuum", minPrice: 42900, maxPrice: 52900 },
    { name: "Philips Air Fryer XL", minPrice: 8999, maxPrice: 12999 },
    { name: "Nespresso Vertuo Pop Coffee Machine", minPrice: 14999, maxPrice: 18999 },
    { name: "IKEA Ergonomic Desk Chair", minPrice: 9990, maxPrice: 15990 },
    { name: "SleepyCat Memory Foam Mattress", minPrice: 11999, maxPrice: 19999 },
    { name: "Instant Pot Duo 7-in-1", minPrice: 7499, maxPrice: 9999 },
    { name: "Marshall Acton III Bluetooth Speaker", minPrice: 23999, maxPrice: 28999 },
    { name: "Tuft & Needle Linen Sheet Set", minPrice: 4500, maxPrice: 7500 }
  ],
  Books: [
    { name: "Atomic Habits - James Clear", minPrice: 450, maxPrice: 650 },
    { name: "Designing Data-Intensive Applications", minPrice: 1650, maxPrice: 2400 },
    { name: "The Psychology of Money - Morgan Housel", minPrice: 350, maxPrice: 500 },
    { name: "Clean Code - Robert C. Martin", minPrice: 1400, maxPrice: 1950 },
    { name: "Sapiens - Yuval Noah Harari", minPrice: 499, maxPrice: 799 },
    { name: "Deep Work - Cal Newport", minPrice: 399, maxPrice: 599 },
    { name: "Thinking, Fast and Slow", minPrice: 450, maxPrice: 690 },
    { name: "Steve Jobs - Walter Isaacson", minPrice: 599, maxPrice: 899 }
  ],
  Beauty: [
    { name: "Estee Lauder Advanced Night Repair", minPrice: 5900, maxPrice: 8200 },
    { name: "Clinique Moisture Surge 100H", minPrice: 2700, maxPrice: 3800 },
    { name: "The Ordinary Niacinamide 10%", minPrice: 600, maxPrice: 850 },
    { name: "Dyson Supersonic Hair Dryer", minPrice: 32900, maxPrice: 39900 },
    { name: "Kiehl's Ultra Facial Cream", minPrice: 2600, maxPrice: 3400 },
    { name: "Laneige Lip Sleeping Mask", minPrice: 1150, maxPrice: 1450 },
    { name: "Forest Essentials Soundarya Radiance Cream", minPrice: 3200, maxPrice: 4500 }
  ],
  Sports: [
    { name: "Yonex Astrox 88D Pro Badminton Racket", minPrice: 12500, maxPrice: 15500 },
    { name: "Nike Air Zoom Pegasus 40", minPrice: 8995, maxPrice: 11995 },
    { name: "Decathlon 20kg Dumbbell Set", minPrice: 3499, maxPrice: 4999 },
    { name: "Manduka PRO Yoga Mat", minPrice: 7200, maxPrice: 9500 },
    { name: "Garmin Forerunner 265 GPS Watch", minPrice: 42990, maxPrice: 48990 },
    { name: "Wilson US Open Tennis Racket", minPrice: 6500, maxPrice: 9500 },
    { name: "Fitbit Charge 6 Fitness Tracker", minPrice: 12999, maxPrice: 14999 }
  ]
};

const CATEGORIES = Object.keys(PRODUCTS_BY_CATEGORY);
const STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const PAYMENT_METHODS = ["UPI", "Credit Card", "Debit Card", "Net Banking", "Cash on Delivery"];

// Deterministic pseudo-random number generator (Mulberry32)
function createPrng(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateOrders(total = 15000) {
  const rand = createPrng(42); // fixed seed for determinism
  const ordersList = [];

  // Date range between 2025-01-01 and 2026-10-01 (~640 days)
  const startTimestamp = new Date("2025-01-01T00:00:00Z").getTime();
  const endTimestamp = new Date("2026-10-01T00:00:00Z").getTime();
  const timeSpan = endTimestamp - startTimestamp;

  for (let i = 1; i <= total; i++) {
    const firstName = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
    const customerName = `${firstName} ${lastName}`;
    
    // Deterministic email
    const emailSanitized = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(rand() * 90 + 10)}@example.com`;

    const category = CATEGORIES[Math.floor(rand() * CATEGORIES.length)];
    const productPool = PRODUCTS_BY_CATEGORY[category];
    const productObj = productPool[Math.floor(rand() * productPool.length)];

    const status = STATUSES[Math.floor(rand() * STATUSES.length)];
    const paymentMethod = PAYMENT_METHODS[Math.floor(rand() * PAYMENT_METHODS.length)];

    // Realistic amount within product price bracket rounded to whole number
    const amount = Math.floor(
      productObj.minPrice + rand() * (productObj.maxPrice - productObj.minPrice)
    );

    // Random date within timespan
    const orderTimestamp = startTimestamp + rand() * timeSpan;
    const orderDate = new Date(orderTimestamp).toISOString().split("T")[0];

    const orderNumber = `ORD-${String(100000 + i)}`;

    ordersList.push({
      id: i,
      orderNumber,
      customerName,
      customerEmail: emailSanitized,
      productName: productObj.name,
      category,
      status,
      amount,
      orderDate,
      paymentMethod
    });
  }

  return ordersList;
}

// Generate the 15,000 orders
export const orders = generateOrders(15000);

export default orders;
