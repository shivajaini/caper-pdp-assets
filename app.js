/* ============================================================
   Store Search + Product Detail (tablet) prototype
   Real Figma assets live in ./assets/
   ============================================================ */

/* ---------- Icons ---------- */
const pinSVG = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>`;
const mapIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>`;
const cartIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.4a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L22 7H6"/></svg>`;
const bulbIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-4 12.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3A7 7 0 0 0 12 2zm-2 19a2 2 0 0 0 4 0h-4z"/></svg>`;
// viewBox padded (-2 -2 28 28) so the blade tips have margin and don't read as
// cropped on the right when the icon is placed in a tight box.
// Scissors ("cut") icon. Blades spread to the corners so it reads as open
// scissors, and the padded viewBox keeps a clear margin on every side.
const scissorsIcon = `<svg viewBox="-2 -2 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88"/><path d="M14.47 14.48 20 20"/><path d="M8.12 8.12 12 12"/></svg>`;
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
  location: true, // aisle/shelf labels + loc pills (also gates "Light up in aisle")
  map: true,      // store-map view & thumbnail
  imagery: true,  // aisle & shelf in-store photo views + thumbnails
  autonav: true,  // distance-based auto handoff map -> aisle -> shelf
  reviews: true,  // ratings & reviews row
  sale: true,     // was-price / discount pricing
  coupon: true,   // Caper exclusive offer + clip offer
  recs: true,     // recommendation sections
  cart: true,     // primary CTA is "Add to Cart"; off -> "Add to list" (hides inline list btn)
  lightup: false, // secondary CTA is "Light up in aisle"; off (default) -> "Add to list"
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
  { key: "cart", label: "Add to Cart CTA", desc: "Off switches primary to Add to list" },
  { key: "lightup", label: "Light up in aisle", desc: "Off makes Add to list the secondary button" },
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

