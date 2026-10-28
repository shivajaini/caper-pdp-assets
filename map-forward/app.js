(() => {
  const app = document.getElementById('app');
  const screen = document.getElementById('screen');
  const pan = document.getElementById('pan');
  const hl = document.getElementById('highlight');
  const card = document.getElementById('card');
  const tabL = document.getElementById('tabL'), tabR = document.getElementById('tabR');
  const link = document.getElementById('link'), line = document.getElementById('linkLine'), dot = document.getElementById('linkDot');
  const IMG_W = 1778, IMG_H = 964;
  const SHELF_FT = 24;                       // hardcoded shelf length for the prototype
  const PX_PER_FT = IMG_W / SHELF_FT;
  const WALK_FT_PER_S = 3;                   // simulated walking speed (arrow keys)
  const USER_MIN = 40, USER_MAX = IMG_W - 40; // user stands at the right end (aisle start) to begin with
  const HL = { x: 400, y: 116, w: 182, h: 138 };
  const track = document.getElementById('track'), stripView = document.getElementById('stripView');
  const pinProduct = document.getElementById('pinProduct'), pinYou = document.getElementById('pinYou'), lblYou = document.getElementById('lblYou');
  const hint = document.getElementById('hint');
  const pct = v => (v / IMG_W * 100) + '%';
  pinProduct.style.left = pct(HL.x + HL.w / 2);
  let userX = USER_MAX;                      // user's position along the shelf, in image px

  let x = Math.min(0, screen.clientWidth - IMG_W), y = 0,   // open at the user's end of the shelf
       vx = 0, vy = 0;
  let dragging = false, lastX = 0, lastY = 0, lastT = 0, raf = 0;

  const bounds = () => {
    const vw = screen.clientWidth, vh = screen.clientHeight;
    return { minX: Math.min(0, vw - IMG_W), minY: Math.min(0, vh - IMG_H) };
  };
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  // Rubber-band past the edges while dragging
  const rubber = (v, lo, hi) => v > hi ? hi + (v - hi) * 0.3 : v < lo ? lo + (v - lo) * 0.3 : v;

  function render() {
    pan.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    const vw = screen.clientWidth;
    const left = x + HL.x, right = left + HL.w;
    const visible = Math.max(0, Math.min(right, vw) - Math.max(left, 0)) / HL.w;
    const inView = visible >= 0.5;

    tabL.classList.toggle('show', !inView && right <= vw / 2);
    tabR.classList.toggle('show', !inView && left > vw / 2);
    card.classList.toggle('away', !inView);
    card.classList.toggle('linked', inView);

    // Mini strip: current view window along the full shelf
    stripView.style.left = pct(-x); stripView.style.width = pct(Math.min(vw, IMG_W));
    const hlCx = HL.x + HL.w / 2;
    const arrived = userX >= HL.x && userX <= HL.x + HL.w;
    const ft = Math.round(Math.abs(userX - hlCx) / PX_PER_FT);
    const side = userX > hlCx ? 'left' : 'right';
    pinYou.style.left = lblYou.style.left = pct(userX);
    lblYou.textContent = arrived ? 'You' : `You · ${ft} ft`;
    screen.classList.toggle('arrived', arrived);
    card.classList.toggle('arrived', arrived);
    hint.textContent = arrived ? "You've arrived · it's right in front of you" : `About ${ft} ft to your ${side}`;

    // Connector from the card up to the highlight (aimed at its visible part)
    const sr = screen.getBoundingClientRect(), cr = card.getBoundingClientRect();
    const cw = cr.width, cl = cr.left - sr.left, ct = cr.top - sr.top;
    const hlBottom = y + HL.y + HL.h;
    const tx = (Math.max(left, 0) + Math.min(right, vw)) / 2;
    const tailX = clamp(tx, cl + 28, cl + cw - 28);
    card.style.setProperty('--tail-x', (tailX - cl) + 'px');
    const show = inView && hlBottom < ct - 24;
    link.classList.toggle('on', show);
    line.setAttribute('x1', tailX); line.setAttribute('y1', ct - 10);
    line.setAttribute('x2', tx);    line.setAttribute('y2', hlBottom + 10);
    dot.setAttribute('cx', tx);     dot.setAttribute('cy', hlBottom + 10);
  }

  function coast() {
    const { minX, minY } = bounds();
    vx *= 0.95; vy *= 0.95;
    x += vx; y += vy;
    // spring back inside bounds
    const cx = clamp(x, minX, 0), cy = clamp(y, minY, 0);
    x += (cx - x) * 0.2; y += (cy - y) * 0.2;
    render();
    if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1 || Math.abs(x - cx) > 0.3 || Math.abs(y - cy) > 0.3) {
      raf = requestAnimationFrame(coast);
    } else { x = cx; y = cy; render(); }
  }

  screen.addEventListener('pointerdown', e => {
    if (e.target.closest('.close, .card')) return;
    dragging = true; cancelAnimationFrame(raf);
    screen.setPointerCapture(e.pointerId); screen.classList.add('dragging');
    lastX = e.clientX; lastY = e.clientY; lastT = performance.now(); vx = vy = 0;
  });
  screen.addEventListener('pointermove', e => {
    if (!dragging) return;
    const now = performance.now(), dt = Math.max(1, now - lastT);
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    const { minX, minY } = bounds();
    x = rubber(x + dx, minX, 0); y = rubber(y + dy, minY, 0);
    vx = dx / dt * 16; vy = dy / dt * 16;
    lastX = e.clientX; lastY = e.clientY; lastT = now;
    render();
  });
  const end = () => {
    if (!dragging) return;
    dragging = false; screen.classList.remove('dragging');
    raf = requestAnimationFrame(coast);
  };
  screen.addEventListener('pointerup', end);
  screen.addEventListener('pointercancel', end);

  // Trackpad / mouse wheel panning
  screen.addEventListener('wheel', e => {
    e.preventDefault(); cancelAnimationFrame(raf);
    const { minX, minY } = bounds();
    x = clamp(x - e.deltaX, minX, 0); y = clamp(y - e.deltaY, minY, 0);
    render();
  }, { passive: false });

  // Tapping an off-screen pointer recenters on the highlight
  const recenter = () => {
    const { minX, minY } = bounds();
    const tx = clamp(screen.clientWidth / 2 - (HL.x + HL.w / 2), minX, 0);
    const ty = clamp(screen.clientHeight / 2 - (HL.y + HL.h / 2), minY, 0);
    cancelAnimationFrame(raf);
    const sx = x, sy = y, t0 = performance.now();
    (function step(t) {
      const p = Math.min(1, (t - t0) / 350), e = 1 - Math.pow(1 - p, 3);
      x = sx + (tx - sx) * e; y = sy + (ty - sy) * e; render();
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  };
  tabL.addEventListener('click', recenter);
  tabR.addEventListener('click', recenter);

  // Simulated walking: hold ← / → to move the user along the shelf; the view follows them
  const keys = { left: false, right: false };
  let walkRaf = 0, lastWalkT = 0, following = false;
  function walk(t) {
    const dt = Math.min(0.05, (t - lastWalkT) / 1000); lastWalkT = t;
    const dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    userX = clamp(userX + dir * WALK_FT_PER_S * PX_PER_FT * dt, USER_MIN, USER_MAX);
    const { minX } = bounds();
    const target = clamp(screen.clientWidth / 2 - userX, minX, 0);
    x += (target - x) * Math.min(1, dt * 8);
    render();
    if (following && (dir || Math.abs(target - x) > 0.5)) walkRaf = requestAnimationFrame(walk);
    else walkRaf = 0;
  }
  function startWalk() {
    cancelAnimationFrame(raf); vx = vy = 0; following = true;
    if (!walkRaf) { lastWalkT = performance.now(); walkRaf = requestAnimationFrame(walk); }
  }
  const stopFollow = () => { following = false; };
  const keyDir = e => e.key === 'ArrowLeft' ? 'left' : e.key === 'ArrowRight' ? 'right' : null;
  const shelfOpen = () => app.classList.contains('shelf-open');
  window.addEventListener('keydown', e => { const d = keyDir(e); if (!d || !shelfOpen()) return; e.preventDefault(); keys[d] = true; startWalk(); });
  window.addEventListener('keyup', e => { const d = keyDir(e); if (d) keys[d] = false; });
  window.addEventListener('blur', () => { keys.left = keys.right = false; });
  screen.addEventListener('pointerdown', stopFollow);   // dragging/scrolling takes the camera back
  screen.addEventListener('wheel', stopFollow, { passive: true });

  // Navigation: "See shelf image" opens the shelf view; the X closes it
  function resetView() {
    cancelAnimationFrame(raf); cancelAnimationFrame(walkRaf); walkRaf = 0; following = false;
    keys.left = keys.right = false; vx = vy = 0;
    userX = USER_MAX; x = Math.min(0, screen.clientWidth - IMG_W); y = 0; render();
  }
  document.getElementById('seeShelf').addEventListener('click', () => { resetView(); app.classList.add('shelf-open'); });
  document.querySelector('.screen .close').addEventListener('click', () => { app.classList.remove('shelf-open'); keys.left = keys.right = false; });

  window.addEventListener('resize', () => { const b = bounds(); x = clamp(x, b.minX, 0); y = clamp(y, b.minY, 0); render(); });
  render();
})();

/* Interactive store map: floor plan + live route, driven by the arrow keys */
(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.getElementById('mapSvg'), world = document.getElementById('world');
  const el = (tag, a = {}, parent = world) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); parent.appendChild(e); return e; };
  const A = k => { const e = document.querySelector('#assetReg img[data-k="' + k + '"]'); return e ? e.src : k; };   // resolve attachment URLs
  const img = (href, x, y, w, h, parent, extra = {}) => el('image', { href: A(href), x, y, width: w, height: h, preserveAspectRatio: 'none', ...extra }, parent);
  const rect = (x, y, w, h, a = {}, parent) => el('rect', { x, y, width: w, height: h, fill: '#e8e9eb', stroke: '#e8e9eb', 'stroke-width': .475, ...a }, parent);
  const text = (x, y, lines, cls = 'lbl', parent) => { const t = el('text', { class: cls, x, y }, parent); [].concat(lines).forEach((s, i) => { const ts = el('tspan', { x, dy: i ? 11.5 : 0 }, t); ts.textContent = s; }); return t; };
  // Figma "Map" frame origin inside the 430x281 viewport
  const BASE = { x: -110.4, y: -50.26 }, MAP_W = 580.8, MAP_H = 383.2;
  let pan = { x: 0, y: 0 };
  const app = document.getElementById('app');
  // views: the list state shows the whole store (Figma map is 484 wide); the navigation state zooms in on the route
  const LIST_VIEW = { k: 484 / MAP_W, x: -27, y: 2.29 };
  let state = 'list', view = { ...LIST_VIEW }, viewAnim = 0;
  let dv = { k: 1, x: BASE.x, y: BASE.y };            // navigation view, framed on the route when entered
  const detailView = () => ({ ...dv });
  const applyView = () => world.setAttribute('transform', `translate(${view.x} ${view.y}) scale(${view.k})`);
  function goView(t, ms = 550) {
    cancelAnimationFrame(viewAnim);
    const f = { ...view }, t0 = performance.now();
    (function stepView(now) {
      const p = Math.min(1, (now - t0) / ms), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      view = { k: f.k + (t.k - f.k) * e, x: f.x + (t.x - f.x) * e, y: f.y + (t.y - f.y) * e };
      applyView();
      if (p < 1) viewAnim = requestAnimationFrame(stepView);
    })(t0);
  }
  applyView();
  const pins = [];

  // --- floor plan ---
  img('map_bg.svg', 11.29, 8.82, 569.156, 316.158);
  const AO = { x: 10.94, y: 8.56 };
  [[343.15,41.55,38.108,15.173],[399.26,47.19,9.174,15.173],[432.25,62.37,19.009,59.29],[474.77,47.19,20.113,44.46],
   [432.25,138.23,19.009,59.29],[432.15,222.97,19.017,9.033],[496.81,203.95,32.804,10.935],[489.2,232,19.017,10.935],
   [475.15,113.19,19.009,33.945]].forEach(([x,y,w,h]) => rect(AO.x + x, AO.y + y, w, h));
  const rot = (cx, cy, w, h, deg) => rect(-w/2, -h/2, w, h, { transform: `translate(${cx} ${cy}) rotate(${deg})` });
  rot(AO.x + 518.36 + 14.17, AO.y + 234.86 + 10.4, 26.161, 10.935, -24.52);
  rot(AO.x + 512.02 + 13.49, AO.y + 151.18 + 16.74, 32.804, 10.935, -57.14);
  rect(AO.x + 256.55, AO.y + 251.23, 130.348, 38.923, { fill: '#e9fbe9', stroke: '#0d720d', opacity: .6, rx: 4.754 });
  rect(AO.x + 395.74, AO.y + 251.5, 58.927, 38.108, { stroke: '#c7c8cd' });
  img('map_v2.svg', AO.x + 501.77, AO.y + 174.05, 68.278, 106.562);
  img('map_v3.svg', AO.x + 0.36, AO.y + 0.26, 165.136, 15.526);
  img('map_v4.svg', AO.x + 273.12, AO.y + 16.14, 216.83, 10.056);
  img('map_v5.svg', AO.x + 165.85, AO.y + 15.79, 105.504, 10.939);
  // frozen food aisles
  [69.886,69.886,69.886,69.886,50.394,50.394,50.394].forEach((h, i) => rect(59.43 + i * 30.426, 242.76 + (69.886 - h) / 2, 15.213, h));
  // center aisles 11..1
  const AISLE_X = i => 61.81 + i * 32.328;
  for (let i = 0; i < 11; i++) { const h = i < 8 ? 169.723 : 127.887; rect(AISLE_X(i), 57.38 + 169.723 - h, 15.213, h); }
  img('map_overlays.svg', 9.03, 6.18, 572.876, 311.873);

  // --- labels ---
  const SN = { x: 93.5, y: 12 }, ty = t => t + 9.8;
  text(SN.x + 440.97, SN.y + ty(224.77), 'Baked Goods');
  text(SN.x + 427.3, SN.y + ty(166.2), 'To Go Foods');
  text(SN.x + 343.02, SN.y + ty(254.32), ['Customer', 'Service']);
  text(SN.x + 239.6, SN.y + ty(261.28), 'Checkout');
  text(SN.x + 61.26, SN.y + ty(256.39), ['Frozen', 'Foods']);
  text(SN.x + 318.41, SN.y + ty(23.29), 'Meat & Seafood');
  text(SN.x + 44.36, SN.y + ty(15.53), 'Dairy');
  text(SN.x + 333.5, SN.y + ty(111.61), 'Produce');
  const ent = text(AO.x + 482.98, AO.y + 288.19 + 7, 'Entrance'); ent.style.fontSize = '7.057px';
  for (let i = 0; i < 11; i++) { text(41.66 + 12.049 + i * 32.396, 111.07 + 9.8, String(11 - i)); }
  const ptrs = [];                           // pin pointers; they dim together with their pin
  const small = (href, cx, cy, w, h, deg) => {
    const e = img(href, -w/2, -h/2, w, h, world, { class: 'ptr', transform: `translate(${cx} ${cy}) rotate(${deg})` });
    ptrs.push({ e, sauce: href.endsWith('pin1.svg') });   // pin1 belongs to the pasta sauce pin
    return e;
  };
  small('map_pin1.svg', 184.39 + 6.27, 154.08 + 6.38, 9.754, 8.214, -50.4);
  small('map_pin2.svg', 137.78 + 4.96, 209.05 + 6.52, 12.142, 8.609, 96.46);

  // --- product pins ---
  const pin = (x, y, photo, opacity, extra, stroke = '#0d720d') => {
    const g = el('g', { class: 'pin', transform: `translate(${x} ${y})`, opacity });
    const id = 'clip' + Math.random().toString(36).slice(2, 7);
    const cp = el('clipPath', { id }, g); el('circle', { cx: 21.78, cy: 21.78, r: 20.04 }, cp);
    g.ring = el('circle', { cx: 21.78, cy: 21.78, r: 20.9, fill: '#fff', stroke, 'stroke-width': 1.742 }, g); pins.push(g);
    const inner = el('g', { 'clip-path': `url(#${id})` }, g);
    extra ? extra(inner) : img(photo, 3.63, 3.63, 36.3, 36.3, inner);
    return g;
  };
  pin(403.46, 86.05, 'map_p0.png', .3);
  pin(399.6, 146.05, 'map_p1.png', .3);
  pin(400.75, 201.83, 'map_p2.png', .3);
  pin(322.34, 149.56, 'map_p4.png', .3);
  pin(161.72, 59.25, 'map_p5.png', .3);                                   // Barilla Rotini
  let sauceImg;
  const sauce = pin(159.63, 119.26, null, 1, g => { sauceImg = img('map_p6.png', 5.78, 5.78, 32, 32, g); }, '#007858');   // destination: pasta sauce
  pin(139.9, 204.73, null, .3, g => img('map_p7.png', -8.87, -1.55, 61.3, 45.97, g));
  pin(91.48, 14.52, 'map_p8.png', .3);
  pin(146.65, 14.52, 'map_p9.png', .3);
  [['map_cp0.svg', 441.46 + 3.565, 160.7 + 6.617, 13.068, 6.806, -88.57], ['map_cp1.svg', 394.8 + 4.221, 213.25 + 6.505, 12, 6, 102.43],
   ['map_cp2.svg', 328.8 + 7.2, 143.73 + 5.325, 12.976, 6.356, 158.62], ['map_pin3.svg', 184.95 + 6.35, 95.92 + 6.35, 9.754, 8.214, -45],
   ['map_cp3.svg', 88.64 + 6.17, 15.38 + 6.85, 13.068, 5.496, 127.77], ['map_cp4.svg', 188.4 + 3.6, 28.45 + 6.6, 13.2, 7.2, -90],
   ['map_cp5.svg', 398.4 + 3.6, 102.3 + 6.6, 13.2, 7.2, 90]].forEach(([n, cx, cy, w, h, d]) => small(n, cx, cy, w, h, d));
  // pins: everything is lit in the list view; only the selected item stays lit while navigating
  function pinMode() {
    pins.forEach(p => { p.style.opacity = state === 'list' || p === sauce ? 1 : .3; });
    ptrs.forEach(p => { p.e.style.opacity = state === 'list' || p.sauce ? 1 : .3; });
    sauce.ring.setAttribute('stroke', state === 'detail' ? '#007858' : '#0d720d');
    const [x, y, w] = state === 'detail' ? [5.78, 5.78, 32] : [3.63, 3.63, 36.3];
    sauceImg.setAttribute('x', x); sauceImg.setAttribute('y', y); sauceImg.setAttribute('width', w); sauceImg.setAttribute('height', w);
  }
  pinMode();

  // --- walkable network: bottom cross aisle, 11 aisles, entrance riser ---
  const HY = 240.86, X_ENT = 484.2, ENT_Y = 285.15, X7 = 183.6, DEST_Y = 164.06, H_MIN = 53.7, H_MAX = X_ENT;
  const CORR = [];
  for (let i = 0; i < 11; i++) CORR.push({ x: X7 + (i - 4) * 32.396, top: i === 4 ? DEST_Y : i < 8 ? 62 : 103, bottom: HY });
  CORR.push({ x: X_ENT, top: HY, bottom: ENT_Y, entrance: true });

  const dedupe = pts => pts.filter((p, i) => !i || Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) > .01);
  // route from a position on the network to the destination (bottom of the pin in Aisle 7)
  function routePts(p) {
    const pts = [[p.x, p.y]];
    if (Math.abs(p.y - HY) > .01) {
      if (Math.abs(p.x - X7) < .01) return dedupe([[p.x, p.y], [X7, DEST_Y]]);
      pts.push([p.x, HY]);
    }
    pts.push([X7, HY], [X7, DEST_Y]);
    return dedupe(pts);
  }
  function pathD(pts, r = 7.2) {
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i - 1], [bx, by] = pts[i], [cx, cy] = pts[i + 1];
      const l1 = Math.hypot(bx - ax, by - ay), l2 = Math.hypot(cx - bx, cy - by), rr = Math.min(r, l1 / 2, l2 / 2);
      d += ` L${bx - (bx - ax) / l1 * rr} ${by - (by - ay) / l1 * rr} Q${bx} ${by} ${bx + (cx - bx) / l2 * rr} ${by + (cy - by) / l2 * rr}`;
    }
    const e = pts[pts.length - 1]; return d + ` L${e[0]} ${e[1]}`;
  }

  const routeG = el('g', { id: 'routeG' });
  const route = el('path', { fill: 'none', stroke: '#007858', 'stroke-width': 4.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, routeG);
  let L = 0;
  const setRoute = pts => { route.setAttribute('d', pathD(pts)); L = route.getTotalLength(); route.style.strokeDasharray = `${L} ${L}`; };
  const chevrons = [];
  for (let k = 0; k < 14; k++) {
    const g = el('g', {}, routeG); el('path', { d: 'M-2 -3 L2 0 L-2 3', fill: 'none', stroke: '#fff', 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    chevrons.push(g);
  }
  const user = el('g');
  el('circle', { class: 'pulse', r: 6, fill: '#37AADF' }, user);
  const cone = el('g', {}, user);
  // heading arrow: the triangle sits flush against the dot and points where the phone is facing
  el('path', { d: 'M0 -12 L4.5 -4 L-4.5 -4 Z', fill: '#37AADF', stroke: '#fff', 'stroke-width': 1.2, 'stroke-linejoin': 'round', style: 'filter: drop-shadow(0 .6px 1.5px rgba(0,0,0,.3))' }, cone);
  el('circle', { r: 6, fill: '#fff', style: 'filter: drop-shadow(0 .6px 2px rgba(0,0,0,.3))' }, user);
  el('circle', { r: 4.7, fill: '#37AADF' }, user);

  const MANUAL_SPEED = 60;                   // keyboard walk speed
  let mode = 'manual', pos = { x: 332.7, y: HY }, s = 0, heading = -90, face = -90, raf = 0, t0 = 0, lastT = 0;
  const keys = { left: false, right: false, up: false, down: false };
  const pt = v => route.getPointAtLength(Math.max(0, Math.min(L, v)));
  const angDiff = (a, b) => ((a - b + 540) % 360) - 180;

  function place() {
    let p;
    if (mode === 'auto') {
      p = pt(s); const a = pt(s + 3), b = pt(s - 3);
      face = Math.atan2(a.y - b.y, a.x - b.x) * 180 / Math.PI;
    } else p = pos;
    heading += angDiff(face, heading) * .25;
    user.setAttribute('transform', `translate(${p.x} ${p.y})`);
    cone.setAttribute('transform', `rotate(${heading + 90})`);
    const base = mode === 'auto' ? s : 0;
    route.style.strokeDashoffset = -base;     // only the route ahead is drawn
    chevrons.forEach((g, k) => {
      const q = L - 40 - 80 * k;              // anchored to the destination so they stay put while you walk
      if (q <= base + 10 || q < 0) { g.style.display = 'none'; return; }
      const c = pt(q), a2 = pt(q + 2), b2 = pt(q - 2);
      g.setAttribute('transform', `translate(${c.x} ${c.y}) rotate(${Math.atan2(a2.y - b2.y, a2.x - b2.x) * 180 / Math.PI})`);
      g.style.display = '';
    });
  }

  // Start on the cross aisle, right above the Checkout area; no auto-walk, the arrow keys drive
  const START = { x: 332.7, y: HY };
  function start() {
    cancelAnimationFrame(raf); raf = 0; mode = 'manual'; heading = face = 180;
    pos = { ...START }; setRoute(routePts(pos));
    place();
  }

  // --- keyboard: arrow keys walk the user along the aisles; the route re-plans from wherever they are ---
  function snapToNetwork(p) {
    let best = { d: Math.abs(p.y - HY), x: Math.max(H_MIN, Math.min(H_MAX, p.x)), y: HY };
    CORR.forEach(c => { const y = Math.max(c.top, Math.min(c.bottom, p.y)), d = Math.abs(p.x - c.x) + Math.abs(p.y - y); if (d < best.d) best = { d, x: c.x, y }; });
    return { x: best.x, y: best.y };
  }
  function step(dx, dy, dist) {
    const onH = Math.abs(pos.y - HY) < .01;
    if (dx && onH) { pos.x = Math.max(H_MIN, Math.min(H_MAX, pos.x + dx * dist)); face = dx > 0 ? 0 : 180; return; }
    if (!dy) return;
    let c = CORR.find(c => Math.abs(pos.x - c.x) < .01 && pos.y >= c.top - .01 && pos.y <= c.bottom + .01);
    if (!c && onH) {                          // at the mouth of an aisle? turn into it (or down to the entrance)
      c = CORR.filter(c => Math.abs(pos.x - c.x) <= 10 && (dy < 0 ? !c.entrance : c.entrance)).sort((a, b) => Math.abs(pos.x - a.x) - Math.abs(pos.x - b.x))[0];
      if (c) pos.x = c.x;
    }
    if (c) { pos.y = Math.max(c.top, Math.min(c.bottom, pos.y + dy * dist)); face = dy < 0 ? -90 : 90; }
  }
  function manualFrame(t) {
    const dt = Math.min(.05, (t - lastT) / 1000); lastT = t;
    const dx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0), dy = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
    if (dx || dy) step(dx, dy, MANUAL_SPEED * dt);
    setRoute(routePts(pos)); place();
    raf = (dx || dy || Math.abs(angDiff(face, heading)) > 1) ? requestAnimationFrame(manualFrame) : 0;
  }
  const keyOf = e => ({ ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' })[e.key];
  window.addEventListener('keydown', e => {
    const k = keyOf(e); if (!k || document.getElementById('app').classList.contains('shelf-open')) return;
    e.preventDefault();
    keys[k] = true;
    if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(manualFrame); }
  });
  window.addEventListener('keyup', e => { const k = keyOf(e); if (k) keys[k] = false; });
  window.addEventListener('blur', () => { keys.left = keys.right = keys.up = keys.down = false; });
  start();

  // --- list <-> navigation state ---
  // zoom in on the route from the user to the selected item (a little closer than the full-store view)
  function fitRoute() {
    const pts = routePts(pos).concat([[X7, 119]]);
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const k = Math.max(1, Math.min(1.4, 430 / (maxX - minX + 120), 281 / (maxY - minY + 90)));
    const cl = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    return { k, x: cl(215 - (minX + maxX) / 2 * k, 430 - MAP_W * k, 0), y: cl(140.5 - (minY + maxY) / 2 * k, 311 - MAP_H * k, 0) };
  }
  function setState(s) {
    state = s; app.classList.toggle('state-detail', s === 'detail');
    if (s === 'detail') dv = fitRoute();
    goView(s === 'detail' ? detailView() : LIST_VIEW);
    pinMode(); place();
  }
  document.getElementById('navSauce').addEventListener('click', () => setState('detail'));
  document.getElementById('detailClose').addEventListener('click', () => setState('list'));

  // --- pan the map by dragging (navigation state only) ---
  let drag = null;
  const scale = () => Math.max(svg.clientWidth / 430, svg.clientHeight / 311);
  svg.addEventListener('pointerdown', e => { if (state !== 'detail') return; drag = { x: e.clientX, y: e.clientY, px: dv.x, py: dv.y, moved: false }; svg.setPointerCapture(e.pointerId); svg.classList.add('dragging'); });
  svg.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
    const k = scale();
    dv.x = Math.max(430 - MAP_W * dv.k, Math.min(0, drag.px + dx / k));
    dv.y = Math.max(311 - MAP_H * dv.k, Math.min(0, drag.py + dy / k));
    view = { ...dv }; applyView();
  });
  const up = () => { if (!drag) return; const moved = drag.moved; drag = null; svg.classList.remove('dragging'); };
  svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', () => { drag = null; svg.classList.remove('dragging'); });
})();

/* Finger-tap indicator that follows the mouse over the phone (mouse only; real touches show nothing extra) */
(() => {
  const app = document.getElementById('app');
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const finger = document.createElement('div'); finger.className = 'finger'; app.appendChild(finger);
  const at = e => { const r = app.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  // position uses the 'translate' property (not 'transform') so the press-scale can't shrink it toward the origin
  const move = e => { if (e.pointerType === 'touch') return; const [x, y] = at(e); finger.style.translate = `${x}px ${y}px`; finger.classList.add('on'); };
  app.addEventListener('pointermove', move);
  app.addEventListener('pointerenter', move);
  app.addEventListener('pointerleave', () => { finger.classList.remove('on', 'down'); });
  app.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') return;
    move(e); finger.classList.add('down');
    const [x, y] = at(e), rp = document.createElement('div');
    rp.className = 'tap-ripple'; rp.style.left = x + 'px'; rp.style.top = y + 'px'; app.appendChild(rp);
    rp.addEventListener('animationend', () => rp.remove());
  }, true);
  window.addEventListener('pointerup', () => finger.classList.remove('down'));
})();
