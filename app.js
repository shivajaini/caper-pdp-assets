/* ============================================================
   Store Search + Product Detail (tablet) prototype
   Real Figma assets live in ./assets/
   ============================================================ */

/* ---------- Icons ---------- */
const pinSVG = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>`;
const mapIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>`;
const cartIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.4a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L22 7H6"/></svg>`;
const bulbIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-4 12.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3A7 7 0 0 0 12 2zm-2 19a2 2 0 0 0 4 0h-4z"/></svg>`;
const scissorsIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8 8l12 8M8 16L20 8"/></svg>`;
const expandIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>`;
const chevron = `<svg class="acc-chevron" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;

const IMG = {
  product: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ecdb7b10-9d71-47cc-8d8d-06ae92a4f24b.jpg",
  map: "https://raw.githubusercontent.com/shivajaini/caper-pdp-assets/main/storemap-v5.png",
  aisle: "https://raw.githubusercontent.com/shivajaini/caper-pdp-assets/main/aisle-v2.png",
  shelf: "https://raw.githubusercontent.com/shivajaini/caper-pdp-assets/main/shelf.png",
};

/* ---------- Data-availability flags (driven by the control panel) ----------
   Toggling these simulates products whose backend data is incomplete, so we
   can preview how the PDP + search cards degrade when fields are missing. */
// Catalog gives thumb_ URLs (small). For the large PDP media stage, swap in the
// sharper large_ variant; cards/thumbnails keep the lightweight thumb_.
const heroSrc = (u) => (u || "").replace("/thumb_", "/large_");

const FLAGS = {
  location: true, // aisle/shelf labels + "Light up in aisle" + loc pills
  map: true,      // store-map view & thumbnail
  imagery: true,  // aisle & shelf in-store photo views + thumbnails
  autonav: true,  // distance-based auto handoff map -> aisle -> shelf
  reviews: true,  // ratings & reviews row
  sale: true,     // was-price / discount pricing
  coupon: true,   // Caper exclusive offer + clip offer
  recs: true,     // recommendation sections
};
const FLAG_CONFIG = [
  { key: "location", label: "Location info", desc: "Aisle & shelf labels" },
  { key: "map", label: "Store map", desc: "Map view & thumbnail" },
  { key: "imagery", label: "Aisle & shelf imagery", desc: "In-store photo views" },
  { key: "autonav", label: "Auto view switching", desc: "Switch to aisle/shelf by distance" },
  { key: "reviews", label: "Ratings & reviews", desc: "Star rating row" },
  { key: "sale", label: "Sale pricing", desc: "Was price & discount" },
  { key: "coupon", label: "Coupons & offers", desc: "Exclusive offer card" },
  { key: "recs", label: "Recommendations", desc: "“Bought with” sections" },
];

/* list-add icon used inside the green circular button on recommendation cards */
const listAddIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h11M4 12h7M4 17h7"/><path d="M17 14v6M14 17h6"/></svg>`;
/* small pin used inside the dark aisle marker */
const markerIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a6 6 0 0 0-6 6c0 4.2 6 12 6 12s6-7.8 6-12a6 6 0 0 0-6-6zm0 8.2A2.2 2.2 0 1 1 12 5.8a2.2 2.2 0 0 1 0 4.4z"/></svg>`;
const considerIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>`;
const listIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>`;
const bundleIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>`;

/* ---------- Recommendation catalog + sections (from Figma design) ---------- */
const REC_ITEMS = {
  "barilla-spaghetti": { img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_0308404b-5597-43cf-934b-0ba6536077db.png", name: "Barilla Spaghetti - Non-GMO Pasta Made with Durum Wheat Semolina & Kosher Certified", price: "1.99", was: "2.79" },
  "ronzoni-spaghetti": { img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_81ba2ca5-4edc-48a5-8dcc-d78f63286ab1.png", name: "Ronzoni Spaghetti, 16 oz, Classic Pasta, Non-GMO, Great Taste", price: "1.59" },
  "cooked-perfect-meatballs": { img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b4363253-7422-4a20-a3f3-f7550b90c30d.png", name: "Cooked Perfect Italian Style Meatballs", price: "14.99", was: "20.99" },
  "carando-meatballs": { img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_80889013-7f2d-4dc2-9e7d-9e0b54a3518b.png", name: "Carando Abruzzese Recipe Italian Style Meatballs", price: "9.99" },
  "kraft-parmesan": { img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_6b8a2c66-4ec6-4e36-b292-d4bfa7bde60d.png", name: "Kraft Grated Parmesan & Romano Cheese Shaker Bottle", price: "7.49" },
  "belgioioso-parmesan": { img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_359e64b5-4237-49c4-8129-19f650f3515f.png", name: "BelGioioso Freshly Shredded Cheese, Parmesan", price: "4.99" },
  "pepperidge-garlic-bread": { img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e8e15c33-9318-4042-aad5-0e4d2429c002.jpg", name: "Pepperidge Farm Frozen Garlic Bread", price: "3.49" },
  "classico-four-cheese": { img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e7446a61-0b96-4e6d-a09b-8fbf37284652.jpg", name: "Classico Four Cheese Tomato Spaghetti Pasta Sauce", price: "4.79", was: "6.71" },
  "ragu-chunky": { img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ac0af865-2d84-4076-a732-a9bbb5e3422a.jpg", name: "Ragu Chunky Sauteed Onion and Garlic Pasta Sauce with Diced Tomatoes, 24 oz", price: "3.69", was: "5.17", off: "30% off" },
  "barilla-marinara": { img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_11f259ed-a53f-44b3-b0ef-24506a8e0c30.png", name: "Barilla Marinara Basil & Simmered Onion Pasta Sauce", price: "3.99", was: "5.59" },
};
// Carry each item's catalog key onto the card data so a tap can reopen the PDP
// for that recommended product.
const section = (title, icon, keys) => ({ title, icon, items: keys.map((k) => ({ key: k, ...REC_ITEMS[k] })) });
const REC_SECTIONS = [
  section("Often bought with", cartIcon, ["barilla-spaghetti", "cooked-perfect-meatballs", "kraft-parmesan", "pepperidge-garlic-bread", "ragu-chunky", "classico-four-cheese", "ronzoni-spaghetti", "carando-meatballs"]),
  section("Customers also considered", considerIcon, ["classico-four-cheese", "ragu-chunky", "barilla-marinara", "belgioioso-parmesan", "kraft-parmesan", "carando-meatballs", "barilla-spaghetti", "cooked-perfect-meatballs"]),
  section("Items to add next", listIcon, ["kraft-parmesan", "belgioioso-parmesan", "pepperidge-garlic-bread", "barilla-spaghetti", "ronzoni-spaghetti", "cooked-perfect-meatballs", "classico-four-cheese", "ragu-chunky"]),
  section("Frequently bought together", bundleIcon, ["barilla-spaghetti", "carando-meatballs", "kraft-parmesan", "pepperidge-garlic-bread", "ragu-chunky", "classico-four-cheese", "barilla-marinara", "cooked-perfect-meatballs"]),
];

function recCardHTML(it) {
  const priceBlock = it.was
    ? `<span class="rec-price rec-price--sale">$${it.price}</span><span class="rec-was">$${it.was}</span>`
    : `<span class="rec-price">$${it.price}</span>`;
  return `
    <div class="rec-card" role="button" tabindex="0" data-rec="${it.key}" aria-label="${it.name}, $${it.price}. View details.">
      <span class="rec-marker">${markerIcon}Aisle 10</span>
      <button class="rec-add" type="button" aria-label="Add ${it.name} to list">${listAddIcon}</button>
      <span class="rec-media"><img src="${it.img}" alt="${it.name}" /></span>
      <span class="rec-price-row">${priceBlock}</span>
      ${it.off ? `<span class="rec-off">${it.off}</span>` : ""}
      <span class="rec-name">${it.name}</span>
      <span class="rec-size">16oz</span>
    </div>`;
}
function recSectionsHTML() {
  if (!FLAGS.recs) return "";
  return REC_SECTIONS.map((s) => `
    <div class="rec-section">
      <div class="rec-head">${s.icon} ${s.title}</div>
      <div class="rec-row">${s.items.map(recCardHTML).join("")}</div>
    </div>`).join("");
}

/* ---------- Ratings & reviews (real data from Instacart) ---------- */
const REVIEW_SUMMARY = {
  average: "4.8",
  total: "2,796",
  // pct = share of total, used for bar width
  breakdown: [
    { stars: 5, count: "2.31K", pct: 82.6 },
    { stars: 4, count: "393", pct: 14.1 },
    { stars: 3, count: "70", pct: 2.5 },
    { stars: 2, count: "8", pct: 0.3 },
    { stars: 1, count: "18", pct: 0.6 },
  ],
};
const REVIEWS = [
  {
    rating: 5, title: "AMAZING MARINARA", date: "March 28, 2022", author: "T Newme", source: "Sovos Brands Inc.",
    body: "I fell in love with this sauce. Store bought sauce is usually OK, but when I tried Rao Marinara it felt like I was at my grandmas house. My mouth was watering in between bites. The marinara was worth every penny. However the stores were all out of marinara so I got the roasted garlic. I love garlic but the roasted garlic was bitter. I’m afraid to try anything other than the marinara because it’s a little pricey. Thank You for bringing back memories of my grandma’s cooking. I can honestly say spaghetti is once again my favorite meal.",
  },
  {
    rating: 5, title: "For Pizza or Pasta Tomato Basil is it.", date: "March 24, 2022", author: "Andy Palm Springs", source: "Sovos Brands Inc.",
    body: "For pizza or pasta, this is my goto. Don't know how I cam across RAO's, but I won't use anything else now. I've tried others and I'm really bad at making my own. So RAO's is it for me.",
  },
  {
    rating: 5, title: "One of my favorites!", date: "March 23, 2022", author: "Ann", source: "Sovos Brands Inc.",
    body: "The moment you open the jar..you are aware of the scent..that is a wonderful addition to the flavor. Be creative how you use it.. and friends will be amazed, wanting the recipe. Of course, if you are in a hurry, after work or a very busy day..just add to your favorite pasta..and friends/family will think you are truly amazing!",
  },
];
const smallStar = (fill) => `<svg viewBox="0 0 24 24" fill="${fill}" aria-hidden="true"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 6.9L12 17.8 5.4 21l1.4-6.9L1.6 9.3l7-.8L12 2z"/></svg>`;
const sortCaret = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;