// Items eligible for the "Caper exclusive offer" — shown inline as a carousel
// that the offer's "N eligible items" link scrolls to.
const ELIGIBLE_KEYS = ["classico-four-cheese", "ragu-chunky", "barilla-marinara", "barilla-spaghetti", "ronzoni-spaghetti", "kraft-parmesan"];
const ELIGIBLE_OFFER = "30% off"; // same offer applied to every eligible item
function eligibleSectionHTML() {
  if (!FLAGS.coupon) return "";
  // Every eligible item carries the same offer: 30% off its regular price, shown
  // as a discounted price with the original struck through and a "30% off" badge.
  const items = ELIGIBLE_KEYS.map((k) => {
    const base = REC_ITEMS[k];
    const regular = parseFloat(base.price);
    return {
      key: k,
      ...base,
      price: (regular * 0.7).toFixed(2),
      was: regular.toFixed(2),
      off: ELIGIBLE_OFFER,
    };
  });
  return `
    <div class="rec-section rec-section--eligible" id="eligibleSection">
      <div class="rec-head">${couponIcon} Eligible items <span class="rec-head-note">Additional 30% off · ${items.length} items</span>
        <button class="clip-offer rec-head-clip" type="button">${scissorsIcon} Clip offer</button>
      </div>
      <div class="rec-row">${items.map(recCardHTML).join("")}</div>
    </div>`;
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
  { id: 233, name: "Goya Capers", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_85762d9c-3f8d-485d-8ae2-402626514fb0.png", aisle: "Aisle 8", kw: "capers" },
  { id: 234, name: "Reese's Salted Capers", size: "", price: "$4.59", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e0a6c4d5-b5ea-40cf-8c5a-755226a53ef9.png", aisle: "Aisle 8", kw: "capers" },
  { id: 235, name: "Reese's Non Pareil Capers", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_a070b335-9b0b-4804-8842-5a50320e1c98.png", aisle: "Aisle 8", kw: "capers" },
  { id: 236, name: "Goya Olives, Manzanilla, Pimientos & Capers, Alcaparrado", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_65dc4e17-36b1-4110-b662-d10167cdc372.png", aisle: "Aisle 8", kw: "capers" },
  { id: 237, name: "Pastene Non-Pareil Capers", size: "", price: "$4.59", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_69d17c7d-7d45-419c-b373-0d5dd85f505d.jpg", aisle: "Aisle 8", kw: "capers" },
  { id: 238, name: "Food Club Large Ripe Pitted Olives", size: "", price: "$2.59", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_df596c88-5ed3-4ddf-920b-0868550fa48d.png", aisle: "Aisle 8", kw: "olives" },
  { id: 239, name: "Mezzetta Pitted Greek Kalamata Olives", size: "", price: "$6.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f152ebb7-16c0-421f-a74a-6676a5ac4eb4.jpg", aisle: "Aisle 8", kw: "olives" },
  { id: 240, name: "DeLallo Pitted Olives Jubilee", size: "", price: "$8.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_0933b563-653a-4fe6-8e99-077e539a50f3.png", aisle: "Aisle 8", kw: "olives" },
  { id: 241, name: "Food Club Manzanilla Olives Pimiento Stuffed", size: "", price: "$2.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_8f96328c-804e-4e37-b019-84433a303e31.png", aisle: "Aisle 8", kw: "olives" },
  { id: 242, name: "Lindsay Olives, Black Ripe Pitted, Medium", size: "", price: "$2.50", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_a92fb5aa-7827-4056-ba40-9faddb164610.png", aisle: "Aisle 8", kw: "olives" },
  { id: 243, name: "Pearls Kalamata Pitted Greek Olives", size: "", price: "$4.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_4d9dd57d-6c44-440a-916b-dfb22a859e87.jpg", aisle: "Aisle 8", kw: "olives" },
  { id: 244, name: "Botticelli Vinegar, of Modena, Balsamic", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_6798fcf2-c1b5-41e9-8b6d-b0b5d18359ec.png", aisle: "Aisle 8", kw: "vinegar balsamic" },
  { id: 245, name: "Bertolli Sauce, Balsamic Vinegar & Caramelized Onions", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b7d11d1e-bb38-4aea-bc6b-18d64e919061.png", aisle: "Aisle 8", kw: "vinegar balsamic" },
  { id: 246, name: "Colavita Balsamic Vinegar of Modena IGP", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f1fbf8c0-0fc9-4717-be0e-ea77062f1525.jpg", aisle: "Aisle 8", kw: "vinegar balsamic" },
  { id: 247, name: "Monari Federzoni Balsamic Vinegar of Modena", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_380236df-66c2-4088-a323-2c69a1d442ac.png", aisle: "Aisle 8", kw: "vinegar balsamic" },
  { id: 248, name: "Regina Red Wine Vinegar", size: "", price: "$3.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_1f9e8b74-6dd7-44d9-9683-f52179615317.png", aisle: "Aisle 8", kw: "vinegar" },
  { id: 249, name: "Heinz Red Wine Vinegar", size: "", price: "$5.89", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ee4bfb2b-acd9-4c77-9576-d7343ce85dc6.jpg", aisle: "Aisle 8", kw: "vinegar" },
  { id: 250, name: "Progresso Italian Style Bread Crumbs", size: "", price: "$2.33", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ae966a10-0857-4870-8a06-744917d90371.png", aisle: "Aisle 8", kw: "breadcrumbs" },
  { id: 251, name: "Progresso Plain Style Bread Crumbs", size: "", price: "$2.33", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_099e4ef3-7432-4677-b8f7-7ee4822127bf.png", aisle: "Aisle 8", kw: "breadcrumbs" },
  { id: 252, name: "Progresso Quality Foods Plain Breadcrumbs", size: "", price: "$4.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3f79a82a-f095-44c7-b14d-3a7ab13a72fc.png", aisle: "Aisle 8", kw: "breadcrumbs" },
  { id: 253, name: "4C Foods Bread Crumbs, Seasoned", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_95572fe7-cf68-4786-9978-b01f3c863978.png", aisle: "Aisle 8", kw: "breadcrumbs" },
  { id: 254, name: "4C Foods Bread Crumbs, Seasoned, Panko", size: "", price: "$3.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3a1b2e16-c536-45f8-9d47-3826bbd0e9f5.png", aisle: "Aisle 8", kw: "breadcrumbs" },
  { id: 255, name: "Alexia Onion Rings, with Panko Breading & Sea Salt, Crispy", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_c6ff26dd-0d45-4bff-9cc3-ab362f383723.png", aisle: "Aisle 8", kw: "breadcrumbs" },
  { id: 256, name: "BelGioioso Freshly Shredded Cheese, Parmesan", size: "", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_359e64b5-4237-49c4-8129-19f650f3515f.png", aisle: "Dairy", kw: "parmesan cheese" },
  { id: 257, name: "Food Club Cheese, Parmesan, Grated", size: "", price: "$3.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_98de8669-f0f9-47ff-8cd4-be49cae5c67b.png", aisle: "Dairy", kw: "parmesan cheese" },
  { id: 258, name: "Chicken Parmesan", size: "", price: "$12.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_6b276deb-7cd7-43d5-a584-7652f14d2357.png", aisle: "Dairy", kw: "parmesan cheese" },
  { id: 259, name: "Rao's Chicken Parmesan", size: "", price: "$3.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_52882ac3-6963-48b1-9b20-4e2b2c2c8cfc.jpg", aisle: "Dairy", kw: "parmesan cheese" },
  { id: 260, name: "Knorr Rice Sides Garlic Parmesan", size: "", price: "$1.33", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3173c4aa-6713-485e-a81c-dfe92d77493f.jpg", aisle: "Dairy", kw: "parmesan cheese" },
  { id: 261, name: "Food Club Parmesan & Romano Grated Cheese", size: "", price: "$3.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b95d38ff-0398-4ba5-bec6-8dff82c7a58b.png", aisle: "Dairy", kw: "parmesan cheese" },
  { id: 262, name: "Tuttorosso Basil, Garlic & Oregano Diced Tomatoes", size: "", price: "$1.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_8577a36c-056c-49d2-94f0-3e7b48a00fff.jpg", aisle: "Aisle 8", kw: "canned tomatoes" },
  { id: 263, name: "Ragu Chunky Sauteed Onion and Garlic Pasta Sauce with Diced Tomatoes, 24 oz", size: "", price: "$3.69", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_ac0af865-2d84-4076-a732-a9bbb5e3422a.jpg", aisle: "Aisle 8", kw: "canned tomatoes" },
  { id: 264, name: "Food Club Petite Diced Tomatoes In Juice", size: "", price: "$1.59", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_6c746448-fd94-4981-ad7e-247fe9d6de0d.png", aisle: "Aisle 8", kw: "canned tomatoes" },
  { id: 265, name: "Redpack Petite Diced Tomatoes", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_51027400-c139-4f4f-811d-0f333cff78fb.jpg", aisle: "Aisle 8", kw: "canned tomatoes" },
  { id: 266, name: "Colavita Crushed Tomatoes", size: "", price: "$2.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_6d0ac6ea-3e2b-450c-a12d-c6f8fa62bca8.jpg", aisle: "Aisle 8", kw: "canned tomatoes" },
  { id: 267, name: "Tuttorosso No Salt Added Crushed Tomatoes with Basil", size: "", price: "$1.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_aa9882a1-733d-49c1-b68d-bf33d8579b3d.png", aisle: "Aisle 8", kw: "canned tomatoes" },
  { id: 268, name: "Redpack Crushed Tomatoes in Puree", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_5528f21f-94a9-4d68-b4b6-23dc90e19b7d.jpg", aisle: "Aisle 8", kw: "canned tomatoes" },
  { id: 269, name: "Redpack Whole Peeled Plum Tomatoes in Puree", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_d9d03e26-1d87-4f71-8706-02f2e3f63778.jpg", aisle: "Aisle 8", kw: "canned tomatoes" },
  { id: 270, name: "Muir Glen Organic Whole Peeled Tomatoes", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_40203efc-76de-4a46-b935-b967539ce88c.png", aisle: "Aisle 8", kw: "canned tomatoes" },
  { id: 271, name: "Tostitos Chunky Salsa, Mild", size: "", price: "$4.09", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_87adaf99-2595-4990-aca1-5918062a68d2.png", aisle: "Aisle 8", kw: "salsa" },
  { id: 272, name: "Chi-Chi's Thick & Chunky Salsa Medium", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_222cb420-ea9a-4303-9e51-90e17d9b47a4.jpg", aisle: "Aisle 8", kw: "salsa" },
  { id: 273, name: "Tostitos Mild Chunky Salsa Dip", size: "", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f47543cc-c94d-43f5-a4d1-3d7fa90e4d6d.png", aisle: "Aisle 8", kw: "salsa" },
  { id: 274, name: "Tostitos Chunky Salsa, Medium", size: "", price: "$4.09", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_83b089ef-b0eb-4fae-a5a8-12da08443691.png", aisle: "Aisle 8", kw: "salsa" },
  { id: 275, name: "Tostitos Restaurant Style Salsa, Medium", size: "", price: "$4.09", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_6433326c-edc5-47ea-93d7-01a63209f389.png", aisle: "Aisle 8", kw: "salsa" },
  { id: 276, name: "Sun Chips Flavored Whole Grain Snacks, Garden Salsa", size: "", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_4a4396ae-7199-496d-a73f-a74746077e20.png", aisle: "Aisle 8", kw: "salsa" },
  { id: 277, name: "Mrs. Renfro's Salsa, Peach, Mild", size: "", price: "$5.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_be6a6284-2b91-43ae-9687-2e8c6afed822.png", aisle: "Aisle 8", kw: "salsa" },
  { id: 278, name: "Heinz Tomato Ketchup", size: "", price: "$5.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e6117fd5-08b4-493d-983f-93a4f10a2602.jpg", aisle: "Aisle 8", kw: "ketchup" },
  { id: 279, name: "Full Circle Ketchup, Tomato", size: "", price: "$2.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_d65b7099-2cc9-4b59-af17-cba89d92d4cc.png", aisle: "Aisle 8", kw: "ketchup" },
  { id: 280, name: "Heinz Organic Tomato Ketchup", size: "", price: "$6.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_b976007b-1a23-4709-abfc-c1115f3a4f93.jpg", aisle: "Aisle 8", kw: "ketchup" },
  { id: 281, name: "SIMPLY HEINZ Simply Tomato Ketchup with No Artificial Sweeteners", size: "", price: "$5.79", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_79594b8b-872e-43a7-bc34-89a32625cddb.jpg", aisle: "Aisle 8", kw: "ketchup" },
  { id: 282, name: "Ronzoni Penne Rigate, 16 oz, Ridged Non-GMO Pasta for Chunky Sauces", size: "", price: "$1.59", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_07581ab1-460f-4a17-b958-3ffa9832c6fd.png", aisle: "Aisle 8", kw: "penne pasta" },
  { id: 283, name: "Barilla Penne - Non-GMO Pasta Made with Durum Wheat Semolina & Kosher Certified", size: "", price: "$1.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_a135a200-f506-4c0a-877e-042f9a995b6c.png", aisle: "Aisle 8", kw: "penne pasta" },
  { id: 284, name: "Barilla Protein+ (Plus) Penne Pasta - Plant Based Pasta - Made from Lentils, Chickpeas & Peas", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f864952e-9f3a-4a72-8a46-ee172da93fb3.png", aisle: "Aisle 8", kw: "penne pasta" },
  { id: 285, name: "Bertolli Chicken Parmigiana & Penne, Frozen Meal", size: "", price: "$11.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_075b09a3-2d28-4fd1-80aa-fe5655c3dfed.jpg", aisle: "Aisle 8", kw: "penne pasta" },
  { id: 286, name: "Rustichella D'abruzzo Bronze Dies Penne Rigate", size: "", price: "$7.29", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_72381a75-01f1-4ff3-a549-a35562067aaf.png", aisle: "Aisle 8", kw: "penne pasta" },
  { id: 287, name: "Stouffer's Rigatoni with Chicken & Pesto", size: "", price: "$4.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3d60dae7-7da3-4fbc-ac60-208c6efbb9c8.jpg", aisle: "Aisle 8", kw: "pasta" },
  { id: 288, name: "Pasta Zara Rigatoni", size: "", price: "$1.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3046ee1e-2fe2-471f-8c55-0b1d2143a296.png", aisle: "Aisle 8", kw: "pasta" },
  { id: 289, name: "Rao's Marinara Sauce", size: "", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_88fc4430-a70a-42dd-a7c8-00ec18f4544a.jpg", aisle: "Aisle 8", kw: "pasta sauce" },
  { id: 290, name: "Bertolli Traditional Marinara Sauce with Italian Herbs and Fresh Garlic, Made with Vine-Ripened Tomatoes, 24 oz", size: "", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_bb437336-0470-44ee-a158-6af58dfa9e6f.jpg", aisle: "Aisle 8", kw: "pasta sauce" },
  { id: 291, name: "Francesco Rinaldi Marinara Sauce", size: "", price: "$3.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_3ac8e52c-c9d0-40cf-99ee-1a577b5c307e.png", aisle: "Aisle 8", kw: "pasta sauce" },
  { id: 292, name: "Rao's Sensitive Formula Marinara Sauce", size: "", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_d0cad3ea-92e5-47be-a5d5-0fa45eb08b34.jpg", aisle: "Aisle 8", kw: "pasta sauce" },
  { id: 293, name: "Filippo Berio Extra Virgin Olive Oil", size: "", price: "$15.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_8569ef53-f468-476c-a8a4-e01a62d011d6.png", aisle: "Aisle 8", kw: "olive oil" },
  { id: 294, name: "Full Circle Olive Oil, 100% Extra Virgin", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_7d1464c8-5059-4ee2-9d21-765e08a66dc2.png", aisle: "Aisle 8", kw: "olive oil" },
  { id: 295, name: "Food Club Olive Oil, Extra Virgin", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_79e61f0c-3e8d-450a-8251-2ce813c9297a.png", aisle: "Aisle 8", kw: "olive oil" },
  { id: 296, name: "Graza Drizzle, Extra Virgin Olive Oil for Finishing", size: "", price: "$19.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_780195c6-4539-4545-b949-4bddc06c8cc8.jpg", aisle: "Aisle 8", kw: "olive oil" },
  { id: 297, name: "Maxwell House French Roast Dark Roast Ground Coffee", size: "", price: "$11.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_2de89eaf-5cee-40a9-bdc9-c3b224f942f6.jpg", aisle: "Beverages", kw: "coffee" },
  { id: 298, name: "Cafe Caribe Dark Roast Espresso Coffee, Brick Pack", size: "", price: "$4.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_a6fc7d5e-162d-4912-8cd1-8007895c50eb.png", aisle: "Beverages", kw: "coffee" },
  { id: 299, name: "Starbucks French Roast Dark Roast Ground Coffee", size: "", price: "$16.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e8ad472c-c998-4747-8ac3-6c3131a1de78.jpg", aisle: "Beverages", kw: "coffee" },
  { id: 300, name: "MARTINSON Coffee, Ground, Dark Roast, Battery Park, Capsules", size: "", price: "$10.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_f1a8de51-e1d1-472c-a276-132e9677c70c.png", aisle: "Beverages", kw: "coffee" },
  { id: 301, name: "Kodiak Granola Bars, Peanut Butter, Crunchy", size: "", price: "$5.49", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_276a81fd-a608-4fff-94c1-0585dad70e9d.png", aisle: "Aisle 8", kw: "peanut butter" },
  { id: 302, name: "Nature Valley Peanut Butter Crunchy Granola Bars", size: "", price: "$4.39", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_e8860733-1bf1-4274-af73-a2d3afcdeec4.png", aisle: "Aisle 8", kw: "peanut butter" },
  { id: 303, name: "SNICKERS Crunchy Peanut Butter Squared Fun Size Chocolate Candy Bars", size: "", price: "$4.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_00ba2593-6870-4cee-b477-54284699e56d.jpg", aisle: "Aisle 8", kw: "peanut butter" },
  { id: 304, name: "Horizon Organic 2% Reduced Fat Milk, 128 fl oz Gallon Jug", size: "", price: "$13.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_84a76279-ce3f-4324-957c-6047b94d8324.jpg", aisle: "Dairy", kw: "milk" },
  { id: 305, name: "Horizon Organic Lactose-Free 2% Reduced Fat Milk", size: "", price: "$6.99", img: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/thumb_a7192154-017e-4f78-9cb3-b3ce97dba50f.jpg", aisle: "Dairy", kw: "milk" },
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
  // With only the hero image left (e.g. location info off -> no map/aisle/shelf),
  // there's nothing to switch between, so drop the thumbnail tray entirely.
  if (availableMedia().length <= 1) return "";
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
        ${FLAGS.cart && FLAGS.lightup ? `<button class="listbtn listbtn--sheet" type="button" aria-label="Add to list" id="pdpListBtn"></button>` : ""}
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
        <button class="btn btn--primary" id="addCartBtn">${FLAGS.cart ? `${cartIcon} Add to Cart` : `${listAddIcon} Add to list`}</button>
        ${FLAGS.lightup
          ? `<button class="btn btn--ghost" id="lightBtn">${bulbIcon} Light up in aisle</button>`
          : FLAGS.cart
            ? `<button class="btn btn--ghost" id="addListBtn">${listAddIcon} Add to list</button>`
            : ""}
      </div>

      ${FLAGS.coupon ? `<div class="offer-card">
        <span class="offer-tag">Caper exclusive offer</span>
        <div class="offer-main">
          <div class="offer-title">Additional 30% off</div>
          <div class="offer-sub">Expires 3/31/2026.</div>
          <a class="offer-link" href="#eligibleSection">${ELIGIBLE_KEYS.length} eligible items</a>
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

    ${eligibleSectionHTML()}
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
  if (!back) return;
  // Full-screen fork: the PDP is a peer of search results, so Back is always
  // available — it steps down to the previous product (rec history) or, at the
  // first product, back to the screen the PDP was opened from.
  // Sheet fork: Back only appears while navigating between recommendations.
  back.hidden = PDP_FULL ? false : (pdpHistory.length === 0);
}

// Full-screen fork: the PDP is a peer screen. When it opens fresh, it displaces
// the screen it came from; on close we restore that screen. (Sheet fork keeps
// the PDP as an overlay above the current screen.)
let PDP_FULL = false;
let pdpReturnScreen = null;

function openProduct(product) {
  const wasClosed = sheet.hidden; // fresh open vs. navigating rec->rec inside the PDP
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

  // Full-screen fork: displace the originating screen. Keep it visible for the
  // cross-fade, then hide it once the PDP has faded in so the two are peers.
  if (PDP_FULL && wasClosed) {
    pdpReturnScreen = visibleScreenEl();
    setTimeout(() => { if (!sheet.hidden && pdpReturnScreen) pdpReturnScreen.hidden = true; }, 340);
  }
}
function openPDP(id) {
  pdpHistory = []; // opening from search results starts a fresh trail
  openProduct(PRODUCTS.find((p) => p.id === id) || PRODUCTS[0]);
}
function goBack() {
  // Step back through recommendation history first...
  if (pdpHistory.length) { openProduct(pdpHistory.pop()); return; }
  // ...then, in the full-screen fork, Back from the first product returns to the
  // screen the PDP was opened from (e.g. search results).
  if (PDP_FULL) closePDP();
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
// closePDP() returns to the screen the PDP was opened from (Back behavior).
// closePDP({ toHome: true }) exits the whole search flow to Home (X behavior).
function closePDP(opts) {
  const toHome = !!(opts && opts.toHome);
  if (PDP_FULL) {
    if (toHome) {
      showScreen("home");          // exit to Home, revealed as the PDP fades out
      pdpReturnScreen = null;
    } else if (pdpReturnScreen) {
      pdpReturnScreen.hidden = false; // reveal the originating screen (e.g. results)
      pdpReturnScreen = null;
    }
  }
  scrim.classList.remove("open");
  sheet.classList.remove("open");
  let done = () => {
    if (!done) return;
    done = null;
    scrim.hidden = true;
    sheet.hidden = true;
  };
  sheet.addEventListener("transitionend", () => done && done(), { once: true });
  // Fallback: guarantee the sheet hides even if transitionend never fires
  // (prefers-reduced-motion, or an interrupted transition).
  setTimeout(() => done && done(), 420);
}

function switchMedia(key) {
  if (!IMG[key] || key === currentMedia) return;
  currentMedia = key;
  renderPDP();
  playStageEnter(); // "dive into the location" zoom + fade on every view change
}

/* ============================================================
   Home screen + Search landing — the two screens shown BEFORE
   search results. Flow:
     Home --tap search bar--> Search landing (popular + keyboard)
          --tap popular / type + Search--> Search results (existing)
          --tap card--> PDP (existing)
   ============================================================ */
const CDN = "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/";
// "Fresh Grocery" wordmark, inlined so it renders everywhere (raw.githubusercontent
// serves SVG as text/plain, which browsers ORB-block when loaded via <img>).
const FRESH_LOGO_SVG = `<svg viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.288216 16.8343L2.27389 16.4401V2.70716L0.288216 2.31291V0H15.136V5.24347H12.2663L12.0998 2.95685H6.01466V8.2266H12.5482V11.1834H6.01466V16.4401L8.01315 16.8343V19.1341H0.288216V16.8343ZM16.5207 16.8371L18.3142 16.4429V7.62489L16.3286 7.23064V4.91773H21.7988L21.9653 6.99409C22.2899 6.25817 22.7083 5.68432 23.2208 5.27255C23.7332 4.86078 24.3268 4.6549 25.0015 4.6549C25.1979 4.6549 25.405 4.67023 25.6228 4.7009C25.8406 4.73156 26.0221 4.76879 26.1673 4.8126L25.7701 8.30825L24.2328 8.26882C23.6862 8.26882 23.2336 8.37834 22.8749 8.59736C22.5162 8.81639 22.2429 9.1274 22.055 9.53041V16.4429L23.8485 16.8371V19.1369H16.5207V16.8371ZM33.6753 19.4055C31.6768 19.4055 30.0797 18.7484 28.884 17.4343C27.6883 16.1201 27.0905 14.4511 27.0905 12.4273V11.9017C27.0905 9.79026 27.6563 8.05121 28.7879 6.68448C29.9195 5.31776 31.4376 4.63878 33.3422 4.64754C35.2126 4.64754 36.6644 5.22577 37.6979 6.38223C38.7313 7.53869 39.248 9.10252 39.248 11.0738V13.1633H30.9722L30.9465 13.2421C31.0149 14.1795 31.3202 14.9505 31.8625 15.555C32.4048 16.1595 33.1415 16.4618 34.0724 16.4618C34.9008 16.4618 35.5883 16.3764 36.1349 16.2055C36.6815 16.0347 37.2794 15.7653 37.9284 15.3973L38.9405 17.7628C38.3683 18.2271 37.6274 18.617 36.7178 18.9324C35.8082 19.2478 34.7941 19.4055 33.6753 19.4055ZM33.3402 7.6106C32.6484 7.6106 32.1018 7.88219 31.7004 8.42538C31.299 8.96856 31.0513 9.68258 30.9574 10.5674L30.9958 10.6332H35.5821V10.2915C35.5821 9.4767 35.3963 8.8262 35.0248 8.33996C34.6533 7.85372 34.0918 7.6106 33.3402 7.6106ZM52.3315 9.8026H49.8206L49.4235 8.02849C49.1673 7.81822 48.8448 7.64301 48.4563 7.50283C48.0677 7.36265 47.6385 7.29256 47.1688 7.29256C46.5111 7.29256 45.9902 7.44369 45.6058 7.74595C45.2215 8.0482 45.0294 8.42711 45.0294 8.88269C45.0294 9.31198 45.213 9.66899 45.5802 9.95373C45.9475 10.2385 46.6819 10.4903 47.7837 10.7094C49.5003 11.0598 50.7729 11.5745 51.6013 12.2535C52.4297 12.9325 52.844 13.8677 52.844 15.0592C52.844 16.3383 52.308 17.3831 51.2362 18.1935C50.1644 19.0039 48.753 19.4091 47.0022 19.4091C45.9346 19.4091 44.9546 19.2492 44.0621 18.9294C43.1696 18.6096 42.3775 18.1519 41.6857 17.5561L41.6473 14.3627H44.2607L44.7731 16.2157C44.9952 16.4084 45.2984 16.5508 45.6827 16.6428C46.067 16.7348 46.4684 16.7808 46.8869 16.7808C47.647 16.7808 48.2257 16.6406 48.6228 16.3602C49.0199 16.0799 49.2185 15.6988 49.2185 15.2169C49.2185 14.7964 49.0178 14.4328 48.6164 14.1262C48.215 13.8195 47.4762 13.5479 46.4001 13.3114C44.7689 12.9697 43.5369 12.4638 42.7042 11.7935C41.8715 11.1233 41.4551 10.21 41.4551 9.05353C41.4551 7.86202 41.9334 6.8348 42.8899 5.97184C43.8465 5.10887 45.2087 4.6774 46.9766 4.6774C48.0527 4.6774 49.0712 4.82633 50.032 5.12421C50.9928 5.42209 51.7465 5.80319 52.2931 6.26752L52.3315 9.8026ZM54.3195 16.8312L56.1259 16.437V3.19347L54.1274 1.87116V0.486312H59.8538V6.72537C60.2894 6.06829 60.8232 5.55796 61.4552 5.19438C62.0872 4.8308 62.7875 4.64901 63.5562 4.64901C65.0081 4.64901 66.1461 5.14181 66.9702 6.12743C67.7944 7.11305 68.2065 8.63526 68.2065 10.6941V16.437L70 16.8312V19.131H62.8516V16.8312L64.4657 16.437V10.6678C64.4657 9.56394 64.2757 8.78202 63.8956 8.32207C63.5156 7.86211 62.9498 7.63214 62.1982 7.63214C61.6772 7.63214 61.2224 7.72851 60.8339 7.92125C60.4453 8.11399 60.1186 8.38558 59.8538 8.73602V16.437L61.468 16.8312V19.131H54.3195V16.8312ZM11.2806 34.3014C10.8415 34.7455 10.2014 35.1468 9.3603 35.5052C8.5192 35.8637 7.45547 36.0429 6.16908 36.0429C4.34463 36.0429 2.86035 35.4164 1.71621 34.1634C0.572064 32.9105 0 31.2816 0 29.2768V28.801C0 26.7265 0.564333 25.0389 1.69302 23.7383C2.8217 22.4378 4.29515 21.7875 6.11342 21.7875C7.17098 21.7875 8.1373 21.9604 9.01242 22.3061C9.88753 22.6519 10.6158 23.1198 11.1971 23.7098V26.4981H9.19331L8.81297 24.6424C8.56558 24.4267 8.23935 24.2538 7.83426 24.1238C7.42917 23.9937 6.96379 23.9287 6.4381 23.9287C5.25685 23.9287 4.33846 24.3759 3.68289 25.2705C3.02733 26.165 2.69955 27.3355 2.69955 28.782V29.2768C2.69955 30.6852 3.02114 31.8097 3.66434 32.6504C4.30753 33.491 5.2352 33.9113 6.44738 33.9113C6.99162 33.9113 7.43227 33.8637 7.76933 33.7685C8.10638 33.6734 8.37077 33.5623 8.56249 33.4354V31.0849L6.63292 30.9327V28.9818H11.2806V34.3014ZM12.9038 34.1766L14.2026 33.8911V27.5057L12.7647 27.2202V25.5454H16.7259L16.8464 27.0489C17.0815 26.516 17.3845 26.1005 17.7556 25.8023C18.1267 25.5041 18.5565 25.355 19.0451 25.355C19.1873 25.355 19.3373 25.3661 19.495 25.3883C19.6527 25.4105 19.7841 25.4375 19.8892 25.4692L19.6017 28.0006L18.4884 27.972C18.0926 27.972 17.7649 28.0513 17.5051 28.2099C17.2454 28.3685 17.0474 28.5937 16.9114 28.8856V33.8911L18.2101 34.1766V35.842H12.9038V34.1766ZM20.5114 30.5985C20.5114 29.0632 20.9304 27.8055 21.7684 26.8253C22.6064 25.8451 23.7645 25.355 25.2426 25.355C26.7269 25.355 27.888 25.8435 28.726 26.8205C29.564 27.7976 29.983 29.0569 29.983 30.5985V30.7983C29.983 32.3463 29.564 33.6072 28.726 34.5811C27.888 35.5549 26.733 36.0418 25.2611 36.0418C23.7706 36.0418 22.6064 35.5549 21.7684 34.5811C20.9304 33.6072 20.5114 32.3463 20.5114 30.7983V30.5985ZM23.2199 30.7992C23.2199 31.7381 23.3807 32.4915 23.7023 33.0593C24.0239 33.6271 24.5434 33.911 25.2608 33.911C25.9596 33.911 26.4714 33.6255 26.7961 33.0545C27.1208 32.4836 27.2831 31.7318 27.2831 30.7992V30.5993C27.2831 29.6858 27.1192 28.9403 26.7915 28.363C26.4637 27.7857 25.9473 27.497 25.2422 27.497C24.5372 27.497 24.0239 27.7857 23.7023 28.363C23.3807 28.9403 23.2199 29.6858 23.2199 30.5993V30.7992ZM35.8805 33.9102C36.3629 33.9102 36.7494 33.7658 37.0401 33.4772C37.3307 33.1885 37.4761 32.8031 37.4761 32.321H39.9252L39.953 32.3781C39.9777 33.4185 39.5974 34.2892 38.8119 34.9903C38.0265 35.6913 37.0493 36.0418 35.8805 36.0418C34.3838 36.0418 33.2304 35.5565 32.4202 34.5858C31.61 33.6152 31.205 32.3685 31.205 30.8459V30.5604C31.205 29.0442 31.6209 27.7976 32.4527 26.8205C33.2845 25.8435 34.4704 25.355 36.0103 25.355C36.8205 25.355 37.5472 25.4787 38.1904 25.7262C38.8336 25.9736 39.3685 26.3225 39.7953 26.773L39.8324 29.5232H37.6338L37.1885 27.9149C37.0524 27.7944 36.8855 27.6945 36.6875 27.6152C36.4896 27.5358 36.2639 27.4962 36.0103 27.4962C35.2435 27.4962 34.7023 27.7817 34.3869 28.3527C34.0715 28.9236 33.9138 29.6596 33.9138 30.5604V30.8459C33.9138 31.7658 34.0591 32.5065 34.3498 33.068C34.6405 33.6294 35.1507 33.9102 35.8805 33.9102ZM45.9814 36.0419C44.5342 36.0419 43.3777 35.5661 42.5118 34.6144C41.646 33.6628 41.2131 32.4543 41.2131 30.9887V30.6081C41.2131 29.0791 41.6228 27.8198 42.4423 26.8301C43.2617 25.8404 44.361 25.3487 45.7402 25.3551C47.0946 25.3551 48.1459 25.7738 48.8943 26.6112C49.6426 27.4487 50.0168 28.5811 50.0168 30.0086V31.5216H44.0239L44.0054 31.5787C44.0549 32.2576 44.276 32.8159 44.6687 33.2536C45.0614 33.6914 45.5948 33.9102 46.2689 33.9102C46.8688 33.9102 47.3667 33.8484 47.7625 33.7247C48.1583 33.601 48.5912 33.4059 49.0613 33.1394L49.7941 34.8523C49.3798 35.1886 48.8433 35.4709 48.1846 35.6993C47.5259 35.9277 46.7915 36.0419 45.9814 36.0419ZM45.7376 27.497C45.2366 27.497 44.8408 27.6937 44.5502 28.087C44.2595 28.4804 44.0801 28.9974 44.0121 29.6382L44.0399 29.6858H47.361V29.4384C47.361 28.8483 47.2265 28.3773 46.9575 28.0252C46.6885 27.6731 46.2818 27.497 45.7376 27.497ZM51.4934 34.1766L52.7921 33.8911V27.5057L51.3542 27.2202V25.5454H55.3154L55.436 27.0489C55.671 26.516 55.9741 26.1005 56.3451 25.8023C56.7162 25.5041 57.146 25.355 57.6346 25.355C57.7769 25.355 57.9268 25.3661 58.0845 25.3883C58.2423 25.4105 58.3737 25.4375 58.4788 25.4692L58.1912 28.0006L57.078 27.972C56.6822 27.972 56.3544 28.0513 56.0947 28.2099C55.8349 28.3685 55.637 28.5937 55.501 28.8856V33.8911L56.7997 34.1766V35.842H51.4934V34.1766ZM69.8472 27.2196L68.9102 27.3624L65.218 37.383C64.9274 38.1253 64.5393 38.747 64.0538 39.2482C63.5683 39.7494 62.837 40 61.8598 40C61.631 40 61.4161 39.981 61.2151 39.9429C61.0141 39.9048 60.7775 39.8509 60.5054 39.7811L60.8208 37.7542C60.9074 37.7668 60.9971 37.7795 61.0899 37.7922C61.1826 37.8049 61.263 37.8113 61.3311 37.8113C61.7825 37.8113 62.1289 37.6986 62.3701 37.4734C62.6113 37.2482 62.7968 36.9675 62.9267 36.6312L63.2328 35.8509L60.0509 27.3719L59.1139 27.2196V25.5448H64.0306V27.2196L62.9081 27.41L64.2811 31.521L64.4202 32.2633L64.4759 32.2728L66.0622 27.41L64.9305 27.2196V25.5448H69.8472V27.2196Z" fill="#242529"/></svg>`;
const BANANA_IMG = CDN + "thumb_17b704c5-b4df-4831-ac14-6260baa59a13.jpg";

// "Shop today's best deals": every deal is Aisle 7, $2.99 (was $4.99) per the design.
const HOME_DEALS = [
  { name: "Natural Crunchy Peanut Butter", q: "peanut butter", img: CDN + "thumb_92e761e1-d3b4-4bd8-82f6-f03dd5569f9e.jpg", reward: "$1 Cart Cash", exclusive: true },
  { name: "Dark Roast Coffee",             q: "coffee",        img: CDN + "thumb_5f0ff86c-977b-42bb-b278-b3bd75283751.png", reward: "$1 off",       exclusive: false },
  { name: "Chunky Salsa, Mild",            q: "salsa",         img: CDN + "thumb_d104e4da-0f8c-4f79-bf83-25fbfa3c62c3.jpg", reward: "$1 Cart Cash", exclusive: true },
  { name: "Tomato Ketchup",                q: "ketchup",       img: CDN + "thumb_416e856e-2b07-4da5-9849-0a442f4d1006.jpg", reward: "$1 off",       exclusive: false },
  { name: "Penne Pasta",                   q: "penne pasta",   img: CDN + "thumb_4a804b96-1adf-4048-8adc-e9a45946a051.png", reward: "$1 Cart Cash", exclusive: true },
  { name: "Organic 2% Milk, Half Gallon",  q: "milk",          img: CDN + "thumb_603c8641-1fea-40f8-a026-b50011cbbbf6.jpg", reward: "$1 Cart Cash", exclusive: true },
];

const POPULAR = [
  { term: "olive oil",       img: CDN + "thumb_d4ad71aa-3097-476f-b6c6-aa651ea69cb5.jpg" },
  { term: "pasta sauce",     img: CDN + "thumb_048f5b55-62a4-4b54-a06b-9a0b8a334716.jpg" },
  { term: "pasta",           img: CDN + "thumb_76713a89-8503-46ef-a6ab-0a08a68818cd.png" },
  { term: "canned tomatoes", img: CDN + "thumb_0859fa89-ac72-474e-9b76-0341d6b30a66.jpg" },
  { term: "capers",          img: CDN + "thumb_c3515d08-3fe9-43ed-acf1-f748be85b61f.jpg" },
  { term: "olives",          img: CDN + "thumb_932ef3c4-7ce3-447e-aab0-81b25a6ddb6e.jpg" },
  { term: "vinegar",         img: CDN + "thumb_959dcc4a-7007-4d55-80fb-6fcb5dc4d9fe.png" },
  { term: "breadcrumbs",     img: CDN + "thumb_bc0f604f-21a8-489d-ad67-1c19ad49c8bc.png" },
  { term: "parmesan cheese", img: CDN + "thumb_4151353b-3586-42ff-aee9-6d1892fa23fa.png" },
];

// past-purchase mini thumbnails for the empty-list card
const PAST_THUMBS = [
  CDN + "thumb_92e761e1-d3b4-4bd8-82f6-f03dd5569f9e.jpg",
  CDN + "thumb_76713a89-8503-46ef-a6ab-0a08a68818cd.png",
  CDN + "thumb_bc0f604f-21a8-489d-ad67-1c19ad49c8bc.png",
];

// rotating suffix for the search placeholder ("Search for… ___")
const SEARCH_HINTS = ["item location", "dinner ideas", "this week’s deals"];

/* ---------- Icons used only by the home / search-landing screens ---------- */
const menuIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`;
const couponIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" aria-hidden="true"><path d="M20.6 12.6 12 21l-8.6-8.6a1.4 1.4 0 0 1-.4-1V4h7.4a1.4 1.4 0 0 1 1 .4L20.6 13a1.1 1.1 0 0 1 0-.4z"/><path d="M8 8l8 8" stroke-width="1.5"/><circle cx="7.4" cy="7.4" r="1.1" fill="currentColor" stroke="none"/></svg>`;
const searchIconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2" stroke-linecap="round"/></svg>`;
const cameraIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h3l1.6-2.2h8.8L18 8h3v11H3z"/><circle cx="12" cy="13" r="3.2"/></svg>`;
const closeIconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
const plusCircleIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M12 6.5v11M6.5 12h11" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>`;
const scaleGlyph = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="3.5" opacity=".55"/><circle cx="7" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="17" cy="12" r="1.3"/></svg>`;
const bkspIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M9 5h11a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9L2 12z"/><path d="M17 9l-5 6M12 9l5 6"/></svg>`;
const kbDownIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;
const backArrowIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`;

/* ---------- Home screen markup ---------- */
function dealCardHTML(d, i) {
  return `
    <button class="card deal-card" type="button" data-i="${i}" aria-label="${d.name}, $2.99">
      ${d.exclusive ? `<span class="deal-flag">Caper exclusive</span>` : ""}
      <span class="listbtn" role="presentation" aria-hidden="true"></span>
      <span class="card-media">
        <img src="${d.img}" alt="${d.name}" />
        <span class="loc-pill">${pinSVG}Aisle 7</span>
      </span>
      <span class="price-row"><span class="price price--sale">$2.99</span><span class="price-was">$4.99</span></span>
      <span class="offer-pill">${d.reward}</span>
      <span class="card-title">${d.name}</span>
      <span class="deal-eligible">See eligible items</span>
      <span class="clip-btn">${scissorsIcon} ${d.exclusive ? "Clip offer" : "Clip coupon"}</span>
    </button>`;
}
function homeHTML() {
  return `
    <div class="home-main">
      <header class="home-topbar">
        <button class="brand-btn" type="button" aria-label="Menu">
          <span class="brand-menu">${menuIcon}</span>
          <span class="brand-logo" role="img" aria-label="Fresh Grocery">${FRESH_LOGO_SVG}</span>
        </button>
        <button class="coupons-btn" type="button">
          <span class="coupons-ic">${couponIcon}</span>
          <span>Coupons</span>
        </button>
        <button class="home-search" id="homeSearchBar" type="button" aria-label="Search for items">
          <span class="hs-icon">${searchIconSvg}</span>
          <span class="hs-text">Search for… <span class="hs-rot" id="homeHint">item location</span></span>
        </button>
        <div class="savings">
          <div class="sv"><span class="sv-amt sv-amt--save">$0.00</span><span class="sv-lbl">Savings</span></div>
          <div class="sv-div" aria-hidden="true"></div>
          <div class="sv"><span class="sv-amt">$7.49</span><span class="sv-lbl">Subtotal</span></div>
        </div>
      </header>

      <div class="home-body">
        <aside class="list-card">
          <div class="lc-head">
            <span class="lc-title">Your list is empty</span>
            <button class="lc-close" type="button" aria-label="Dismiss">${closeIconSvg}</button>
          </div>
          <div class="lc-empty">
            <div class="lc-empty-title">Add your past purchases</div>
            <div class="lc-empty-sub">Kickstart your list by browsing items you’ve bought before.</div>
            <div class="lc-thumbs">
              ${PAST_THUMBS.map((u) => `<span class="lc-thumb"><img src="${u}" alt="" /></span>`).join("")}
              <span class="lc-thumb lc-thumb--more">+10</span>
            </div>
            <button class="lc-viewall" type="button">View all</button>
          </div>
          <button class="lc-scan" type="button">${cameraIcon} Scan my list</button>
        </aside>

        <section class="deals">
          <h2 class="deals-title">Shop today’s best deals</h2>
          <div class="deals-grid">${HOME_DEALS.map((d, i) => dealCardHTML(d, i)).join("")}</div>
        </section>
      </div>

      <footer class="scale-specs">${scaleGlyph}<span>Scale specs: 80 x 0.01 lb &nbsp;•&nbsp; Weight : 1.79 lb</span></footer>
    </div>

    <aside class="cart-rail">
      <button class="checkout-btn" type="button">
        <span class="co-badge">2</span>
        <span class="co-cart">${cartIcon}</span>
        <span class="co-label">Checkout</span>
      </button>
      <div class="cart-items">
        <div class="cart-item">
          <span class="ci-badge">x2</span>
          <img src="${BANANA_IMG}" alt="Bananas" />
          <span class="ci-price">$7.49</span>
        </div>
      </div>
      <button class="add-item" type="button">${plusCircleIcon}<span>Add item</span></button>
    </aside>`;
}

/* ---------- Search landing markup ---------- */
function keyboardHTML() {
  const K = (ch) => `<button class="key" type="button" data-k="${ch}">${ch}</button>`;
  const N = (n) => `<button class="key key--num" type="button" data-k="${n}">${n}</button>`;
  const row = (s) => s.split("").map(K).join("");
  return `
    <div class="kb-left">
      <div class="kb-row">${row("qwertyuiop")}<button class="key key--fn" type="button" data-act="back" aria-label="Backspace">${bkspIcon}</button></div>
      <div class="kb-row kb-row--indent">${row("asdfghjkl")}</div>
      <div class="kb-row kb-row--indent">${row("zxcvbnm")}</div>
      <div class="kb-row kb-row--bottom">
        <button class="key key--space" type="button" data-k=" ">&nbsp;</button>
        <button class="key key--search" type="button" data-act="search">Search</button>
      </div>
    </div>
    <div class="kb-right">
      <button class="key key--fn key--down" type="button" data-act="down" aria-label="Hide keyboard">${kbDownIcon}</button>
      <div class="kb-num">
        ${[1,2,3,4,5,6,7,8,9].map(N).join("")}
        <button class="key key--num key--zero" type="button" data-k="0">0</button>
      </div>
    </div>`;
}
function landingHTML() {
  return `
    <header class="sl-topbar">
      <button class="back-btn" id="slExit" type="button"><span class="sl-exit-ic">${backArrowIcon}</span><span>Exit</span></button>
      <div class="sl-searchbar">
        <span class="hs-icon">${searchIconSvg}</span>
        <input id="slInput" type="text" placeholder="Search for… item location" autocomplete="off" aria-label="Search for items" />
      </div>
    </header>
    <section class="sl-popular">
      <h2 class="sl-h2">Popular searches</h2>
      <div class="popular-grid">
        ${POPULAR.map((p) => `<button class="popular-item" type="button" data-term="${p.term}"><span class="pi-thumb"><img src="${p.img}" alt="" /></span><span class="pi-term">${p.term}</span></button>`).join("")}
      </div>
    </section>
    <div class="keyboard">${keyboardHTML()}</div>`;
}

/* ---------- Screen switching + navigation ---------- */
const homeScreenEl = document.getElementById("homeScreen");
const landingScreenEl = document.getElementById("searchLanding");
const resultsScreenEl = document.getElementById("searchScreen");

// The screen currently on view (used by the full-screen PDP fork to know which
// screen to displace on open and restore on close).
function visibleScreenEl() {
  if (!resultsScreenEl.hidden) return resultsScreenEl;
  if (!homeScreenEl.hidden) return homeScreenEl;
  if (!landingScreenEl.hidden) return landingScreenEl;
  return null;
}

let hintTimer = null, hintIdx = 0;
function startHintRotator() {
  const el = document.getElementById("homeHint");
  if (!el) return;
  clearInterval(hintTimer);
  hintTimer = setInterval(() => {
    hintIdx = (hintIdx + 1) % SEARCH_HINTS.length;
    el.style.opacity = "0";
    setTimeout(() => { el.textContent = SEARCH_HINTS[hintIdx]; el.style.opacity = "1"; }, 220);
  }, 2600);
}

function showScreen(name) {
  homeScreenEl.hidden = name !== "home";
  landingScreenEl.hidden = name !== "landing";
  resultsScreenEl.hidden = name !== "results";
  if (name === "home") startHintRotator(); else clearInterval(hintTimer);
}
function openLanding() {
  showScreen("landing");
  const inp = document.getElementById("slInput");
  if (inp) { inp.value = ""; inp.focus({ preventScroll: true }); }
}
function goToResults(query) {
  const q = (query || "").trim();
  const input = document.getElementById("searchInput");
  if (input) input.value = q;
  renderGrid(q);
  showScreen("results");
  const grid = document.querySelector("#searchScreen");
  if (grid) grid.scrollTop = 0;
}
// A home deal opens the PDP directly for that product (not the results list).
function openDeal(i) {
  const d = HOME_DEALS[i];
  if (!d) return;
  pdpHistory = []; // opening from a home deal starts a fresh trail
  openProduct({
    name: d.name,
    size: "",
    price: "$2.99",
    was: "$4.99",
    img: d.img,
    onSale: true,
    offer: d.reward,
    clip: d.exclusive,
  });
}
// Smooth-scroll the open PDP to the inline eligible-items carousel. `delay` lets
// the sheet finish opening first when we scroll right after launching the PDP.
// Scrolls the sheet body directly (scrollIntoView's smooth mode no-ops inside
// the scaled device transform).
function scrollToEligible(delay = 0) {
  setTimeout(() => {
    const target = document.getElementById("eligibleSection");
    const body = sheet.querySelector(".sheet-body");
    if (!target || !body) return;
    // Use offsetTop (layout px, unaffected by the device's CSS scale transform)
    // — getBoundingClientRect returns scaled px and would mis-compute the offset.
    // target and body share an offset parent (the sheet), so the difference is
    // the target's position within the scrolling body content.
    const to = Math.max(0, target.offsetTop - body.offsetTop - 12);
    // Animate scrollTop by hand: native smooth scrolling no-ops inside the
    // scaled device transform, but setting scrollTop directly works.
    animateScrollTop(body, to, 420);
  }, delay);
}
function animateScrollTop(el, to, duration) {
  const from = el.scrollTop;
  const dist = to - from;
  if (Math.abs(dist) < 2) { el.scrollTop = to; return; }
  const start = Date.now();
  const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
  const timer = setInterval(() => {
    const t = Math.min(1, (Date.now() - start) / duration);
    el.scrollTop = from + dist * ease(t);
    if (t >= 1) clearInterval(timer);
  }, 16);
}

// Ensure the results topbar has a PDP-style X close (replacing the old Help
// button). Done in JS so it works whether the page markup ships the new close
// button or the legacy .help-btn. The X exits search back to Home.
function setupResultsClose() {
  const topbar = document.querySelector("#searchScreen .topbar");
  if (!topbar) return;
  let closeBtn = document.getElementById("resultsClose");
  if (!closeBtn) {
    closeBtn = document.createElement("button");
    closeBtn.className = "results-close";
    closeBtn.id = "resultsClose";
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close search");
    closeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`;
    const help = topbar.querySelector(".help-btn");
    if (help) help.replaceWith(closeBtn); else topbar.appendChild(closeBtn);
  }
  closeBtn.addEventListener("click", () => showScreen("home"));
}

function initHomeScreens() {
  // PDP presentation fork: default is the bottom sheet; <html data-pdp-mode="full">
  // switches the PDP to a full-screen page (see .pdp-full styles).
  if (document.documentElement.dataset.pdpMode === "full") {
    PDP_FULL = true;
    const ds = document.getElementById("deviceScreen");
    if (ds) ds.classList.add("pdp-full");
    // Full-screen fork: the top-right X exits to Home, so label it "Exit".
    const closeBtn = document.getElementById("pdpClose");
    if (closeBtn && !closeBtn.querySelector(".sheet-exit-label")) {
      const label = document.createElement("span");
      label.className = "sheet-exit-label";
      label.textContent = "Exit";
      closeBtn.appendChild(label); // after the X icon, so it reads "✕ Exit"
      closeBtn.classList.add("sheet-close--labeled");
      closeBtn.setAttribute("aria-label", "Exit to home");
    }
  }

  homeScreenEl.innerHTML = homeHTML();
  landingScreenEl.innerHTML = landingHTML();

  // Home interactions
  homeScreenEl.addEventListener("click", (e) => {
    if (e.target.closest("#homeSearchBar")) { openLanding(); return; }
    const clip = e.target.closest(".clip-btn");
    if (clip) {
      clip.classList.add("clip-btn--done");
      const orig = clip.innerHTML;
      clip.innerHTML = `${scissorsIcon} Clipped ✓`;
      setTimeout(() => { clip.classList.remove("clip-btn--done"); clip.innerHTML = orig; }, 1400);
      return;
    }
    // "See eligible items" opens the PDP and scrolls straight to the carousel.
    const seeElig = e.target.closest(".deal-eligible");
    if (seeElig) {
      const card = seeElig.closest(".deal-card");
      openDeal(Number(card.dataset.i));
      scrollToEligible(450); // let the sheet finish opening, then scroll
      return;
    }
    const deal = e.target.closest(".deal-card");
    if (deal) { openDeal(Number(deal.dataset.i)); return; }
  });

  // Search-landing interactions
  landingScreenEl.addEventListener("click", (e) => {
    if (e.target.closest("#slExit")) { showScreen("home"); return; }
    const pop = e.target.closest(".popular-item");
    if (pop) { goToResults(pop.dataset.term); return; }
    const key = e.target.closest(".key");
    if (key) { handleKey(key); return; }
  });
  landingScreenEl.addEventListener("keydown", (e) => {
    if (e.target.id === "slInput" && e.key === "Enter") {
      e.preventDefault();
      goToResults(e.target.value);
    }
  });

  // Results "Back" and the top-right close (X) both exit search to the home screen
  const resultsBack = document.querySelector("#searchScreen .back-btn");
  if (resultsBack) resultsBack.addEventListener("click", () => showScreen("home"));
  setupResultsClose();

  showScreen("home");
}
function handleKey(key) {
  const inp = document.getElementById("slInput");
  if (!inp) return;
  const act = key.dataset.act;
  if (act === "search") { goToResults(inp.value); return; }
  if (act === "down") { showScreen("home"); return; }
  if (act === "back") { inp.value = inp.value.slice(0, -1); inp.focus({ preventScroll: true }); return; }
  if (key.dataset.k != null) { inp.value += key.dataset.k; inp.focus({ preventScroll: true }); }
}

/* ---------- Events ---------- */
const searchInput = document.getElementById("searchInput");
renderGrid(searchInput.value); // honor the pre-filled query on first paint
initHomeScreens(); // build the home + search-landing screens and open on Home

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

// X (top-right): in the full-screen fork it exits the search flow to Home; in
// the sheet fork it dismisses the sheet.
document.getElementById("pdpClose").addEventListener("click", () => closePDP(PDP_FULL ? { toHome: true } : undefined));
document.getElementById("pdpBack").addEventListener("click", goBack);
scrim.addEventListener("click", () => closePDP()); // sheet fork only (scrim hidden when full)
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

  // "N eligible items" in the offer card scrolls down to the eligible carousel.
  const offerLink = e.target.closest(".offer-link");
  if (offerLink) { e.preventDefault(); scrollToEligible(); return; }

  // "Clip offer" (offer card + eligible-items header): quick clipped confirmation.
  const clipOffer = e.target.closest(".clip-offer");
  if (clipOffer && !clipOffer.classList.contains("clip-offer--done")) {
    const orig = clipOffer.innerHTML;
    clipOffer.classList.add("clip-offer--done");
    clipOffer.innerHTML = `${scissorsIcon} Clipped ✓`;
    setTimeout(() => { clipOffer.classList.remove("clip-offer--done"); clipOffer.innerHTML = orig; }, 1400);
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
    const icon = FLAGS.cart ? cartIcon : listAddIcon;
    const label = FLAGS.cart ? "Add to Cart" : "Add to list";
    addBtn.classList.add("btn--added");
    addBtn.innerHTML = `${icon} Added ✓`;
    setTimeout(() => { addBtn.classList.remove("btn--added"); addBtn.innerHTML = `${icon} ${label}`; }, 1400);
    return;
  }

  const lightBtn = e.target.closest("#lightBtn");
  if (lightBtn) {
    lightBtn.innerHTML = `${bulbIcon} Lighting up…`;
    setTimeout(() => { lightBtn.innerHTML = `${bulbIcon} Light up in aisle`; }, 1600);
    return;
  }

  // Secondary "Add to list" button (shown when "Light up in aisle" is off).
  const listBtn = e.target.closest("#addListBtn");
  if (listBtn) {
    listBtn.innerHTML = `${listAddIcon} Added to list ✓`;
    setTimeout(() => { listBtn.innerHTML = `${listAddIcon} Add to list`; }, 1400);
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
const LOCATION_DEPENDENT = ["map", "imagery", "lightup"];
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
