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
  map: "https://raw.githubusercontent.com/shivajaini/caper-pdp-assets/main/storemap-v4.png",
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
  reviews: true,  // ratings & reviews row
  sale: true,     // was-price / discount pricing
  coupon: true,   // Caper exclusive offer + clip offer
  recs: true,     // recommendation sections
};
const FLAG_CONFIG = [
  { key: "location", label: "Location info", desc: "Aisle & shelf labels" },
  { key: "map", label: "Store map", desc: "Map view & thumbnail" },
  { key: "imagery", label: "Aisle & shelf imagery", desc: "In-store photo views" },
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
const section = (title, icon, keys) => ({ title, icon, items: keys.map((k) => REC_ITEMS[k]) });
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
    <div class="rec-card">
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
  { id: 1, name: "Rao's Tomato Basil Sauce", size: "16 oz", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ecdb7b10-9d71-47cc-8d8d-06ae92a4f24b.jpg", onSale: true, offer: "$1 off", clip: true, was: "$14.84" },
  { id: 2, name: "Rao's Marinara Sauce", size: "16 oz", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_88fc4430-a70a-42dd-a7c8-00ec18f4544a.jpg", onSale: true, offer: false, clip: true, was: "$14.84" },
  { id: 3, name: "Rao's Vodka Sauce", size: "16 oz", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_c4a74779-19dc-4004-9232-ce76ff20abc1.jpg", onSale: true, offer: false, clip: false, was: "$14.84" },
  { id: 4, name: "Rao's Arrabbiata Spicy Marinara Sauce", size: "16 oz", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_35157cef-1323-4f57-8c00-d5dc399a995b.jpg", onSale: true, offer: false, clip: false, was: "$14.84" },
  { id: 5, name: "Rao's Sensitive Formula Marinara Sauce", size: "16 oz", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_d0cad3ea-92e5-47be-a5d5-0fa45eb08b34.jpg", onSale: false, offer: false, clip: false },
  { id: 6, name: "Classico Tomato & Basil Pasta Sauce", size: "16 oz", price: "$4.79", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_11d31308-fc1e-4e59-8a96-070bccfcc193.jpg", onSale: true, offer: "$1 off", clip: true, was: "$6.47" },
  { id: 7, name: "Prego Traditional Pasta Sauce", size: "16 oz", price: "$4.19", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_9f1a8f11-9d1f-497b-9950-5b3aca19bc8e.jpg", onSale: false, offer: false, clip: false },
  { id: 8, name: "Bertolli Traditional Marinara Sauce", size: "24 oz", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_bb437336-0470-44ee-a158-6af58dfa9e6f.jpg", onSale: true, offer: false, clip: false, was: "$6.74" },
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
        ${FLAGS.location ? `<span class="loc-pill">${pinSVG}${AISLE}</span>` : ""}
      </span>
      <span class="price-row">${priceBlock}</span>
      ${FLAGS.coupon && p.offer ? `<span class="offer-pill">${p.offer}</span>` : ""}
      <span class="card-title">${p.name}</span>
      <span class="card-size">${p.size}</span>
      ${FLAGS.coupon && p.clip ? `<span class="clip-btn">${scissorsIcon} Clip offer</span>` : ""}
    </button>`;
}
function renderGrid() {
  document.getElementById("resultsGrid").innerHTML = PRODUCTS.map(cardHTML).join("");
}

/* ---------- PDP ---------- */
let currentMedia = "product";
let currentProduct = PRODUCTS[0];

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
  // shows the *current* product's jar, pops in on open, and blinks slowly to
  // draw attention. It sits over the baked-in bubble in the map artwork; the
  // blue beacon in the artwork is the shopping cart's location and stays put.
  const mapOverlay = isMap ? `
      <div class="map-aisle-bar" aria-hidden="true"></div>
      <div class="map-pin" aria-hidden="true">
        <span class="map-pin-tail"></span>
        <span class="map-marker"><img src="${currentProduct.img}" alt="" /></span>
      </div>` : "";
  return `<div class="media-stage ${isProduct ? "contain" : ""} ${isMap ? "is-map" : ""}">
      <img src="${isProduct ? heroSrc(currentProduct.img) : IMG[currentMedia]}" alt="${currentMedia} view" />
      ${mapOverlay}
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

// Re-render the sheet body, keeping the current scroll position, and falling
// back to the product view if the active media was just toggled off.
function renderPDP() {
  if (!availableMedia().includes(currentMedia)) currentMedia = "product";
  const body = sheet.querySelector(".sheet-body");
  const st = body ? body.scrollTop : 0;
  pdpBody.innerHTML = pdpHTML();
  if (body) body.scrollTop = st;
}

function openPDP(id) {
  currentProduct = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  // When the product has location info, open on the store-map view so the
  // aisle marker pops into view; otherwise fall back to the product photo.
  currentMedia = (FLAGS.location && FLAGS.map) ? "map" : "product";
  pdpBody.innerHTML = pdpHTML();
  scrim.hidden = false;
  sheet.hidden = false;
  sheet.querySelector(".sheet-body").scrollTop = 0;
  // next frame so the transition runs
  requestAnimationFrame(() => {
    scrim.classList.add("open");
    sheet.classList.add("open");
  });
  // preventScroll: the sheet starts off-screen (translateY 100%); a plain
  // focus() would scroll the container to reveal it — motion behind the sheet.
  document.getElementById("pdpClose").focus({ preventScroll: true });
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
}

/* ---------- Events ---------- */
renderGrid();

document.getElementById("resultsGrid").addEventListener("click", (e) => {
  const _card = e.target.closest(".card");
  if (_card) openPDP(Number(_card.dataset.id));
});

document.getElementById("pdpClose").addEventListener("click", closePDP);
scrim.addEventListener("click", closePDP);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !sheet.hidden) closePDP();
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

document.querySelector(".clear-btn").addEventListener("click", () => {
  const input = document.getElementById("searchInput");
  input.value = "";
  input.focus();
});

/* ---------- Data-field control panel (outside the device frame) ----------
   Store map + aisle/shelf imagery require location data, so those toggles are
   disabled (and forced off) whenever "Location info" is turned off. */
const LOCATION_DEPENDENT = ["map", "imagery"];

function renderControlPanel() {
  const list = document.getElementById("cpList");
  if (!list) return;
  list.innerHTML = FLAG_CONFIG.map((f) => {
    const locked = LOCATION_DEPENDENT.includes(f.key) && !FLAGS.location;
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
  // Turning off location cascades to its dependent views.
  if (input.dataset.flag === "location" && !input.checked) {
    LOCATION_DEPENDENT.forEach((k) => (FLAGS[k] = false));
  }
  renderControlPanel(); // reflect any newly locked/unlocked toggles
  renderGrid();
  if (!sheet.hidden) renderPDP();
});
renderControlPanel();