function reviewStars(n) {
  let s = "";
  for (let i = 1; i <= 5; i++) s += smallStar(i <= n ? "#f7b500" : "#dcdcdc");
  return `<span class="rv-stars" role="img" aria-label="${n} out of 5 stars">${s}</span>`;
}
function reviewsSectionHTML() {
  if (!FLAGS.reviews) return "";
  const bars = REVIEW_SUMMARY.breakdown.map((b) => `
    <div class="rv-bar-row">
      <span class="rv-bar-label">${b.stars}${smallStar("#f7b500")}</span>
      <span class="rv-bar-track"><span class="rv-bar-fill" style="width:${b.pct}%"></span></span>
      <span class="rv-bar-count">${b.count}</span>
    </div>`).join("");
  const list = REVIEWS.map((r) => `
    <article class="rv-item">
      ${reviewStars(r.rating)}
      <div class="rv-title">${r.title}</div>
      <div class="rv-meta">Reviewed on ${r.date} by ${r.author} on ${r.source}</div>
      <p class="rv-body">${r.body}</p>
    </article>`).join("");
  return `
    <div class="reviews-section" id="reviewsSection">
      <div class="rv-left">
        <div class="rv-head-row">
          <h3 class="rv-heading">Reviews</h3>
          <button class="rv-sort" type="button">Most Relevant ${sortCaret}</button>
        </div>
        ${list}
      </div>
      <aside class="rv-right">
        <h3 class="rv-heading">Customer Reviews</h3>
        <div class="rv-average">Average rating: <strong>${REVIEW_SUMMARY.average}</strong> <span class="rv-total">(${REVIEW_SUMMARY.total})</span></div>
        <div class="rv-bars">${bars}</div>
      </aside>
    </div>`;
}

/* ---------- Nutrition (real data from Instacart) ---------- */
const NUTRITION = {
  score: 9,
  grade: "Excellent",
  stats: [
    { k: "Sodium", v: "420mg" },
    { k: "Sat Fat", v: "0g" },
    { k: "Sugar", v: "4g" },
    { k: "Carbs", v: "6g" },
  ],
  summary: `Similar sauces score an <strong>average of 4/10</strong>. This item scores higher, because tomatoes, olive oil, and herbs add beneficial ingredients, and it has no added sugar or artificial additives. <a href="#" class="nutri-learn">Learn More</a>`,
  positives: ["Low additives", "High phytochemicals", "High nutrient ratios", "High beneficial food ingredients", "High vitamins", "High minerals"],
  negatives: ["Low fiber and protein", "Low beneficial fats", "High processing"],
};
function nutritionHTML() {
  const r = 30, C = 2 * Math.PI * r;
  const offset = C * (1 - NUTRITION.score / 10);
  const chips = (arr) => arr.map((c) => `<span class="nutri-chip">${c}<span class="nutri-chip-arrow">›</span></span>`).join("");
  return `
    <div class="nutri">
      <div class="nutri-scorebox">
        <div class="nutri-ring">
          <span class="nutri-ring-tag">${NUTRITION.grade}</span>
          <span class="nutri-ring-dial">
            <svg viewBox="0 0 72 72" aria-hidden="true">
              <circle class="nutri-ring-track" cx="36" cy="36" r="${r}" />
              <circle class="nutri-ring-arc" cx="36" cy="36" r="${r}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}" transform="rotate(-90 36 36)" />
            </svg>
            <span class="nutri-ring-num">${NUTRITION.score}</span>
          </span>
          <span class="nutri-ring-label">Nutrition score</span>
        </div>
        <div class="nutri-stats">
          ${NUTRITION.stats.map((s) => `<div class="nutri-stat"><span class="nutri-stat-k">${s.k}</span><span class="nutri-stat-v">${s.v}</span></div>`).join("")}
        </div>
      </div>
      <p class="nutri-desc">${NUTRITION.summary}</p>
      <div class="nutri-group">
        <h4 class="nutri-h">Positives</h4>
        <div class="nutri-chips">${chips(NUTRITION.positives)}</div>
      </div>
      <div class="nutri-group">
        <h4 class="nutri-h">Negatives</h4>
        <div class="nutri-chips">${chips(NUTRITION.negatives)}</div>
      </div>
    </div>`;
}

function starRow(rating) {
  let s = "";
  for (let i = 1; i <= 5; i++) {
    const fill = i <= Math.round(rating) ? "#f7b500" : "#dcdcdc";
    s += `<svg viewBox="0 0 24 24" fill="${fill}" aria-hidden="true"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 6.9L12 17.8 5.4 21l1.4-6.9L1.6 9.3l7-.8L12 2z"/></svg>`;
  }
  return `<span class="stars" role="img" aria-label="${rating} out of 5 stars">${s}</span>`;
}

/* ---------- Product data ---------- */
const PRODUCTS = [
  { id: 1, name: "Rao's Tomato Basil Sauce", size: "16 oz", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ecdb7b10-9d71-47cc-8d8d-06ae92a4f24b.jpg", onSale: true, offer: "$1 off", clip: true, was: "$14.84", kw: "pasta sauce" },
  { id: 2, name: "Rao's Marinara Sauce", size: "16 oz", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_88fc4430-a70a-42dd-a7c8-00ec18f4544a.jpg", onSale: true, offer: false, clip: true, was: "$14.84", kw: "pasta sauce" },
  { id: 3, name: "Rao's Vodka Sauce", size: "16 oz", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_c4a74779-19dc-4004-9232-ce76ff20abc1.jpg", onSale: true, offer: false, clip: false, was: "$14.84", kw: "pasta sauce" },
  { id: 4, name: "Rao's Arrabbiata Spicy Marinara Sauce", size: "16 oz", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_35157cef-1323-4f57-8c00-d5dc399a995b.jpg", onSale: true, offer: false, clip: false, was: "$14.84", kw: "pasta sauce" },
  { id: 5, name: "Rao's Sensitive Formula Marinara Sauce", size: "16 oz", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_d0cad3ea-92e5-47be-a5d5-0fa45eb08b34.jpg", onSale: false, offer: false, clip: false, kw: "pasta sauce" },
  { id: 6, name: "Classico Tomato & Basil Pasta Sauce", size: "16 oz", price: "$4.79", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_11d31308-fc1e-4e59-8a96-070bccfcc193.jpg", onSale: true, offer: "$1 off", clip: true, was: "$6.47", kw: "pasta sauce" },
  { id: 7, name: "Prego Traditional Pasta Sauce", size: "16 oz", price: "$4.19", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_9f1a8f11-9d1f-497b-9950-5b3aca19bc8e.jpg", onSale: false, offer: false, clip: false, kw: "pasta sauce" },
  { id: 8, name: "Bertolli Traditional Marinara Sauce", size: "24 oz", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_bb437336-0470-44ee-a158-6af58dfa9e6f.jpg", onSale: true, offer: false, clip: false, was: "$6.74", kw: "pasta sauce" },
  // --- curated catalog subset (produce, dairy, meat, bakery, etc.)
  // pulled from sprouts_catalog.json so search returns real results ---
  { id: 9, name: "NatureSweet Tomatoes", size: "", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_84b497c2-4d6e-48cd-bbc2-65c37b84d6f3.png", aisle: "Produce" },
  { id: 10, name: "NatureSweet Grape Tomatoes", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_4f7993ef-0e5d-42b4-9a01-6d1e720869f3.png", aisle: "Produce" },
  { id: 11, name: "Campbell's Tomato Soup", size: "", price: "$1.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_6841407d-5abb-466c-b384-d569b6089a74.jpg", aisle: "Produce" },
  { id: 12, name: "Roma Tomato", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3d1c36ab-4b8c-4b4c-b8f6-7c63e939e53d.jpg", aisle: "Produce" },
  { id: 13, name: "Heinz Tomato Ketchup", size: "", price: "$5.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e6117fd5-08b4-493d-983f-93a4f10a2602.jpg", aisle: "Produce" },
  { id: 14, name: "Red On the Vine Tomato", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_46ae6606-511e-4c83-8eb1-80d91a8c043f.jpg", aisle: "Produce" },
  { id: 15, name: "Panera Bread Creamy Tomato Soup Cup (Gluten Free)", size: "", price: "$7.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_554f16e7-f626-4fac-9eb7-0ea42a5dcf75.png", aisle: "Produce" },
  { id: 16, name: "Tuttorosso Basil, Garlic & Oregano Diced Tomatoes", size: "", price: "$1.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_8577a36c-056c-49d2-94f0-3e7b48a00fff.jpg", aisle: "Produce" },
  { id: 17, name: "Hass Avocado", size: "", price: "$1.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_09ff3801-efef-43e6-a14b-6dc55a3fe4c8.jpg", aisle: "Produce" },
  { id: 18, name: "Hass Avocado (Large)", size: "", price: "$1.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_68b7357d-4b22-45f7-a3fa-f1e573fb357e.jpg", aisle: "Produce" },
  { id: 19, name: "Good Health Avocado Oil Sea Salted Veggie Straws", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_2d35b797-ed89-4bb8-b2b5-d0aef76d3a04.png", aisle: "Produce" },
  { id: 20, name: "Good Health Avocado Oil Sea Salted Veggie Chips", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_87f314a6-f7bd-404f-9928-8d6251355d5d.png", aisle: "Produce" },
  { id: 21, name: "Chosen Foods 100% Pure Avocado Oil", size: "", price: "$8.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_20e3d9f2-047e-4999-b581-9f5ac6c480a2.png", aisle: "Produce" },
  { id: 22, name: "Good Health Avocado Oil Sea Salted Veggie Stix", size: "", price: "$6.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_7662a015-5e1f-4104-84a0-5fecb46f756c.png", aisle: "Produce" },
  { id: 23, name: "Green Banana", size: "", price: "$0.79", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_a1422a2d-2928-4c28-b88a-b6ae5bba173a.jpg", aisle: "Produce" },
  { id: 24, name: "Organic Banana", size: "", price: "$1.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_17b704c5-b4df-4831-ac14-6260baa59a13.jpg", aisle: "Produce" },
  { id: 25, name: "Beech-Nut Fruities Stage 2 Baby Food, Banana Pear & Sweet Potato, 3.5 oz Pouch", size: "", price: "$1.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_6a686cf6-08dc-404d-97a6-4d53e2196609.png", aisle: "Produce" },
  { id: 26, name: "Ben & Jerry's Chunky Monkey® Banana Ice Cream Pint", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_1fca5e9d-fd60-48c2-a733-71a021963dc9.png", aisle: "Produce" },
  { id: 27, name: "Chobani Yogurt, Greek, Reduced Fat, Strawberry Banana on the Bottom", size: "", price: "$1.25", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_76b72d3b-ee5e-4370-858f-be2155f3a1cf.png", aisle: "Produce" },
  { id: 28, name: "Driscoll's Strawberries", size: "", price: "$3.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_443ebde8-2aaf-4b78-87a5-5b1f01c5274e.jpg", aisle: "Produce" },
  { id: 29, name: "Strawberry Cheese Bites", size: "", price: "$4.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_1ee3e67a-96c8-43fe-8951-01eb9867f59f.png", aisle: "Produce" },
  { id: 30, name: "Chobani Yogurt, Greek, Non-Fat, Strawberry on the Bottom", size: "", price: "$1.25", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_155c6eff-df45-401d-a751-bb491d8ece90.png", aisle: "Produce" },
  { id: 31, name: "Smucker's Jam, Strawberry, Value Size", size: "", price: "$5.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_febd5d27-addc-4c83-9c78-0ea5e0cd735c.jpg", aisle: "Produce" },
  { id: 32, name: "Yoplait Oui French Style Strawberry Whole Milk Yogurt, Glass Yogurt Jar", size: "", price: "$1.25", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_aadbcccd-d256-437d-affc-a3285f2bdf52.png", aisle: "Produce" },
  { id: 33, name: "Gala Apple", size: "", price: "$1.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_66b4805e-a886-4a85-8c7f-be4afb629f7b.jpg", aisle: "Produce" },
  { id: 34, name: "Apple Bites", size: "", price: "$4.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ea917edd-466e-40ff-a06e-98452c4390fd.png", aisle: "Produce" },
  { id: 35, name: "Geissler’s Supermarkets Apple Puffs Pastry", size: "", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_5d2d3727-f0a5-4dbf-8b71-afd9533b3b1a.png", aisle: "Produce" },
  { id: 36, name: "Old Fashioned Pie, Apple", size: "", price: "$1.79", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_df548857-5fac-490a-810c-24eca33a380e.png", aisle: "Produce" },
  { id: 37, name: "Plum Organics Apple & Carrot", size: "", price: "$1.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_4309aa2f-9f8f-4cef-aabf-531f8067f3cf.png", aisle: "Produce" },
  { id: 38, name: "Ct Bakery Apple Paczki Donuts", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b2984ffc-2e05-48db-a624-e41940616324.jpg", aisle: "Produce" },
  { id: 39, name: "Food Club Unsweetened Applesauce", size: "", price: "$2.00", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_58a64479-6c22-4d8d-89ff-ed4b782af315.png", aisle: "Produce" },
  { id: 40, name: "Iceberg Lettuce Bunch", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_a820b647-fee0-4a44-ba36-13a23ac56dc9.jpg", aisle: "Produce" },
  { id: 41, name: "Taylor Farms Shredded Iceberg Lettuce", size: "", price: "$2.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ffb6fbf4-c92d-4cfa-91e6-cc083eaaf7ec.png", aisle: "Produce" },
  { id: 42, name: "Little Leaf Farms Sweet Baby Butter Leaf Lettuce", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_13d09472-add5-4e90-a1ee-3f9a234bc06a.png", aisle: "Produce" },
  { id: 43, name: "Little Leaf Farms Baby Crispy Green Leaf Lettuce", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_4eb25c73-268c-4185-a109-82e6c86a8d19.png", aisle: "Produce" },
  { id: 44, name: "Little Leaf Farms Baby Red & Green Leaf Lettuce", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f327ca0d-6a1f-4870-b4c6-148fc9046157.png", aisle: "Produce" },
  { id: 45, name: "Yellow Onion", size: "", price: "$1.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_c52783e5-46ee-4c38-b0a0-6e792b9fe497.jpg", aisle: "Produce" },
  { id: 46, name: "Green Onions (Scallions) Bunch", size: "", price: "$1.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_1078b6b8-f905-4e82-bb5d-f2d613bfa162.jpg", aisle: "Produce" },
  { id: 47, name: "Red Onion", size: "", price: "$0.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_5e4c257a-5dc5-4631-a342-2d29593ad140.jpg", aisle: "Produce" },
  { id: 48, name: "Yellow Onions, Bag", size: "", price: "$1.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_9870ecb5-ac4c-44d4-a1ba-369eaff84309.png", aisle: "Produce" },
  { id: 49, name: "Heluva Good! French Onion Dip", size: "", price: "$2.79", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_70dccdd5-fd4c-4ced-a27b-9c7103e23aa1.jpg", aisle: "Produce" },
  { id: 50, name: "Green Bell Pepper", size: "", price: "$4.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3ffcdeaa-1363-450e-9de1-37c02ee53ba6.jpg", aisle: "Produce" },
  { id: 51, name: "Pepperidge Farm Raisin Cinnamon Swirl Bread", size: "", price: "$4.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_a197b71a-e2af-4ba3-9a08-490c86ccc999.jpg", aisle: "Produce" },
  { id: 52, name: "Pepperidge Farm 15 Grain Bread", size: "", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_9dae3ddb-76bd-4b80-88de-243ae0304169.jpg", aisle: "Produce" },
  { id: 53, name: "Pepperidge Farm Cinnamon Swirl Breakfast Bread", size: "", price: "$4.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_9cf49412-6b47-414d-8fdd-516af6781123.jpg", aisle: "Produce" },
  { id: 54, name: "Pepperidge Farm Soft White Hamburger Buns", size: "", price: "$4.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_cc776a37-5f59-4092-aa20-5e29d7ab51ec.jpg", aisle: "Produce" },
  { id: 55, name: "Pepperidge Farm Italian White Seedless Bread", size: "", price: "$3.39", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b060727a-c0c7-4652-bdf5-b83e4e1d2f5d.jpg", aisle: "Produce" },
  { id: 56, name: "Great Lakes Mini Cucumbers", size: "", price: "$3.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_5e644187-5664-428d-830e-0ce19b75e703.jpg", aisle: "Produce" },
  { id: 57, name: "Joseph's Cucumber & Garlic Yogurt Dip, Tzatziki", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ed1620a0-1178-4b41-9380-3f258db06112.jpg", aisle: "Produce" },
  { id: 58, name: "Mini Cucumbers", size: "", price: "$3.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ed227ff2-65b0-4618-a045-ab4f39a69d59.jpg", aisle: "Produce" },
  { id: 59, name: "Pickling (Kirby) Cucumber", size: "", price: "$1.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b903a004-2a72-4841-ae29-0ebfbb262155.jpg", aisle: "Produce" },
  { id: 60, name: "Martin's Sandwich Potato Bread", size: "", price: "$4.59", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b077f667-a2e2-4c4c-ad7f-c18e7f877084.png", aisle: "Produce" },
  { id: 61, name: "Potato & Egg Salad", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_92ac6d1f-9cba-41bd-b072-8feeaf499af5.png", aisle: "Produce" },
  { id: 62, name: "Geissler’s Supermarkets Potato & Egg Salad", size: "", price: "$9.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3b8d4cff-ffb7-4c4b-83d9-961ee1b298cd.jpg", aisle: "Produce" },
  { id: 63, name: "Bag of Russet Potatoes", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_aba7349a-cc88-4418-968f-cccd661b57a0.jpg", aisle: "Produce" },
  { id: 64, name: "Sweet Potato (Yam)", size: "", price: "$1.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f00cba26-6590-43db-8995-a3726cb6086e.jpg", aisle: "Produce" },
  { id: 65, name: "Martin's Sandwich Potato Rolls", size: "", price: "$4.59", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f4a1ad53-7a8a-41b4-a1c5-339ea73c98dd.png", aisle: "Produce" },
  { id: 66, name: "Grimmway Farms Baby Carrots 1 lb", size: "", price: "$2.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_8c66edb8-d656-4ffe-b9a7-907eaf0329da.png", aisle: "Produce" },
  { id: 67, name: "Grimmway Farms Microwavable Petite Carrots 12 oz", size: "", price: "$2.79", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_d9ec6145-c704-4714-9417-34e6fae7ae58.png", aisle: "Produce" },
  { id: 68, name: "Grimmway Farms Whole Carrots", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_14a23d57-4080-4768-9099-ee970bf73bec.jpg", aisle: "Produce" },
  { id: 69, name: "Cal-Organic Farms Carrots, Fresh Organic", size: "", price: "$1.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_5f21c028-c580-49e2-b567-59871fd838a5.png", aisle: "Produce" },
  { id: 70, name: "Food Club California Blend Vegetables With Broccoli, Cauliflower & Carrots", size: "", price: "$2.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_62cbdabd-0333-40a0-a324-be14f9e839b4.png", aisle: "Produce" },
  { id: 71, name: "Ct Bakery Lemon Paczki Donuts", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e8e6d8ae-412a-4d30-9d60-498654638229.jpg", aisle: "Produce" },
  { id: 72, name: "Wonderful Citrus Naturally Seedless Lemons", size: "", price: "$3.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_81cf7cbc-ea98-4211-b23c-2ded50c13bd5.png", aisle: "Produce" },
  { id: 73, name: "Adirondack Enhanced Water, Lemon", size: "", price: "$2.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_16ad524b-f1d9-42eb-ad1a-25c4d9b584bc.png", aisle: "Produce" },
  { id: 74, name: "Sprite Lemon-Lime Soda", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f466e4ea-c6d3-45d4-8bb7-b3655efba5bd.jpg", aisle: "Produce" },
  { id: 75, name: "Geissler’s Supermarkets Honey Lime Chicken Pasta Salad", size: "", price: "$8.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e8d432ee-8b87-4203-916f-ba332b80f772.png", aisle: "Produce" },
  { id: 76, name: "Limes", size: "", price: "$0.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_42bb0e57-f304-4375-984a-01f3ba6ddb8f.jpg", aisle: "Produce" },
  { id: 77, name: "Polar Tonic Water with Lime, Zero-Sugar, Diet", size: "", price: "$1.00", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b43d08f0-facf-4699-868c-0c838861eb8e.png", aisle: "Produce" },
  { id: 78, name: "Special Red Grapes", size: "", price: "$4.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f4fec898-1ee9-4d4d-b582-efcaadf4ceb4.jpg", aisle: "Produce" },
  { id: 79, name: "Popsicle Sugar Free Orange Cherry Grape Ice Pops", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e4c49f2b-ea71-462e-b694-944e749808d1.png", aisle: "Produce" },
  { id: 80, name: "Del Monte Red Grapefruit FRUIT CUP Snacks", size: "", price: "$2.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_818d06b3-38d2-4bf7-b100-e7e1e9ad95e1.jpg", aisle: "Produce" },
  { id: 81, name: "Smucker's Uncrustables Peanut Butter & Grape Jelly Sandwich", size: "", price: "$4.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_5f1b1861-c553-4c2f-b638-2b34e308291a.jpg", aisle: "Produce" },
  { id: 82, name: "Smucker's Concord Grape Jelly, 18 Ounces", size: "", price: "$3.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_08388265-252b-4a56-aea8-40e94d925b42.jpg", aisle: "Produce" },
  { id: 83, name: "Birds Eye Baby Broccoli Florets, Frozen Vegetables", size: "", price: "$3.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b2a8be4d-4533-4b70-beb4-ac7144814923.jpg", aisle: "Produce" },
  { id: 84, name: "Broccoli Crown", size: "", price: "$2.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_acbb2641-8b48-4e09-ad1d-1f2f7c2e7c80.jpg", aisle: "Produce" },
  { id: 85, name: "Birds Eye Steamfresh Broccoli Florets, Frozen Vegetables", size: "", price: "$3.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f4c740c6-0128-492e-bf33-b98da3f6219c.jpg", aisle: "Produce" },
  { id: 86, name: "Panera Bread Broccoli Cheddar Soup Cup", size: "", price: "$7.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_1587009b-824a-480d-b263-dd4bd89ac993.png", aisle: "Produce" },
  { id: 87, name: "Taylor Farms Spinach", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b8e31ecb-3cc1-414b-871e-22d5c0372bba.png", aisle: "Produce" },
  { id: 88, name: "Olivia's Organics Baby Spinach", size: "", price: "$8.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_404f8176-a5a1-4e8a-bd6b-0336f1cecc43.jpg", aisle: "Produce" },
  { id: 89, name: "Hanover Leaf Spinach", size: "", price: "$2.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_32c392ba-b3cf-4768-ab39-6d8428384405.png", aisle: "Produce" },
  { id: 90, name: "Beech-Nut Veggies Stage 2 Baby Food, Zucchini Spinach & Banana, 3.5 oz Pouch", size: "", price: "$1.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_63e63646-ce1b-4bc8-a939-615ac8bbac88.png", aisle: "Produce" },
  { id: 91, name: "Nuberry Farms Berry Blueberry 1Pt Cv", size: "", price: "$7.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_d157ffde-1e14-4f18-b2ba-a8cacfbec196.png", aisle: "Produce" },
  { id: 92, name: "Old Fashioned Pie, Wild Blueberry", size: "", price: "$1.79", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b7444467-d4ca-4986-85c2-7122b27fce39.png", aisle: "Produce" },
  { id: 93, name: "Camposol Blueberries", size: "", price: "$7.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_022485eb-411d-4693-bb66-7befb6c2b8e5.jpg", aisle: "Produce" },
  { id: 94, name: "Blueberry Bites", size: "", price: "$4.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_43e6ff63-aad0-4db0-95a5-d14dffddba5f.png", aisle: "Produce" },
  { id: 95, name: "Food Club Mushrooms, Pieces & Stems", size: "", price: "$1.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ce1a58e4-55e6-465b-9c1d-7c86abaa7d29.png", aisle: "Produce" },
  { id: 96, name: "Giorgio Fresh Baby Bella Mushrooms", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_0a188bea-da82-4cc5-a9c0-e28427cfc5e7.JPG", aisle: "Produce" },
  { id: 97, name: "Giorgio Fresh Sliced White Mushrooms", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_bccf0e98-f416-4356-9a1a-2bcc87d91f1b.jpg", aisle: "Produce" },
  { id: 98, name: "Campbell's Cream of Mushroom Soup", size: "", price: "$2.39", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ffb1a450-51c1-4a8b-853a-dab0301ffe83.jpg", aisle: "Produce" },
  { id: 99, name: "Celery Heart Bunch", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_81efa8de-d1e7-4531-9e5b-530404b7e34a.jpg", aisle: "Produce" },
  { id: 100, name: "Fresh Cut Celery & Carrots Sticks", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_526060c4-ec9b-4102-8074-4eed81bc86ba.png", aisle: "Produce" },
  { id: 101, name: "Simple Beginnings Celery Heart", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_891a4049-807b-46b4-96d1-e2dd66e82906.jpg", aisle: "Produce" },
  { id: 102, name: "Polar Blackberry Mango Premium Seltzer", size: "", price: "$7.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_2bc3b604-1d21-48b0-a05b-24fc396eacc5.jpg", aisle: "Produce" },
  { id: 103, name: "BODYARMOR Orange Mango Sports Drink Bottle", size: "", price: "$2.19", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_2dd85553-9a2c-4ef9-97de-814a413f23ae.jpg", aisle: "Produce" },
  { id: 104, name: "Stonyfield Organic Pear Spinach Mango Whole Milk Yogurt", size: "", price: "$7.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_80c6a62d-4226-4da8-b021-a8310c9e94f7.jpg", aisle: "Produce" },
  { id: 105, name: "Bang Energy Peach Mango", size: "", price: "$2.89", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_d588a6e8-2fef-4820-9de1-52be67603374.png", aisle: "Produce" },
  { id: 106, name: "Hood Whole Milk", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ef91e55b-2e7a-43dc-904b-9e2537a4c553.jpg", aisle: "Dairy" },
  { id: 107, name: "Hood One Percent Lowfat Milk", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_d588dfb0-f252-42b6-aaf3-57b64894eae6.jpg", aisle: "Dairy" },
  { id: 108, name: "Hood 2% Reduced Fat Milk", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_56c597f6-8505-46e4-9168-f65d33619364.jpg", aisle: "Dairy" },
  { id: 109, name: "Eggo Buttermilk Waffles, Frozen Breakfast, 10 Count", size: "", price: "$3.79", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_c257433c-5e71-4da3-b56e-e64b00e9ab5a.jpg", aisle: "Dairy" },
  { id: 110, name: "Lactaid Whole Milk", size: "", price: "$7.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_76eae8a2-8175-4c1e-9141-34afe3482403.jpg", aisle: "Dairy" },
  { id: 111, name: "CADBURY DAIRY MILK Fruit & Nut Milk Chocolate Candy Bar, 3.5 oz", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_930d838a-2edb-410c-ab94-0203a2bac1d0.jpg", aisle: "Dairy" },
  { id: 112, name: "Hood Fat Free Milk", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_225e8564-3088-4420-bc72-01333f83f76a.jpg", aisle: "Dairy" },
  { id: 113, name: "Hillandale Farms Eggs", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_52ba6674-6417-4579-bf61-51e03d93a9cf.png", aisle: "Dairy" },
  { id: 114, name: "The Farmer's Cow Eggs, Brown, Large", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_03ea8149-68ef-4191-9cab-879ea8404e0f.png", aisle: "Dairy" },
  { id: 115, name: "Hillandale Farms Grade A Extra Large Eggs", size: "", price: "$3.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_758759a1-3eb5-464d-afca-1acc4abd1965.jpg", aisle: "Dairy" },
  { id: 116, name: "Hillandale Farms White Farm Fresh Large Eggs", size: "", price: "$1.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_df76f810-30a3-43ba-8a80-80b14c105330.png", aisle: "Dairy" },
  { id: 117, name: "Hillandale Farms Eggs, Large White, Farm Fresh", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_85f00f30-72b5-4c3c-9749-746940095d2b.png", aisle: "Dairy" },
  { id: 118, name: "American Cheese", size: "", price: "$7.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_226a513f-ade5-4ba8-94fe-74b88757de4d.png", aisle: "Dairy" },
  { id: 119, name: "Philadelphia No Bake Original Cheesecake Filling", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_d687f50c-e699-45d1-bba7-a4afbebff87a.jpg", aisle: "Dairy" },
  { id: 120, name: "Stouffer's Macaroni And Cheese Single Serve Frozen Entrees For One Easy Frozen Dinners", size: "", price: "$3.79", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_9fb27a66-a45f-431d-87c1-577609327d25.jpg", aisle: "Dairy" },
  { id: 121, name: "Hood Country Style Small Curd Cottage Cheese", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_52e0fa2a-5aae-4b9d-aaf1-f25c3e81616a.jpg", aisle: "Dairy" },
  { id: 122, name: "Swiss Cheese", size: "", price: "$11.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_62340344-258a-4f07-9b8e-feaeff7ea831.png", aisle: "Dairy" },
  { id: 123, name: "Less Salt American Cheese", size: "", price: "$8.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_9897cd4c-889d-4549-aaba-ece3f854fa2e.png", aisle: "Dairy" },
  { id: 124, name: "Hood Country Style Cottage Cheese", size: "", price: "$5.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ab4d864e-0312-483a-970c-84e0b453c03f.jpg", aisle: "Dairy" },
  { id: 125, name: "Land O Lakes White Deli American Cheese, Packaged Sliced Cheese, 8oz, 10 Slices", size: "", price: "$3.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_1214734c-c990-49ae-8087-2cc3fe225b35.png", aisle: "Dairy" },
  { id: 126, name: "Chobani Yogurt, Greek, Nonfat, Peach on the Bottom", size: "", price: "$1.25", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_0f913ada-d105-4132-8634-a3ecd5a531dd.png", aisle: "Dairy" },
  { id: 127, name: "Chobani Yogurt, Greek, Nonfat, Raspberry on the Bottom", size: "", price: "$1.25", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3afe7b06-a6bf-4648-97ce-4ff3603cc104.png", aisle: "Dairy" },
  { id: 128, name: "Cabot Whole Milk Plain Greek Yogurt, 2 lb", size: "", price: "$6.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_efff7bdf-b29f-4aa2-96c1-b519440b6620.jpg", aisle: "Dairy" },
  { id: 129, name: "Chobani Yogurt, Greek, Nonfat, Plain", size: "", price: "$6.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_214515ed-9b15-4b73-a211-2807750aa9fb.png", aisle: "Dairy" },
  { id: 130, name: "Chobani Yogurt, Nonfat, Greek, Black Cherry on the Bottom", size: "", price: "$1.25", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_7abc7764-3ed6-4c77-b406-24e1931f6b19.png", aisle: "Dairy" },
  { id: 131, name: "Chobani Mixed Berry on Bottom Vanilla Low-Fat Greek Yogurt", size: "", price: "$7.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_72b865c1-2218-4849-94d9-29ec3d6f64a1.png", aisle: "Dairy" },
  { id: 132, name: "Nature's Own Butterbread, Sliced White Bread, 20 oz Loaf", size: "", price: "$4.59", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_4debfd16-1148-4f50-a1dd-8e8a971d61bf.png", aisle: "Dairy" },
  { id: 133, name: "Salted Butter Quarters", size: "", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_30d0814e-aede-4030-8dad-1ec866ccfe19.png", aisle: "Dairy" },
  { id: 134, name: "SKIPPY Creamy Peanut Butter, 16.3 OZ", size: "", price: "$3.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_7cdc77d7-b284-4471-838e-5561986c588b.jpg", aisle: "Dairy" },
  { id: 135, name: "Land O Lakes Butter, Salted", size: "", price: "$6.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_303f928a-43fa-45ac-b8b4-f5ee8de9d94d.png", aisle: "Dairy" },
  { id: 136, name: "Kerrygold Grass-Fed Pure Irish Salted Butter Foil", size: "", price: "$6.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_fa985fc1-7f7a-4c2d-98f5-c5fc87e71541.png", aisle: "Dairy" },
  { id: 137, name: "Geissler’s Supermarkets Chicken Salad", size: "", price: "$11.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_08f94742-96ce-4855-9c2f-7dfe653b3b8f.png", aisle: "Meat & Seafood" },
  { id: 138, name: "Marinated Rotisserie Chicken", size: "", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_7e132695-6c93-413a-84b9-4d02a1d8613e.png", aisle: "Meat & Seafood" },
  { id: 139, name: "Boston Salad Cranberry Walnut Chicken Salad", size: "", price: "$14.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_2fcba250-94a4-4a76-bb9c-7a1186091805.jpg", aisle: "Meat & Seafood" },
  { id: 140, name: "Perdue Fresh Ground Chicken, 92% Lean 8% Fat", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_28376af2-a4d7-4c88-8526-af6e9c906d2c.png", aisle: "Meat & Seafood" },
  { id: 141, name: "Perdue Chicken Breast Strips", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_7fc04b21-eebc-4b43-8c0f-39eb3bf372c3.png", aisle: "Meat & Seafood" },
  { id: 142, name: "Campbell's Cream of Chicken Soup", size: "", price: "$2.39", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_8407e3c4-912b-4d67-8109-bdcce50e3f38.jpg", aisle: "Meat & Seafood" },
  { id: 143, name: "Campbell's Chicken Noodle Soup", size: "", price: "$1.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_2ee05523-219f-4fcf-b93a-a63d30cccf77.jpg", aisle: "Meat & Seafood" },
  { id: 144, name: "Certified Angus Beef 80% Lean 20% Fat Ground Beef", size: "", price: "$7.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_0f0bfc85-9d93-43a1-961a-93b84c1774f8.jpg", aisle: "Meat & Seafood" },
  { id: 145, name: "Certified Angus Beef 85% Lean Ground Beef Patties", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_14062c1f-ec23-4f3a-8d55-fc8d1af84c61.jpg", aisle: "Meat & Seafood" },
  { id: 146, name: "Certified Angus Beef 80% Lean Ground Beef Patties", size: "", price: "$7.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b0581e53-bea2-424e-9968-723124bd05e9.jpg", aisle: "Meat & Seafood" },
  { id: 147, name: "Certified Angus Beef 90% Lean Ground Beef", size: "", price: "$8.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3ac0f613-71e5-4b63-b379-f17b434ade9b.jpg", aisle: "Meat & Seafood" },
  { id: 148, name: "Geissler’s Supermarkets Roast Beef", size: "", price: "$17.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_a98d4a09-5056-4ffc-937a-aef7728f1300.png", aisle: "Meat & Seafood" },
  { id: 149, name: "Purina Fancy Feast Salmon Feast Classic Grain Free Wet Cat Food Pate", size: "", price: "$1.09", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_5dd8fd25-6238-409a-95cf-48d5decbbb59.jpg", aisle: "Meat & Seafood" },
  { id: 150, name: "Salmon", size: "", price: "$11.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f780169f-6ca5-48d3-b872-e7dee3768ab0.jpg", aisle: "Meat & Seafood" },
  { id: 151, name: "Chicken of the Sea Wild Caught Alaskan Pink Salmon, Skinless & Boneless", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f9af6397-abea-4198-9ac2-34127290efea.png", aisle: "Meat & Seafood" },
  { id: 152, name: "Meow Mix Tenders in Sauce with REAL Salmon & Crab, Wet Cat Food", size: "", price: "$1.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_48c4c917-184e-471c-86dc-da91dfd7bd50.jpg", aisle: "Meat & Seafood" },
  { id: 153, name: "Meow Mix Tender Favorites with REAL Tuna & Whole Shrimp in Sauce, Wet Cat Food", size: "", price: "$1.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_451dc1b7-b0be-4ddc-9e7d-457fe78a7573.jpg", aisle: "Meat & Seafood" },
  { id: 154, name: "Naked Shrimp Raw Shrimp, 31/40 count per pound", size: "", price: "$14.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_dac1f9a0-1b43-4b57-92c2-3945649d3878.png", aisle: "Meat & Seafood" },
  { id: 155, name: "Bertolli Shrimp Scampi & Linguine, Frozen Meal", size: "", price: "$11.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_70cdd438-02a4-400e-a26e-d210c29ba24c.jpg", aisle: "Meat & Seafood" },
  { id: 156, name: "Cape Covelle Seafood Market Extra Large Cooked Shrimp", size: "", price: "$13.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_5fcc9802-f0e1-43fd-ba9e-8b9a820f7e72.jpg", aisle: "Meat & Seafood" },
  { id: 157, name: "Oscar Mayer Naturally Hardwood Smoked Thick Cut Bacon", size: "", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_14162398-d488-4670-b26c-f19ee46f8264.jpg", aisle: "Meat & Seafood" },
  { id: 158, name: "Oscar Mayer Naturally Hardwood Smoked Bacon", size: "", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_c9585aaf-4f03-49c4-b3ff-68c934289f1b.jpg", aisle: "Meat & Seafood" },
  { id: 159, name: "Sugardale Hickory Smoked, Bacon", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_bf78ddc2-b809-4f1e-923e-0175f966396a.jpg", aisle: "Meat & Seafood" },
  { id: 160, name: "Oscar Mayer Gluten Free Turkey Bacon with 58% Less Fat & 57% Less Sodium", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b1289916-51ba-4c4e-a56d-0df6c17a36ea.jpg", aisle: "Meat & Seafood" },
  { id: 161, name: "Wonder Bread Classic White Sandwich Bread", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_7f463913-7f6a-4c54-bad6-8adb77c39228.png", aisle: "Bakery" },
  { id: 162, name: "Geissler’s Mini Italian Bread", size: "", price: "$1.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_723aba6d-38a2-4d78-b5d4-3da6e69a761c.png", aisle: "Bakery" },
  { id: 163, name: "Geissler’s Supermarkets Crusty French Bread", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_d3b46a59-8fd7-4f61-9bc2-970dfc5a4d42.png", aisle: "Bakery" },
  { id: 164, name: "Geissler's Store Baked Large Italian Bread", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f1d57639-3737-4b87-8a3f-2c1954b7cb20.png", aisle: "Bakery" },
  { id: 165, name: "Geissler’s Baked Italian Bread", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_d977d18a-4b7a-43ea-b3d1-576a2a15093a.png", aisle: "Bakery" },
  { id: 166, name: "Bell & Evans Chicken Breast Tenders, Breaded, Uncooked", size: "", price: "$7.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_bcb8577d-8fb3-4d08-a7c5-d7f986bace8a.png", aisle: "Bakery" },
  { id: 167, name: "Thomas’ 6 ct, Plain, Bagels, 10g Protein, Kosher, Bagels, 20 oz", size: "", price: "$4.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_78916892-a8c9-4a2f-a8f9-ebb7218a9bf8.png", aisle: "Bakery" },
  { id: 168, name: "Thomas’ 6 ct, Cinnamon Raisin, Bagels, 9g Protein, Kosher, Bagels, 20 oz", size: "", price: "$4.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_8609defa-8f92-40d7-811b-847511cd60d7.png", aisle: "Bakery" },
  { id: 169, name: "Thomas’ 6 ct, Everything, Bagels, 10g Protein, Kosher, Bagels, 20 oz", size: "", price: "$4.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3c665efe-9a6f-4930-b91d-2b543ae23701.png", aisle: "Bakery" },
  { id: 170, name: "SANTITAS Tortilla Chips White Corn 11 Oz", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_575311cb-b7a0-45a0-be57-2b26092de0cd.png", aisle: "Bakery" },
  { id: 171, name: "Doritos Flavored Tortilla Chips, Nacho Cheese", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_4978d785-0749-40c5-bf91-d81c9dfb65c9.png", aisle: "Bakery" },
  { id: 172, name: "Doritos Tortilla Chips Cool Ranch Flavored 14 1/2 Oz", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_2d80408f-3ca6-46ad-9589-10b4a2bae945.png", aisle: "Bakery" },
  { id: 173, name: "Drake's Cakes, Coffee", size: "", price: "$2.88", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_84887c49-72d2-4571-bf94-1e0e28a2cedc.png", aisle: "Beverages" },
  { id: 174, name: "Dunkin' Dunkin’ Original Blend Medium Roast Coffee, Keurig K-Cup Pods", size: "", price: "$9.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_6f7f10e9-de38-4546-a06d-641c980084fd.jpg", aisle: "Beverages" },
  { id: 175, name: "Coffee mate Italian Sweet Crme Flavored Coffee Creamer", size: "", price: "$5.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_bea04796-8715-4f60-be10-5cdcd7830b39.jpg", aisle: "Beverages" },
  { id: 176, name: "Folgers Classic Roast Instant Coffee", size: "", price: "$11.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ca1a0ba3-925e-42a0-bf0f-1624b1d10def.jpg", aisle: "Beverages" },
  { id: 177, name: "DIXIE Paper Coffee Cups & Lids, 12oz Disposable Hot Cups (Variety Pack)", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f320fee9-fcb9-47c4-90fb-0e2ba4e3aeaa.jpg", aisle: "Beverages" },
  { id: 178, name: "Coffee Cake Muffins 4 packs", size: "", price: "$7.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e8d3d642-ed3d-4373-b66c-0896d93e988f.png", aisle: "Beverages" },
  { id: 179, name: "Poland Spring Maine Spring Water, 16.9 fl oz  bottles (Pack of 24)", size: "", price: "$6.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_82370e65-d44d-4685-9981-efae476b22b9.jpg", aisle: "Beverages" },
  { id: 180, name: "Food Club Distilled Water", size: "", price: "$1.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_15e982a4-7918-48ff-8b5a-a5b3d767d35e.png", aisle: "Beverages" },
  { id: 181, name: "Bumble Bee Solid White Albacore Tuna in Water", size: "", price: "$2.19", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3f6fd1c5-7ad3-468e-ad08-2d256451aca3.png", aisle: "Beverages" },
  { id: 182, name: "Crystal Geyser Spring Water", size: "", price: "$1.19", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_99bdee78-41a4-4f42-b581-8a2e72c0dd7c.png", aisle: "Beverages" },
  { id: 183, name: "Poland Spring Natural Spring Water", size: "", price: "$2.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_a99653ee-e785-454c-ac7a-67e5ad436b5a.jpg", aisle: "Beverages" },
  { id: 184, name: "Tropicana Pure Premium 100% Orange Juice Original, No Pulp, No Sugar Added", size: "", price: "$4.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_8be1ac91-9569-464b-b216-0303e98d813e.png", aisle: "Beverages" },
  { id: 185, name: "Simply Pulp Free Orange Juice Bottle", size: "", price: "$5.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_2b9d803b-eecb-4ffb-a6c3-4115669fbfbe.jpg", aisle: "Beverages" },
  { id: 186, name: "Florida's Natural 100% Premium Florida Orange Juice No Pulp", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3c6c55a5-4905-4859-9947-784c7a65e2de.png", aisle: "Beverages" },
  { id: 187, name: "Del Monte Yellow Cling Sliced Peaches in 100% Juice, Canned Fruit", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_a47a9af1-9d2c-417f-8a6c-b37328c79f35.jpg", aisle: "Beverages" },
  { id: 188, name: "Tropicana 100% Juice, Orange, Original", size: "", price: "$9.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_edcfd6c1-9ae4-4c47-b5d4-c6aafc92b80b.png", aisle: "Beverages" },
  { id: 189, name: "Simply Orange Juice Pulp Free Bottle", size: "", price: "$2.39", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_fa73ce7d-77b8-4f94-92c7-ff64b399a3d7.jpg", aisle: "Beverages" },
  { id: 190, name: "Birds Eye Steamfresh Asian Vegetable Medley, Frozen Vegetables", size: "", price: "$3.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_9cdcba5f-2bd6-45a1-858b-0c8697c9487e.jpg", aisle: "Beverages" },
  { id: 191, name: "Birds Eye Steamfresh Sweet Peas, Frozen Vegetables", size: "", price: "$2.59", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_0badc7e5-60c4-4928-89e3-87d41bb4328f.jpg", aisle: "Beverages" },
  { id: 192, name: "Birds Eye Steamfresh Mixed Vegetables, Frozen Vegetables", size: "", price: "$2.59", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_414db384-dbbd-47d2-bc72-faad8b766a18.jpg", aisle: "Beverages" },
  { id: 193, name: "Certified Angus Beef Beef Sirloin Steak Tips", size: "", price: "$17.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_42d43b53-a503-4010-b65c-92f45074b8d1.jpg", aisle: "Beverages" },
  { id: 194, name: "Pepsi Cola Soda", size: "", price: "$2.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_8d626fa7-0327-4922-b6de-cf92187bd518.png", aisle: "Beverages" },
  { id: 195, name: "Coca-Cola Original Taste Soda Fridge Pack", size: "", price: "$8.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e5e896fe-e047-4688-bdfd-7acee166978f.jpg", aisle: "Beverages" },
  { id: 196, name: "Canada Dry Zero Sugar Ginger Ale Soda, 12 fl oz bottles, 8 pack", size: "", price: "$8.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_58a5ec51-8198-4ae3-a398-280359c3d043.jpg", aisle: "Beverages" },
  { id: 197, name: "Diet Coke Soda Bottle", size: "", price: "$3.39", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b1035f01-f08a-4f3d-be9f-8bbeadc4bae8.jpg", aisle: "Beverages" },
  { id: 198, name: "Hood Ice Cream Sandwich", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e420f311-41df-4e35-ae61-11a380ba7670.jpg", aisle: "Frozen Foods" },
  { id: 199, name: "Ben & Jerry's Half Baked® Chocolate & Vanilla Ice Cream Pint", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_1d2ecd76-9413-4010-82c5-9cd6196e1edf.png", aisle: "Frozen Foods" },
  { id: 200, name: "Haagen-Dazs Vanilla Ice Cream", size: "", price: "$4.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_c0977e8d-194d-4765-a814-cf3669d1c40c.jpg", aisle: "Frozen Foods" },
  { id: 201, name: "Friendly's Rich And Creamy Chocolate Chip Premium Ice Cream 1.5 Quart", size: "", price: "$5.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_6af86dbe-d3f1-4b05-b206-d246a996ed78.jpg", aisle: "Frozen Foods" },
  { id: 202, name: "Hood Mini Ice Cream Sandwich", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_c987ea74-4a9b-4622-a859-3e757c82a522.jpg", aisle: "Frozen Foods" },
  { id: 203, name: "Stouffer's French Bread Three Meat Frozen Pizza", size: "", price: "$4.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_276d84a0-23e3-401e-ba2b-02da7b1b7cb6.png", aisle: "Frozen Foods" },
  { id: 204, name: "DiGiorno Frozen Pizza", size: "", price: "$7.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_06b6f142-f13d-4533-884f-31b8f88369e8.png", aisle: "Frozen Foods" },
  { id: 205, name: "Stouffer's Deluxe French Bread Frozen Pizza", size: "", price: "$4.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_c149c30c-ddcf-4af1-a01f-8fbc63c0d27c.png", aisle: "Frozen Foods" },
  { id: 206, name: "Kellogg’s Special K Breakfast Cereal, 11 Vitamins and Minerals, Made with Folic Acid, B Vitamins and Iron, Original,  Box (1 Box)", size: "", price: "$5.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_6c1d22c7-611f-4916-9be9-882dd7a557db.jpg", aisle: "Aisle 8" },
  { id: 207, name: "General Mills Honey Nut Cheerios Cereal Large Size", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3e0a96ae-8709-4d0c-b176-397af0415699.png", aisle: "Aisle 8" },
  { id: 208, name: "General Mills Honey Nut Cheerios Cereal", size: "", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_20c162a2-b468-4e70-9560-f06cda103943.png", aisle: "Aisle 8" },
  { id: 209, name: "Kellogg's Raisin Bran Crunch Breakfast Cereal, Good Source of Fiber", size: "", price: "$5.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_1491af38-0088-4d36-94b1-cef85a617e37.jpg", aisle: "Aisle 8" },
  { id: 210, name: "Life Cereal, Multigrain, Cinnamon, Large Size", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_530b097d-c756-46d1-b2ef-cbdd6baf1797.png", aisle: "Aisle 8" },
  { id: 211, name: "Birds Eye Steamfresh Seasoned Chicken Flavored Rice, Frozen Side", size: "", price: "$3.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_bca68579-3a29-46b9-8d6a-17c63e3600ae.jpg", aisle: "Aisle 8" },
  { id: 212, name: "Carolina Jasmine Thai Fragrant Long Grain Rice", size: "", price: "$4.79", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f26b6149-abc8-4b4c-a2de-3b763ce44a54.jpg", aisle: "Aisle 8" },
  { id: 213, name: "Kozy Shack Rice Pudding", size: "", price: "$5.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_094509c2-6e7b-42c2-97b8-764c4f8572d3.png", aisle: "Aisle 8" },
  { id: 214, name: "Minute Rice Instant White Rice, Gluten-Free", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_8a0e2a8f-5429-4413-96b2-015a952ac0e7.jpg", aisle: "Aisle 8" },
  { id: 215, name: "Progresso Savory Chicken & Wild Rice Soup", size: "", price: "$4.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_8d861a5f-4714-4e53-85a7-81a0e2d01fa0.png", aisle: "Aisle 8" },
  { id: 216, name: "Barilla Spaghetti - Non-GMO Pasta Made with Durum Wheat Semolina & Kosher Certified", size: "", price: "$1.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_0308404b-5597-43cf-934b-0ba6536077db.png", aisle: "Aisle 8" },
  { id: 217, name: "Ronzoni Spaghetti, 16 oz, Classic Pasta, Non-GMO, Great Taste", size: "", price: "$1.59", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_81ba2ca5-4edc-48a5-8dcc-d78f63286ab1.png", aisle: "Aisle 8" },
  { id: 218, name: "Stouffer's Spaghetti with Meatballs Frozen Meal", size: "", price: "$4.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_eaed4354-f164-429c-9412-d9662d283db2.jpg", aisle: "Aisle 8" },
  { id: 219, name: "Barilla Thin Spaghetti Pasta", size: "", price: "$1.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_1b85108c-b72c-44fa-895c-31fa1f626295.png", aisle: "Aisle 8" },
  { id: 220, name: "Keebler Cheese & Peanut Butter Sandwich Crackers", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_685b076d-ce0c-4363-b33e-f29f39da979a.jpg", aisle: "Aisle 8" },
  { id: 221, name: "SKIPPY Creamy Peanut Butter, 28 OZ", size: "", price: "$5.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_bf2ed858-1a50-4c27-a95a-4eee798fee8f.jpg", aisle: "Aisle 8" },
  { id: 222, name: "Smucker's Uncrustables Peanut Butter & Strawberry Jam Sandwich", size: "", price: "$4.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_a1d11584-1f1f-4463-8518-15a4543ecd5c.jpg", aisle: "Aisle 8" },
  { id: 223, name: "Keebler Toast and Peanut Butter Sandwich Crackers, Lunch Snacks, 8 Count", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_0ca5280f-1a8b-468c-8174-0c35137c89b2.jpg", aisle: "Aisle 8" },
  { id: 224, name: "Chabaso Bakery Olive Oil Ciabatta", size: "", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_04caa894-7c8e-4303-a4ce-1db70291f86a.jpg", aisle: "Aisle 8" },
  { id: 225, name: "Near East Roasted Garlic & Olive Oil Couscous Mix", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b4bcfd17-f533-4fc7-8050-43ba7d240d68.png", aisle: "Aisle 8" },
  { id: 226, name: "Filippo Berio Extra Virgin Olive Oil", size: "", price: "$15.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_8569ef53-f468-476c-a8a4-e01a62d011d6.png", aisle: "Aisle 8" },
  { id: 227, name: "Full Circle Olive Oil, 100% Extra Virgin", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_7d1464c8-5059-4ee2-9d21-765e08a66dc2.png", aisle: "Aisle 8" },
  { id: 228, name: "Lay's Potato Chips Classic", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_bf236444-ac2f-4a7d-9610-d5c43516e5e7.png", aisle: "Aisle 8" },
  { id: 229, name: "Chips Ahoy! Original Chocolate Chip Cookies", size: "", price: "$5.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_4481ff76-cd9d-422f-bedb-c37ab349368c.jpg", aisle: "Aisle 8" },
  { id: 230, name: "Ruffles Original Potato Chips, Party Size", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_5ac93286-a5c0-416a-b70d-f893ce8a34f0.png", aisle: "Aisle 8" },
  { id: 231, name: "Sun Chips Flavored Whole Grain Snacks, Harvest Cheddar", size: "", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_6feae9f4-080a-4b9f-aa8b-f743b86bdcbb.png", aisle: "Aisle 8" },
  { id: 232, name: "Lay's Wavy Lightly Salted Potato Chips Original 7 1/2 Oz", size: "", price: "$3.79", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_84e2315f-4ab3-4909-991b-9a18d58a5edd.png", aisle: "Aisle 8" },
];
const AISLE = "Aisle 8";

/* ---------- Search grid ---------- */
function cardHTML(p) {
  const showWas = FLAGS.sale && p.was;
  const priceBlock = showWas
    ? `<span class="price price--sale">${p.price}</span><span class="price-was">${p.was}</span>`
    : `<span class="price">${p.price}</span>`;
  return `
    <button class="card" type="button" data-id="${p.id}" aria-label="${p.name}, ${p.price}">
      <span class="listbtn" role="presentation" aria-hidden="true"></span>
      <span class="card-media">
        <img src="${p.img}" alt="${p.name}" />
        ${FLAGS.location ? `<span class="loc-pill">${pinSVG}${p.aisle || AISLE}</span>` : ""}
      </span>
      <span class="price-row">${priceBlock}</span>
      ${FLAGS.coupon && p.offer ? `<span class="offer-pill">${p.offer}</span>` : ""}
      <span class="card-title">${p.name}</span>
      <span class="card-size">${p.size}</span>
      ${FLAGS.coupon && p.clip ? `<span class="clip-btn">${scissorsIcon} Clip offer</span>` : ""}
    </button>`;
}
// Match every whitespace-separated token as a substring of the product name, so
// "pasta sauce" needs both words while "tomato" matches broadly. Empty query
// shows the whole catalog.
function searchProducts(query) {
  const tokens = (query || "").toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return PRODUCTS;
  return PRODUCTS.filter((p) => {
    const hay = (p.name + " " + (p.kw || "")).toLowerCase();
    return tokens.every((t) => hay.includes(t));
  });
}
function renderGrid(query) {
  const grid = document.getElementById("resultsGrid");
  const matches = searchProducts(query);
  if (!matches.length) {
    grid.innerHTML = `<p class="results-empty">No results for “${(query || "").trim()}”. Try “tomatoes”, “avocado”, or “milk”.</p>`;
    return;
  }
  grid.innerHTML = matches.map(cardHTML).join("");
}

/* ---------- PDP ---------- */
let currentMedia = "product";
let currentProduct = PRODUCTS[0];

// Cart location on the store map, as % of the map image. Movable with the arrow
// keys to simulate the cart moving through the store during a demo. Resets to
// CART_HOME each time a PDP opens so every walkthrough starts in the same spot.
const CART_HOME = { x: 56.6, y: 55.4 };
let cartPos = { ...CART_HOME };
const CART_STEP = 2; // % of the map moved per arrow-key press

// "Last meter" navigation: as the cart nears the item, the view auto-advances
// map -> aisle -> shelf, with a distance nudge, so the shopper is handed off to
// the close-up views right when they need them.
// Item position = the pin's LEFT edge (the side the pointer tail points from,
// toward the "8" aisle), not the circle center. The .map-pin circle is 16.6% wide
// centered at left 39.3%, so its left edge is 39.3 - 16.6/2 = 31.0%; y unchanged.
const PIN_TARGET = { x: 31.0, y: 43 };
const MAP_ASPECT = 990 / 658;          // weight x-distance by the map's aspect so "feet" feel physical
const NAV_AISLE_AT = 17;               // aspect-weighted % distance to hand off map -> aisle
const NAV_SHELF_AT = 6;                // ...and aisle -> shelf
let navZone = "far";                   // last zone crossed; lets a manual view choice stick within a zone

function cartDistance() {
  const dx = (cartPos.x - PIN_TARGET.x) * MAP_ASPECT;
  const dy = cartPos.y - PIN_TARGET.y;
  return Math.hypot(dx, dy);
}
function zoneForDistance(d) {
  if (d <= NAV_SHELF_AT) return "arrived";
  if (d <= NAV_AISLE_AT) return "near";
  return "far";
}
function mediaForZone(z) {
  if (!FLAGS.imagery) return "map"; // no aisle/shelf photos to hand off to
  if (z === "arrived") return "shelf";
  if (z === "near") return "aisle";
  return "map";
}
function navToastText(d, z) {
  const feet = Math.max(1, Math.round(d * 1.4));
  if (z === "arrived") return "You're here · Middle shelf";
  if (z === "near") return "Almost there · ~" + feet + " ft";
  return AISLE + " · ~" + feet + " ft away";
}
function updateNavToast() {
  const el = pdpBody.querySelector(".nav-toast");
  if (!el) return;
  const d = cartDistance();
  el.textContent = navToastText(d, zoneForDistance(d));
}
function playStageEnter() {
  const stage = pdpBody.querySelector(".media-stage");
  if (!stage) return;
  stage.classList.add("media-enter");
  stage.addEventListener("animationend", () => stage.classList.remove("media-enter"), { once: true });
}

/* Which media views are available given the current flags. */
function availableMedia() {
  const list = ["product"];
  if (FLAGS.map) list.push("map");
  if (FLAGS.imagery) list.push("aisle", "shelf");
  return list;
}

function mediaStageHTML() {
  const isProduct = currentMedia === "product";
  const isMap = currentMedia === "map";
  // On the store map, overlay an opaque "item" marker (the aisle bubble) that
  // shows the *current* product's jar and springs in on open to draw attention.
  // The base map artwork is clean (no baked pin/beacon); everything below is a
  // CSS overlay. The blue beacon marks the shopping cart's location and is
  // static — only the product pin animates.
  const mapOverlay = isMap ? `
      <div class="map-aisle-bar" aria-hidden="true"></div>
      <div class="map-beacon" style="left:${cartPos.x}%; top:${cartPos.y}%" aria-hidden="true"></div>
      <div class="map-pin" aria-hidden="true">
        <span class="map-pin-tail"></span>
        <span class="map-marker"><img src="${currentProduct.img}" alt="" /></span>
      </div>` : "";
  // Distance nudge shown across the map/aisle/shelf "navigation" views while the
  // shopper walks toward the item (arrow keys). It also cues the auto handoff.
  const isNav = isMap || currentMedia === "aisle" || currentMedia === "shelf";
  const navToast = (isNav && FLAGS.location)
    ? `<div class="nav-toast" aria-hidden="true">${navToastText(cartDistance(), zoneForDistance(cartDistance()))}</div>`
    : "";
  return `<div class="media-stage ${isProduct ? "contain" : ""} ${isMap ? "is-map" : ""}">
      <img src="${isProduct ? heroSrc(currentProduct.img) : IMG[currentMedia]}" alt="${currentMedia} view" />
      ${mapOverlay}
      ${navToast}
      ${!isProduct ? `<button class="media-expand" type="button" aria-label="Expand view">${expandIcon}</button>` : ""}
    </div>`;
}
function thumbRailHTML() {
  const sel = (k) => (currentMedia === k ? 'aria-selected="true"' : 'aria-selected="false"');
  const thumbs = [
    `<button class="thumb thumb--product" role="tab" data-media="product" ${sel("product")} aria-label="Product photo"><img src="${currentProduct.img}" alt="" /></button>`,
  ];
  if (FLAGS.map) thumbs.push(`<button class="thumb thumb--map" role="tab" data-media="map" ${sel("map")} aria-label="Store map">${pinSVG}</button>`);
  if (FLAGS.imagery) {
    thumbs.push(`<button class="thumb" role="tab" data-media="aisle" ${sel("aisle")}>Aisle</button>`);
    thumbs.push(`<button class="thumb" role="tab" data-media="shelf" ${sel("shelf")}>Shelf</button>`);
  }
  // Always keep at least the product thumbnail visible.
  return `<div class="thumb-rail" role="tablist" aria-label="Product views">${thumbs.join("")}</div>`;
}
function pdpHTML() {
  return `
    <div class="pdp-media-col">
      ${mediaStageHTML()}
      ${thumbRailHTML()}
    </div>

    <div class="pdp-info">
      ${FLAGS.location ? `<span class="pdp-loc">${pinSVG}${AISLE} • Middle Shelf</span>` : ""}
      <div class="pdp-title-row">
        <h2 class="pdp-title" id="pdpTitle">${currentProduct.name}</h2>
        <button class="listbtn listbtn--sheet" type="button" aria-label="Add to list" id="pdpListBtn"></button>
      </div>

      ${FLAGS.reviews ? `<div class="rating">
        ${starRow(4.8)}
        <span class="rating-text">${REVIEW_SUMMARY.average} (<a href="#reviewsSection" class="reviews-jump">${REVIEW_SUMMARY.total} reviews</a>)</span>
      </div>` : ""}

      <div class="pdp-price-row">
        <span class="pdp-price ${FLAGS.sale && currentProduct.was ? "pdp-price--sale" : ""}">${currentProduct.price}</span>
        ${FLAGS.sale && currentProduct.was ? `<span class="pdp-was">${currentProduct.was}</span>` : ""}
      </div>
      <div class="pdp-unit">${currentProduct.size}</div>

      <div class="pdp-actions">
        <button class="btn btn--primary" id="addCartBtn">${cartIcon} Add to Cart</button>
        ${FLAGS.location ? `<button class="btn btn--ghost" id="lightBtn">${bulbIcon} Light up in aisle</button>` : ""}
      </div>

      ${FLAGS.coupon ? `<div class="offer-card">
        <span class="offer-tag">Caper exclusive offer</span>
        <div class="offer-main">
          <div class="offer-title">Additional 30% off</div>
          <div class="offer-sub">Expires 3/31/2026.</div>
          <a class="offer-link" href="#">5 eligible items</a>
        </div>
        <button class="clip-offer" type="button">${scissorsIcon} Clip offer</button>
      </div>` : ""}
    </div>

    <div class="pdp-info-full">
      <div class="accordion">
        <button class="acc-head" type="button" aria-expanded="false">
          <span><span class="acc-title">Ingredients</span><span class="acc-note">1 possible allergen</span></span>
          ${chevron}
        </button>
        <div class="acc-panel">Italian tomatoes, olive oil, fresh basil, onions, garlic, salt, black pepper. <strong>Contains:</strong> may be produced in a facility that also processes tree nuts.</div>
      </div>
      <div class="accordion">
        <button class="acc-head" type="button" aria-expanded="true">
          <span class="acc-title">Nutrition</span>
          ${chevron}
        </button>
        <div class="acc-panel acc-panel--nutrition">${nutritionHTML()}</div>
      </div>
    </div>

    ${recSectionsHTML()}
    ${reviewsSectionHTML()}`;
}

/* ---------- Bottom-sheet control ---------- */
const scrim = document.getElementById("pdpScrim");
const sheet = document.getElementById("pdpSheet");
const pdpBody = document.getElementById("pdpBody");
const sheetBody = sheet.querySelector(".sheet-body");

// Reveal the item name in the header once the PDP's own title has scrolled up
// out of the viewport, so the shopper always knows what they're looking at.
function updateSheetTitle() {
  const sheetTitle = document.getElementById("sheetTitle");
  if (!sheetTitle) return;
  sheetTitle.textContent = currentProduct ? currentProduct.name : "";
  const titleEl = pdpBody.querySelector(".pdp-title");
  const headerBottom = sheetBody.getBoundingClientRect().top;
  const show = !!titleEl && titleEl.getBoundingClientRect().bottom <= headerBottom + 4;
  sheetTitle.classList.toggle("is-visible", show);
}
sheetBody.addEventListener("scroll", updateSheetTitle, { passive: true });

// Re-render the sheet body, keeping the current scroll position, and falling
// back to the product view if the active media was just toggled off.
function renderPDP() {
  if (!availableMedia().includes(currentMedia)) currentMedia = "product";
  const body = sheet.querySelector(".sheet-body");
  const st = body ? body.scrollTop : 0;
  pdpBody.innerHTML = pdpHTML();
  if (body) body.scrollTop = st;
  updateSheetTitle();
}

// Products visited within a single sheet session, so the header "Back" button
// can return to the PDP you came from (e.g. after tapping a recommendation).
let pdpHistory = [];
function updateBackBtn() {
  const back = document.getElementById("pdpBack");
  if (back) back.hidden = pdpHistory.length === 0;
}

function openProduct(product) {
  currentProduct = product;
  cartPos = { ...CART_HOME }; // fresh cart position for each walkthrough
  navZone = zoneForDistance(cartDistance()); // sync handoff state to the start spot
  // When the product has location info, open on the store-map view so the
  // aisle marker pops into view; otherwise fall back to the product photo.
  currentMedia = (FLAGS.location && FLAGS.map) ? "map" : "product";
  pdpBody.innerHTML = pdpHTML();
  scrim.hidden = false;
  sheet.hidden = false;
  sheet.querySelector(".sheet-body").scrollTop = 0;
  updateSheetTitle(); // reset: at top, so the header title starts hidden
  // next frame so the transition runs
  requestAnimationFrame(() => {
    scrim.classList.add("open");
    sheet.classList.add("open");
  });
  updateBackBtn();
  // preventScroll: the sheet starts off-screen (translateY 100%); a plain
  // focus() would scroll the container to reveal it — motion behind the sheet.
  document.getElementById("pdpClose").focus({ preventScroll: true });
}
function openPDP(id) {
  pdpHistory = []; // opening from search results starts a fresh trail
  openProduct(PRODUCTS.find((p) => p.id === id) || PRODUCTS[0]);
}
function goBack() {
  if (!pdpHistory.length) return;
  openProduct(pdpHistory.pop());
}
// Reopen the sheet for a tapped recommendation. Rec items are a lighter catalog
// (bare price/was, no size), so normalize them into the shape the PDP expects.
function openRec(key) {
  const it = REC_ITEMS[key];
  if (!it) return;
  pdpHistory.push(currentProduct); // remember where we came from
  openProduct({
    name: it.name,
    size: "16 oz",
    price: "$" + it.price,
    was: it.was ? "$" + it.was : undefined,
    img: it.img,
    onSale: !!it.was,
    offer: it.off || false,
    clip: false,
  });
}
function closePDP() {
  scrim.classList.remove("open");
  sheet.classList.remove("open");
  const done = () => {
    scrim.hidden = true;
    sheet.hidden = true;
    sheet.removeEventListener("transitionend", done);
  };
  sheet.addEventListener("transitionend", done);
}

function switchMedia(key) {
  if (!IMG[key] || key === currentMedia) return;
  currentMedia = key;
  renderPDP();
  playStageEnter(); // "dive into the location" zoom + fade on every view change
}

/* ---------- Events ---------- */
const searchInput = document.getElementById("searchInput");
renderGrid(searchInput.value); // honor the pre-filled query on first paint

// Live-filter the grid as the shopper types (debounced so we don't rebuild the
// DOM on every keystroke).
let searchTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => renderGrid(searchInput.value), 120);
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); renderGrid(searchInput.value); }
});

document.getElementById("resultsGrid").addEventListener("click", (e) => {
  const _card = e.target.closest(".card");
  if (_card) openPDP(Number(_card.dataset.id));
});

document.getElementById("pdpClose").addEventListener("click", closePDP);
document.getElementById("pdpBack").addEventListener("click", goBack);
scrim.addEventListener("click", closePDP);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !sheet.hidden) { closePDP(); return; }

  // Arrow keys drive the cart around the store to simulate walking toward the
  // item. Active across the map/aisle/shelf navigation views (not the product
  // photo) so the shopper can keep approaching after the view hands off.
  if (sheet.hidden || currentMedia === "product") return;
  const moves = {
    ArrowUp:    [0, -CART_STEP],
    ArrowDown:  [0,  CART_STEP],
    ArrowLeft:  [-CART_STEP, 0],
    ArrowRight: [ CART_STEP, 0],
  };
  const d = moves[e.key];
  if (!d) return;
  e.preventDefault();
  cartPos.x = Math.min(95, Math.max(5, cartPos.x + d[0]));
  cartPos.y = Math.min(95, Math.max(5, cartPos.y + d[1]));
  // Move the beacon if it's on screen (map view only)...
  const beacon = pdpBody.querySelector(".map-beacon");
  if (beacon) {
    beacon.style.left = cartPos.x + "%";
    beacon.style.top = cartPos.y + "%";
  }
  updateNavToast(); // ...and keep the distance nudge ticking on every view

  // Proximity handoff: when the cart crosses into a new zone, advance (or fall
  // back) to the matching view. Only fires on a zone change, so a manual view
  // choice sticks while walking within the same zone. Gated by the "Auto view
  // switching" toggle — with it off, the cart still moves and the distance nudge
  // still updates, but the view never auto-switches to aisle/shelf.
  if (FLAGS.autonav) {
    const zone = zoneForDistance(cartDistance());
    if (zone !== navZone) {
      navZone = zone;
      const desired = mediaForZone(zone);
      if (desired !== currentMedia && availableMedia().includes(desired)) {
        switchMedia(desired);
      }
    }
  }
});

pdpBody.addEventListener("click", (e) => {
  const jump = e.target.closest(".reviews-jump");
  if (jump) {
    e.preventDefault();
    const target = document.getElementById("reviewsSection");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const thumb = e.target.closest(".thumb");
  if (thumb) { switchMedia(thumb.dataset.media); return; }

  // "Add to list" on a rec card: quick confirmation, without opening the PDP.
  const recAdd = e.target.closest(".rec-add");
  if (recAdd) {
    recAdd.classList.add("rec-add--done");
    setTimeout(() => recAdd.classList.remove("rec-add--done"), 1200);
    return;
  }

  // Tapping the rec card itself opens that product's PDP.
  const recCard = e.target.closest(".rec-card");
  if (recCard) { openRec(recCard.dataset.rec); return; }

  const acc = e.target.closest(".acc-head");
  if (acc) {
    acc.setAttribute("aria-expanded", acc.getAttribute("aria-expanded") === "true" ? "false" : "true");
    return;
  }

  const addBtn = e.target.closest("#addCartBtn");
  if (addBtn) {
    addBtn.classList.add("btn--added");
    addBtn.innerHTML = `${cartIcon} Added ✓`;
    setTimeout(() => { addBtn.classList.remove("btn--added"); addBtn.innerHTML = `${cartIcon} Add to Cart`; }, 1400);
    return;
  }

  const lightBtn = e.target.closest("#lightBtn");
  if (lightBtn) {
    lightBtn.innerHTML = `${bulbIcon} Lighting up…`;
    setTimeout(() => { lightBtn.innerHTML = `${bulbIcon} Light up in aisle`; }, 1600);
  }
});

// Keyboard activation for the rec cards (role="button"): Enter or Space opens it.
pdpBody.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const recCard = e.target.closest(".rec-card");
  if (!recCard || e.target.closest(".rec-add")) return;
  e.preventDefault();
  openRec(recCard.dataset.rec);
});

document.querySelector(".clear-btn").addEventListener("click", () => {
  const input = document.getElementById("searchInput");
  input.value = "";
  renderGrid(""); // clearing shows the full catalog again
  input.focus();
});

/* ---------- Data-field control panel (outside the device frame) ----------
   Store map + aisle/shelf imagery require location data, so those toggles are
   disabled (and forced off) whenever "Location info" is turned off. Auto view
   switching in turn needs the aisle/shelf imagery to hand off to, so it locks
   (and forces off) whenever "Aisle & shelf imagery" is off. */
const LOCATION_DEPENDENT = ["map", "imagery"];
const IMAGERY_DEPENDENT = ["autonav"];

// Force any dependent toggle off when its prerequisite is off (cascades, since
// imagery is itself location-dependent).
function normalizeFlagDeps() {
  if (!FLAGS.location) LOCATION_DEPENDENT.forEach((k) => (FLAGS[k] = false));
  if (!FLAGS.imagery) IMAGERY_DEPENDENT.forEach((k) => (FLAGS[k] = false));
}

function renderControlPanel() {
  const list = document.getElementById("cpList");
  if (!list) return;
  list.innerHTML = FLAG_CONFIG.map((f) => {
    const locked =
      (LOCATION_DEPENDENT.includes(f.key) && !FLAGS.location) ||
      (IMAGERY_DEPENDENT.includes(f.key) && !FLAGS.imagery);
    return `
    <label class="cp-item ${locked ? "cp-item--locked" : ""}">
      <span class="cp-text">
        <span class="cp-label">${f.label}</span>
        <span class="cp-desc">${f.desc}</span>
      </span>
      <span class="switch">
        <input type="checkbox" data-flag="${f.key}" ${FLAGS[f.key] ? "checked" : ""} ${locked ? "disabled" : ""} />
        <span class="slider"></span>
      </span>
    </label>`;
  }).join("");
}

/* ---------- Scale the fixed 1280x800 device to fit the viewport ---------- */
function fitDevice() {
  const wrap = document.getElementById("deviceWrap");
  const device = document.getElementById("device");
  const panel = document.getElementById("controlPanel");
  if (!wrap || !device) return;

  // Measure the device at natural (unscaled) size.
  device.style.transform = "none";
  const natW = device.offsetWidth;
  const natH = device.offsetHeight;

  const cs = getComputedStyle(document.body);
  const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
  const gap = parseFloat(cs.gap) || 0;

  // The panel sits beside the device on wide viewports and wraps below on narrow.
  const sideBySide = window.innerWidth >= 1181;
  const panelW = panel ? panel.offsetWidth : 0;
  const panelH = panel ? panel.offsetHeight : 0;
  const availW = window.innerWidth - padX - (sideBySide ? gap + panelW : 0);
  const availH = window.innerHeight - padY - (sideBySide ? 0 : gap + panelH);

  const scale = Math.max(0.1, Math.min(availW / natW, availH / natH, 1));
  device.style.transform = `scale(${scale})`;
  wrap.style.width = `${natW * scale}px`;
  wrap.style.height = `${natH * scale}px`;
}
window.addEventListener("resize", fitDevice);
window.addEventListener("load", fitDevice);
fitDevice();

document.getElementById("cpList").addEventListener("change", (e) => {
  const input = e.target.closest("input[data-flag]");
  if (!input) return;
  FLAGS[input.dataset.flag] = input.checked;
  // Turning off a prerequisite cascades to its dependent views.
  normalizeFlagDeps();
  // Re-enabling auto-nav should re-evaluate from the next step, not snap the
  // current view; clearing navZone forces a fresh handoff on the next move.
  if (input.dataset.flag === "autonav" && input.checked) navZone = "";
  renderControlPanel(); // reflect any newly locked/unlocked toggles
  renderGrid(searchInput.value); // keep the current query when cards re-render
  if (!sheet.hidden) renderPDP();
});
renderControlPanel();
