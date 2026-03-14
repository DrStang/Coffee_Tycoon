// ═══════════════════════════════════════════
// COFFEE TYCOON — PixiJS + DOM Hybrid Engine
// v3 — Fixed clicks, prestige system
// ═══════════════════════════════════════════

// ── CONSTANTS ──
const GROWTH = [
  { name: "Seed", color: 0x8B6914, time: 3500, scale: 0.3, sym: "●" },
  { name: "Sprout", color: 0x66BB6A, time: 4000, scale: 0.5, sym: "↑" },
  { name: "Bush", color: 0x388E3C, time: 4500, scale: 0.7, sym: "♣" },
  { name: "Bloom", color: 0xEC407A, time: 3500, scale: 0.85, sym: "✿" },
  { name: "Cherry", color: 0xE53935, time: 0, scale: 1.0, sym: "●" },
];

const FARM_UPS = [
  { name: "Backyard Plot", cost: 0, grow: 1, slots: 8, auto: false, autoMs: 0 },
  { name: "Small Farm", cost: 80, grow: 1.3, slots: 12, auto: false, autoMs: 0 },
  { name: "Plantation", cost: 400, grow: 1.7, slots: 16, auto: true, autoMs: 3000 },
  { name: "Estate", cost: 1500, grow: 2.2, slots: 20, auto: true, autoMs: 1500 },
  { name: "Global Network", cost: 6000, grow: 3.0, slots: 25, auto: true, autoMs: 800 },
  { name: "Orbital Garden", cost: 25000, grow: 4.0, slots: 30, auto: true, autoMs: 400 },
];

const ROAST_UPS = [
  { name: "Frying Pan", cost: 0, batch: 3, speed: 5500 },
  { name: "Popcorn Popper", cost: 120, batch: 5, speed: 4500 },
  { name: "Drum Roaster", cost: 500, batch: 8, speed: 3500 },
  { name: "Commercial", cost: 2000, batch: 14, speed: 2500 },
  { name: "AI Roaster", cost: 8000, batch: 22, speed: 1800 },
  { name: "Quantum", cost: 35000, batch: 35, speed: 1000 },
];

const BREW_UPS = [
  { name: "French Press", cost: 0, batch: 2, speed: 5000 },
  { name: "Pour Over", cost: 140, batch: 3, speed: 4200 },
  { name: "Drip Machine", cost: 600, batch: 5, speed: 3200 },
  { name: "Espresso", cost: 2500, batch: 8, speed: 2500 },
  { name: "Barista Bot", cost: 10000, batch: 14, speed: 1800 },
  { name: "Molecular", cost: 40000, batch: 24, speed: 1000 },
];

const SHOP_UPS = [
  { name: "Sidewalk Cart", cost: 0, mult: 1, cap: 3, spawn: 5500 },
  { name: "Tiny Kiosk", cost: 250, mult: 1.4, cap: 5, spawn: 4500 },
  { name: "Cozy Café", cost: 1000, mult: 2, cap: 8, spawn: 3500 },
  { name: "Trendy Spot", cost: 4000, mult: 3, cap: 12, spawn: 2800 },
  { name: "Chain Store", cost: 18000, mult: 5, cap: 16, spawn: 2200 },
  { name: "Coffee Empire", cost: 60000, mult: 8, cap: 22, spawn: 1500 },
];

const DRINKS = [
  { name: "Black Coffee", cups: 1, price: 3, unlock: 0, emoji: "☕", color: "#5D4037" },
  { name: "Latte", cups: 2, price: 7, unlock: 150, emoji: "🥛", color: "#BCAAA4" },
  { name: "Cappuccino", cups: 2, price: 9, unlock: 500, emoji: "☕", color: "#8D6E63" },
  { name: "Mocha", cups: 3, price: 14, unlock: 1800, emoji: "🍫", color: "#4E342E" },
  { name: "Cold Brew", cups: 2, price: 11, unlock: 4000, emoji: "🧊", color: "#78909C" },
  { name: "Affogato", cups: 3, price: 18, unlock: 10000, emoji: "🍨", color: "#FFF9C4" },
  { name: "Espresso Martini", cups: 4, price: 28, unlock: 25000, emoji: "🍸", color: "#880E4F" },
  { name: "Golden Latte", cups: 5, price: 45, unlock: 60000, emoji: "✨", color: "#FFD54F" },
];

const CUSTS = [
  { e: "👩", n: "Emma" }, { e: "👨", n: "Jake" }, { e: "👵", n: "Nana" }, { e: "🧑", n: "Alex" },
  { e: "👩‍💼", n: "Diana" }, { e: "👨‍💼", n: "Marcus" }, { e: "👧", n: "Lily" }, { e: "👦", n: "Sam" },
  { e: "🧓", n: "Earl" }, { e: "👩‍🎨", n: "Frida" }, { e: "🧔", n: "Hank" }, { e: "👩‍🍳", n: "Rosa" },
];

const ACHS = [
  { id: "fp", name: "Green Thumb", desc: "Pick first cherry", icon: "🌱" },
  { id: "fs", name: "First Sip", desc: "Serve a customer", icon: "🎉" },
  { id: "p50", name: "Harvester", desc: "Pick 50 cherries", icon: "🌾" },
  { id: "s50", name: "Popular", desc: "Serve 50 customers", icon: "⭐" },
  { id: "s200", name: "Beloved", desc: "Serve 200 customers", icon: "💖" },
  { id: "e1k", name: "Thousandaire", desc: "Earn $1K total", icon: "💵" },
  { id: "e10k", name: "Big Money", desc: "Earn $10K total", icon: "💎" },
  { id: "e100k", name: "Coffee Baron", desc: "Earn $100K total", icon: "👑" },
  { id: "ah", name: "Automation", desc: "Unlock auto-harvest", icon: "🤖" },
  { id: "ad", name: "Full Menu", desc: "All drinks unlocked", icon: "📋" },
  { id: "sd", name: "Speed Demon", desc: "5 serves in 10s", icon: "⚡" },
  { id: "mx", name: "Perfectionist", desc: "Max any station", icon: "🏆" },
  { id: "pr", name: "Reborn", desc: "Prestige once", icon: "🔄" },
];

// ── PRESTIGE CONSTANTS ──
const PRESTIGE_THRESHOLD = 10000; // minimum total earned to prestige
function calcPrestigeStars(totalEarned) {
  // Stars = floor(sqrt(totalEarned / 5000))
  return Math.floor(Math.sqrt(totalEarned / 5000));
}
function prestigeMultiplier(stars) {
  // Each star = +15% to all income
  return 1 + stars * 0.15;
}

// ── UTILS ──
let _uid = 0;
const uid = () => ++_uid;
const fmt = n => n >= 1e6 ? `$${(n/1e6).toFixed(1)}M` : n >= 1e3 ? `$${(n/1e3).toFixed(1)}K` : `$${Math.floor(n)}`;
const pick = a => a[Math.floor(Math.random() * a.length)];
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// ── GAME STATE ──
const G = {
  started: false,
  money: 0, totalEarned: 0, totalServed: 0, totalPicked: 0,
  rawBeans: 0, roastedBeans: 0, brewedCups: 0,
  farmLvl: 0, roastLvl: 0, brewLvl: 0, shopLvl: 0,
  plots: [], customers: [],
  unlockedDrinks: [0], achievements: [],
  isRoasting: false, roastProg: 0, roastTimer: 0,
  isBrewing: false, brewProg: 0, brewTimer: 0,
  autoTimer: 0, custSpawnTimer: 2000,
  recentServes: [],
  // Prestige
  prestigeStars: 0, // permanent multiplier stars
  lifetimeEarned: 0, // never resets, across all prestiges
  prestigeCount: 0,
  // UI
  tab: "farm", floats: [],
  achPopup: null, achPopupTimer: 0,
  notif: null, notifTimer: 0,
};

// ── HELPERS ──
const farm = () => FARM_UPS[G.farmLvl];
const roaster = () => ROAST_UPS[G.roastLvl];
const brewer = () => BREW_UPS[G.brewLvl];
const shop = () => SHOP_UPS[G.shopLvl];
const pMult = () => prestigeMultiplier(G.prestigeStars);

function initPlots() {
  const target = farm().slots;
  while (G.plots.length < target)
    G.plots.push({ id: uid(), stage: 0, start: performance.now(), flash: 0 });
}

// ── SAVE/LOAD ──
function save() {
  try {
    localStorage.setItem('ct_save', JSON.stringify({
      m: G.money, te: G.totalEarned, ts: G.totalServed, tp: G.totalPicked,
      rb: G.rawBeans, ro: G.roastedBeans, bc: G.brewedCups,
      fl: G.farmLvl, rl: G.roastLvl, bl: G.brewLvl, sl: G.shopLvl,
      ach: G.achievements, ud: G.unlockedDrinks,
      ps: G.prestigeStars, le: G.lifetimeEarned, pc: G.prestigeCount,
      t: Date.now(),
    }));
  } catch (e) { }
}

function load() {
  try {
    const r = localStorage.getItem('ct_save');
    if (!r) return false;
    const d = JSON.parse(r);
    G.money = d.m || 0; G.totalEarned = d.te || 0; G.totalServed = d.ts || 0; G.totalPicked = d.tp || 0;
    G.rawBeans = d.rb || 0; G.roastedBeans = d.ro || 0; G.brewedCups = d.bc || 0;
    G.farmLvl = d.fl || 0; G.roastLvl = d.rl || 0; G.brewLvl = d.bl || 0; G.shopLvl = d.sl || 0;
    G.achievements = d.ach || []; G.unlockedDrinks = d.ud || [0];
    G.prestigeStars = d.ps || 0; G.lifetimeEarned = d.le || 0; G.prestigeCount = d.pc || 0;
    if (d.t) {
      const away = (Date.now() - d.t) / 1000;
      if (away > 30) {
        const idle = Math.floor(away * 0.5 * (G.shopLvl + 1) * pMult());
        if (idle > 0) { G.money += idle; G.totalEarned += idle; G.lifetimeEarned += idle; notify(`Welcome back! Earned ${fmt(idle)} while away.`); }
      }
    }
    return true;
  } catch (e) { return false; }
}

// ── PRESTIGE ──
function doPrestige() {
  const newStars = calcPrestigeStars(G.totalEarned);
  if (newStars < 1) return;
  G.prestigeStars += newStars;
  G.prestigeCount++;
  // Reset progress but keep prestige stars, achievements, lifetime
  G.money = 0; G.totalEarned = 0; G.totalServed = 0; G.totalPicked = 0;
  G.rawBeans = 0; G.roastedBeans = 0; G.brewedCups = 0;
  G.farmLvl = 0; G.roastLvl = 0; G.brewLvl = 0; G.shopLvl = 0;
  G.plots = []; G.customers = []; G.unlockedDrinks = [0];
  G.isRoasting = false; G.isBrewing = false;
  G.roastProg = 0; G.brewProg = 0;
  initPlots();
  grantAch("pr");
  notify(`✨ Prestige! +${newStars} stars (×${pMult().toFixed(2)} income)`);
  save();
}

// ── ACHIEVEMENTS ──
function grantAch(id) {
  if (G.achievements.includes(id)) return;
  G.achievements.push(id);
  const a = ACHS.find(x => x.id === id);
  if (a) { G.achPopup = a; G.achPopupTimer = 3000; }
}

function checkAchs() {
  if (G.totalPicked >= 1) grantAch("fp");
  if (G.totalPicked >= 50) grantAch("p50");
  if (G.totalServed >= 1) grantAch("fs");
  if (G.totalServed >= 50) grantAch("s50");
  if (G.totalServed >= 200) grantAch("s200");
  if (G.totalEarned >= 1000) grantAch("e1k");
  if (G.totalEarned >= 10000) grantAch("e10k");
  if (G.totalEarned >= 100000) grantAch("e100k");
  if (farm().auto) grantAch("ah");
  if (G.unlockedDrinks.length === DRINKS.length) grantAch("ad");
  if ([G.farmLvl, G.roastLvl, G.brewLvl, G.shopLvl].some((l, i) => l >= [FARM_UPS, ROAST_UPS, BREW_UPS, SHOP_UPS][i].length - 1)) grantAch("mx");
}

function notify(msg) { G.notif = msg; G.notifTimer = 3500; }

// ── GAME UPDATE ──
let lastT = 0, saveT = 0;

function update(now) {
  if (!G.started) return;
  const dt = lastT ? now - lastT : 16;
  lastT = now;

  const f = farm(), r = roaster(), b = brewer(), s = shop();

  // Grow plots
  for (const p of G.plots) {
    if (p.stage >= GROWTH.length - 1) continue;
    if (now - p.start >= GROWTH[p.stage].time / f.grow) { p.stage++; p.start = now; }
    if (p.flash > 0) p.flash -= dt;
  }

  // Auto-harvest
  if (f.auto) {
    G.autoTimer -= dt;
    if (G.autoTimer <= 0) {
      G.autoTimer = f.autoMs;
      const ripe = G.plots.find(p => p.stage >= GROWTH.length - 1);
      if (ripe) { ripe.stage = 0; ripe.start = now; ripe.flash = 300; G.rawBeans++; G.totalPicked++; }
    }
  }

  // Auto-roast
  if (G.isRoasting) {
    G.roastTimer -= dt;
    G.roastProg = clamp(1 - G.roastTimer / r.speed, 0, 1);
    if (G.roastTimer <= 0) { G.isRoasting = false; G.roastedBeans += r.batch; G.roastProg = 0; }
  } else if (G.rawBeans >= r.batch) {
    G.rawBeans -= r.batch; G.isRoasting = true; G.roastTimer = r.speed; G.roastProg = 0;
  }

  // Auto-brew
  if (G.isBrewing) {
    G.brewTimer -= dt;
    G.brewProg = clamp(1 - G.brewTimer / b.speed, 0, 1);
    if (G.brewTimer <= 0) { G.isBrewing = false; G.brewedCups += b.batch; G.brewProg = 0; }
  } else if (G.roastedBeans >= b.batch) {
    G.roastedBeans -= b.batch; G.isBrewing = true; G.brewTimer = b.speed; G.brewProg = 0;
  }

  // Spawn customers
  G.custSpawnTimer -= dt;
  if (G.custSpawnTimer <= 0) {
    G.custSpawnTimer = s.spawn;
    if (G.customers.length < s.cap) {
      const di = pick(G.unlockedDrinks), d = DRINKS[di];
      const tip = Math.random() < .12 ? 2 : Math.random() < .3 ? 1.5 : 1;
      G.customers.push({ id: uid(), di, look: pick(CUSTS), price: Math.round(d.price * s.mult * tip * pMult()), patience: 100, tip });
    }
  }

  // Patience
  for (let i = G.customers.length - 1; i >= 0; i--) {
    G.customers[i].patience -= (dt / 1000) * 3;
    if (G.customers[i].patience <= 0) G.customers.splice(i, 1);
  }

  // Unlock drinks
  for (let i = 0; i < DRINKS.length; i++) {
    if (G.totalEarned >= DRINKS[i].unlock && !G.unlockedDrinks.includes(i)) {
      G.unlockedDrinks.push(i); G.unlockedDrinks.sort((a, b) => a - b);
      notify(`🎉 New drink: ${DRINKS[i].name}!`);
    }
  }

  // Floats
  for (let i = G.floats.length - 1; i >= 0; i--) { G.floats[i].life -= dt; if (G.floats[i].life <= 0) G.floats.splice(i, 1); }

  // Popups
  if (G.achPopupTimer > 0) { G.achPopupTimer -= dt; if (G.achPopupTimer <= 0) G.achPopup = null; }
  if (G.notifTimer > 0) { G.notifTimer -= dt; if (G.notifTimer <= 0) G.notif = null; }

  // Save
  saveT -= dt; if (saveT <= 0) { saveT = 15000; save(); }

  checkAchs();
}

// ── PIXI SETUP ──
let app = null, farmGfx = null, particleGfx = null;
let plotData = []; // { gfx, txt, bar } per plot
let particles = [];

async function initPixi() {
  const canvas = document.getElementById("game-canvas");
  app = new PIXI.Application();
  await app.init({ canvas, resizeTo: window, backgroundColor: 0x0d0a07, antialias: true, resolution: window.devicePixelRatio || 1, autoDensity: true });
  farmGfx = new PIXI.Container(); app.stage.addChild(farmGfx);
  particleGfx = new PIXI.Container(); app.stage.addChild(particleGfx);
  app.ticker.add(t => { update(performance.now()); renderCanvas(t.deltaMS); });
}

function spawnPart(x, y, color, n = 4) {
  for (let i = 0; i < n; i++) particles.push({ x, y, vx: (Math.random() - .5) * 3, vy: -Math.random() * 4 - 1, life: 600 + Math.random() * 400, max: 800, sz: 2 + Math.random() * 3, color });
}

function renderCanvas(dt) {
  const cv = document.getElementById("game-canvas");
  if (!G.started || G.tab !== "farm") { cv.classList.remove("visible"); farmGfx.visible = false; return; }
  cv.classList.add("visible"); farmGfx.visible = true;

  const W = app.screen.width, H = app.screen.height;
  const f = farm(), np = G.plots.length;
  const cols = Math.min(6, Math.ceil(Math.sqrt(np * 1.5))), rows = Math.ceil(np / cols);
  const padT = 72, padB = 140;
  const aW = W - 40, aH = H - padT - padB;
  const cell = Math.min(aW / cols, aH / rows, 60);
  const gap = Math.min(6, cell * .1), ps = cell - gap;
  const ox = (W - cols * cell) / 2 + gap / 2, oy = padT + (aH - rows * cell) / 2 + gap / 2;
  const now = performance.now();

  // Ensure sprites
  while (plotData.length < np) {
    const g = new PIXI.Graphics(), t = new PIXI.Text({ text: "", style: { fontSize: 22, fill: 0xffffff } }), b = new PIXI.Graphics();
    t.anchor.set(.5); farmGfx.addChild(g); farmGfx.addChild(t); farmGfx.addChild(b);
    plotData.push({ gfx: g, txt: t, bar: b, hx: 0, hy: 0, hw: 0, hh: 0, plotId: 0, ready: false });
  }
  for (let i = np; i < plotData.length; i++) { plotData[i].gfx.visible = false; plotData[i].txt.visible = false; plotData[i].bar.visible = false; }

  for (let i = 0; i < np; i++) {
    const plot = G.plots[i], d = plotData[i];
    const col = i % cols, row = Math.floor(i / cols);
    const x = ox + col * cell, y = oy + row * cell;
    const stg = GROWTH[plot.stage], ready = plot.stage >= GROWTH.length - 1;
    const pulse = ready ? .6 + Math.sin(now / 400) * .4 : 0;

    d.gfx.visible = true; d.gfx.clear();
    d.gfx.roundRect(x, y, ps, ps, 7);
    d.gfx.fill({ color: ready ? 0x3a1508 : (plot.flash > 0 ? 0x2a3a15 : 0x1a0f05) });
    d.gfx.roundRect(x, y, ps, ps, 7);
    d.gfx.stroke({ color: ready ? 0xE53935 : 0x2a1c12, width: ready ? 2 : 1, alpha: ready ? .5 + pulse * .5 : .4 });
    if (ready) { d.gfx.roundRect(x - 2, y - 2, ps + 4, ps + 4, 9); d.gfx.stroke({ color: 0xE53935, width: 1, alpha: pulse * .25 }); }

    d.txt.visible = true; d.txt.text = stg.sym;
    d.txt.style.fontSize = Math.floor(ps * .38); d.txt.style.fill = stg.color;
    d.txt.x = x + ps / 2; d.txt.y = y + ps / 2 - 1;
    d.txt.scale.set(stg.scale * (ready ? 1 + Math.sin(now / 300) * .06 : 1));

    d.bar.visible = !ready; d.bar.clear();
    if (!ready) {
      const prog = clamp((now - plot.start) / (GROWTH[plot.stage].time / f.grow), 0, 1);
      const bw = ps - 6;
      d.bar.roundRect(x + 3, y + ps - 4, bw, 3, 1); d.bar.fill({ color: 0x0d0a07 });
      d.bar.roundRect(x + 3, y + ps - 4, bw * prog, 3, 1); d.bar.fill({ color: stg.color, alpha: .8 });
    }

    d.hx = x; d.hy = y; d.hw = ps; d.hh = ps; d.plotId = plot.id; d.ready = ready;
  }

  // Particles
  particleGfx.removeChildren();
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]; p.life -= dt; p.x += p.vx; p.y += p.vy; p.vy += .08;
    if (p.life <= 0) { particles.splice(i, 1); continue; }
    const a = clamp(p.life / p.max, 0, 1);
    const pg = new PIXI.Graphics(); pg.circle(0, 0, p.sz * a); pg.fill({ color: p.color, alpha: a }); pg.x = p.x; pg.y = p.y;
    particleGfx.addChild(pg);
  }
}

// ── CANVAS CLICK ──
function onCanvasClick(e) {
  if (!G.started || G.tab !== "farm") return;
  let cx, cy;
  if (e.touches) { cx = e.touches[0].clientX; cy = e.touches[0].clientY; }
  else { cx = e.clientX; cy = e.clientY; }

  const rect = app.canvas.getBoundingClientRect();
  const mx = (cx - rect.left) / rect.width * app.screen.width;
  const my = (cy - rect.top) / rect.height * app.screen.height;

  for (const d of plotData) {
    if (!d.gfx.visible || !d.ready) continue;
    if (mx >= d.hx && mx <= d.hx + d.hw && my >= d.hy && my <= d.hy + d.hh) {
      const plot = G.plots.find(p => p.id === d.plotId);
      if (plot) {
        plot.stage = 0; plot.start = performance.now(); plot.flash = 300;
        G.rawBeans++; G.totalPicked++;
        spawnPart(d.hx + d.hw / 2, d.hy + d.hh / 2, 0xE53935);
        G.floats.push({ id: uid(), x: cx, y: cy, text: "+1 🫘", color: "#E53935", life: 900 });
      }
      break;
    }
  }
}

// ── DOM HUD ──
let lastHud = 0;
function hudLoop() {
  const now = performance.now();
  if (now - lastHud > 200) { lastHud = now; renderHud(); }
  renderFloats();
  requestAnimationFrame(hudLoop);
}

function renderHud() {
  const $ = id => document.getElementById(id);
  $("hud-money").textContent = `💰 ${fmt(G.money)}`;
  $("pip-raw").textContent = G.rawBeans;
  $("pip-roasted").textContent = G.roastedBeans;
  $("pip-cups").textContent = G.brewedCups;

  // Prestige display
  const pEl = $("pip-prestige");
  if (G.prestigeStars > 0) { pEl.style.display = "flex"; pEl.textContent = `⭐${G.prestigeStars} (×${pMult().toFixed(2)})`; }
  else { pEl.style.display = "none"; }

  // Badges
  const rc = G.plots.filter(p => p.stage >= GROWTH.length - 1).length;
  setBadge("badge-farm", rc);
  setBadge("badge-shop", G.customers.length);

  // Panel
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  const panel = $(`panel-${G.tab}`);
  if (panel) panel.classList.add("active");

  if (G.tab === "farm") renderFarm();
  else if (G.tab === "process") renderProcess();
  else if (G.tab === "shop") renderShop();
  else if (G.tab === "menu") renderMenu();
  else if (G.tab === "stats") renderStats();

  // Popups
  const ap = $("ach-popup");
  if (G.achPopup) { ap.style.display = "flex"; ap.innerHTML = `<span style="font-size:20px">${G.achPopup.icon}</span><div><div style="font-size:8px;opacity:.7;letter-spacing:1px">ACHIEVEMENT</div>${G.achPopup.name}</div>`; }
  else ap.style.display = "none";

  const nf = $("notification");
  if (G.notif) { nf.style.display = "block"; nf.textContent = G.notif; } else nf.style.display = "none";
}

function setBadge(id, n) {
  const el = document.getElementById(id);
  if (n > 0) { el.style.display = "block"; el.textContent = n; } else el.style.display = "none";
}

function renderFarm() {
  const el = document.getElementById("farm-content"), f = farm(), next = FARM_UPS[G.farmLvl + 1];
  const rc = G.plots.filter(p => p.stage >= GROWTH.length - 1).length;
  let h = `<div class="panel-header"><div><div class="panel-title">${f.name}</div><div class="panel-subtitle">Tap 🔴 to pick! • ${rc} ready</div></div>`;
  if (f.auto) h += `<div class="auto-harvest-badge"><span class="dot"></span>AUTO-PICK</div>`;
  h += `</div>`;
  // Spacer so info sits below canvas plots
  h += `<div style="height:${Math.max(20, window.innerHeight - 310)}px"></div>`;
  h += `<div class="info-box"><strong>Growth:</strong> ×${f.grow} • <strong style="color:#E53935">Ripe:</strong> ${rc} • <strong>Raw:</strong> ${G.rawBeans}`;
  if (f.auto) h += `<br>🤖 <span style="color:var(--green)">Auto-pick every ${(f.autoMs/1000).toFixed(1)}s</span>`;
  h += `</div>`;
  if (next) {
    const ok = G.money >= next.cost;
    h += `<button class="btn btn-primary" style="margin-top:8px;background:${ok?'linear-gradient(135deg,var(--green),var(--green-dark))':'var(--bg-dark)'};color:${ok?'#fff':'var(--text-muted)'}" onclick="doUpgrade('farm')" ${ok?'':'disabled'}>⬆ ${next.name} — ${fmt(next.cost)}${next.auto&&!f.auto?' 🤖 Auto-harvest!':''}</button>`;
  }
  el.innerHTML = h;
}

function renderProcess() {
  const el = document.getElementById("process-content"), r = roaster(), b = brewer();
  const nr = ROAST_UPS[G.roastLvl + 1], nb = BREW_UPS[G.brewLvl + 1];
  el.innerHTML = `
  <div class="station-card ${G.isRoasting?'processing':''}">
    <div class="station-header"><div class="station-name"><span class="emoji">🔥</span><div><div class="label">Roaster</div><div class="sublabel">Lv.${G.roastLvl+1} • ${r.batch} beans / ${(r.speed/1000).toFixed(1)}s</div></div></div>
    <div class="station-counts"><div class="count-box">🫘 <span style="color:var(--text-secondary)">${G.rawBeans}</span></div><span style="color:var(--text-muted)">→</span><div class="count-box">🟤 <span style="color:var(--text-secondary)">${G.roastedBeans}</span></div></div></div>
    <div class="progress-track"><div class="progress-fill" style="width:${G.roastProg*100}%;background:linear-gradient(90deg,var(--orange),#FF8F00)"></div></div>
    <div class="station-actions">${nr?`<button class="btn btn-upgrade" style="border-color:${G.money>=nr.cost?'var(--orange)':'var(--border)'};color:${G.money>=nr.cost?'var(--orange)':'var(--text-muted)'}" onclick="doUpgrade('roast')" ${G.money>=nr.cost?'':'disabled'}>⬆ ${nr.name} — ${fmt(nr.cost)}</button>`:'<span style="color:var(--gold);font-weight:700;font-size:10px">✨ MAX</span>'}</div>
  </div>
  <div style="text-align:center;font-size:16px;color:var(--text-muted);margin:2px 0">⬇</div>
  <div class="station-card ${G.isBrewing?'processing':''}">
    <div class="station-header"><div class="station-name"><span class="emoji">🫖</span><div><div class="label">Brewer</div><div class="sublabel">Lv.${G.brewLvl+1} • ${b.batch} roasted / ${(b.speed/1000).toFixed(1)}s</div></div></div>
    <div class="station-counts"><div class="count-box">🟤 <span style="color:var(--text-secondary)">${G.roastedBeans}</span></div><span style="color:var(--text-muted)">→</span><div class="count-box">☕ <span style="color:var(--text-secondary)">${G.brewedCups}</span></div></div></div>
    <div class="progress-track"><div class="progress-fill" style="width:${G.brewProg*100}%;background:linear-gradient(90deg,var(--blue),#1E88E5)"></div></div>
    <div class="station-actions">${nb?`<button class="btn btn-upgrade" style="border-color:${G.money>=nb.cost?'var(--blue)':'var(--border)'};color:${G.money>=nb.cost?'var(--blue)':'var(--text-muted)'}" onclick="doUpgrade('brew')" ${G.money>=nb.cost?'':'disabled'}>⬆ ${nb.name} — ${fmt(nb.cost)}</button>`:'<span style="color:var(--gold);font-weight:700;font-size:10px">✨ MAX</span>'}</div>
  </div>
  <div class="info-box">Processing runs automatically when materials are ready!</div>`;
}

function renderShop() {
  const el = document.getElementById("shop-content"), s = shop(), ns = SHOP_UPS[G.shopLvl + 1];
  let h = `<div class="panel-header"><div><div class="panel-title">${s.name}</div><div class="panel-subtitle">${G.customers.length}/${s.cap} customers • ×${s.mult} price${G.prestigeStars>0?` • ×${pMult().toFixed(2)} prestige`:''}</div></div>`;
  if (ns) h += `<button class="btn btn-upgrade" style="border-color:${G.money>=ns.cost?'var(--purple)':'var(--border)'};color:${G.money>=ns.cost?'var(--purple)':'var(--text-muted)'}" onclick="doUpgrade('shop')" ${G.money>=ns.cost?'':'disabled'}>⬆ ${fmt(ns.cost)}</button>`;
  h += `</div>`;
  if (G.customers.length === 0) {
    h += `<div style="text-align:center;padding:40px 0;color:var(--text-muted)"><div style="font-size:44px;margin-bottom:6px">🚶</div><div style="font-size:12px;color:var(--text-dim)">Waiting for customers...</div></div>`;
  } else {
    for (const c of G.customers) {
      const d = DRINKS[c.di], ok = G.brewedCups >= d.cups;
      const pc = c.patience > 60 ? 'var(--green)' : c.patience > 30 ? '#fbbf24' : 'var(--red)';
      h += `<div class="customer-card ${ok?'servable':''}" data-cid="${c.id}"><span class="customer-emoji">${c.look.e}</span><div class="customer-info"><div class="customer-name">${c.look.n}${c.tip>1?' ✨':''}</div><div class="customer-order"><span style="color:${d.color};font-size:12px">${d.emoji}</span>${d.name} <span style="color:var(--text-muted)">•</span> <span style="color:var(--green);font-weight:600">${fmt(c.price)}</span></div><div class="customer-patience"><div class="patience-fill" style="width:${c.patience}%;background:${pc}"></div></div></div>${ok?'<div class="serve-tag">SERVE →</div>':`<div class="need-tag">Need ${d.cups} ☕</div>`}</div>`;
    }
  }
  el.innerHTML = h;
}

function renderMenu() {
  const el = document.getElementById("menu-content");
  let h = `<div class="panel-title" style="margin-bottom:12px">Drink Menu</div>`;
  for (let i = 0; i < DRINKS.length; i++) {
    const d = DRINKS[i], u = G.unlockedDrinks.includes(i);
    h += `<div class="drink-row ${u?'':'locked'}"><div class="drink-icon" style="background:${u?d.color+'22':'var(--bg-dark)'};border:1px solid ${u?d.color+'33':'transparent'}">${u?d.emoji:'?'}</div><div style="flex:1"><div class="drink-name">${u?d.name:'???'}</div><div class="drink-cost">${u?`${d.cups} cups → $${d.price} base`:`Unlocks at ${fmt(d.unlock)} earned`}</div></div>${u?'<span class="drink-badge">UNLOCKED</span>':''}</div>`;
  }
  el.innerHTML = h;
}

function renderStats() {
  const el = document.getElementById("stats-content");
  // Prestige section
  const canPrestige = G.totalEarned >= PRESTIGE_THRESHOLD;
  const pendingStars = calcPrestigeStars(G.totalEarned);
  const newMult = prestigeMultiplier(G.prestigeStars + pendingStars);

  let h = `<div class="prestige-card">
    <div class="prestige-title">⭐ Prestige</div>
    <div class="prestige-desc">Reset all progress for permanent income multipliers. Your stars and achievements carry over forever.</div>
    <div class="prestige-reward"><span class="emoji">⭐</span><div>Current stars: <span class="value">${G.prestigeStars}</span> (×${pMult().toFixed(2)} income)</div></div>
    ${canPrestige ? `<div class="prestige-reward"><span class="emoji">🆕</span><div>Prestige now for: <span class="value">+${pendingStars} stars</span> → ×${newMult.toFixed(2)} income</div></div>` : `<div class="prestige-reward"><span class="emoji">🔒</span><div>Need <span class="value">${fmt(PRESTIGE_THRESHOLD)}</span> total earned (have ${fmt(G.totalEarned)})</div></div>`}
    <button class="prestige-btn ${canPrestige?'ready':''}" onclick="${canPrestige?'doPrestigeAction()':''}" ${canPrestige?'':'disabled'}>${canPrestige?`⭐ PRESTIGE (+${pendingStars} stars)`:'Not ready yet'}</button>
  </div>`;

  h += `<div class="panel-title" style="margin-bottom:10px">Achievements</div><div class="ach-grid">`;
  for (const a of ACHS) { const got = G.achievements.includes(a.id); h += `<div class="ach-card ${got?'earned':''}"><div class="ach-icon">${a.icon}</div><div class="ach-name">${a.name}</div><div class="ach-desc">${a.desc}</div></div>`; }
  h += `</div>`;

  h += `<div class="panel-title" style="margin-bottom:10px">Statistics</div><div class="stat-grid">`;
  for (const s of [
    { l: "Total Earned", v: fmt(G.totalEarned) }, { l: "Current Cash", v: fmt(G.money) },
    { l: "Served", v: G.totalServed }, { l: "Picked", v: G.totalPicked },
    { l: "Drinks", v: `${G.unlockedDrinks.length}/${DRINKS.length}` }, { l: "Achievements", v: `${G.achievements.length}/${ACHS.length}` },
    { l: "Prestige Stars", v: G.prestigeStars }, { l: "Prestiges", v: G.prestigeCount },
    { l: "Lifetime Earned", v: fmt(G.lifetimeEarned) }, { l: "Income Mult", v: `×${pMult().toFixed(2)}` },
  ]) h += `<div class="stat-box"><div class="stat-label">${s.l}</div><div class="stat-value">${s.v}</div></div>`;
  h += `</div>`;
  el.innerHTML = h;
}

function renderFloats() {
  const el = document.getElementById("floats-container"); el.innerHTML = "";
  for (const f of G.floats) {
    const pct = f.life / 900;
    const d = document.createElement("div"); d.className = "float-reward";
    d.style.cssText = `left:${f.x-25}px;top:${f.y-(1-pct)*45}px;opacity:${pct};color:${f.color}`;
    d.textContent = f.text; el.appendChild(d);
  }
}

// ── GLOBAL HANDLERS ──
window.doUpgrade = function (type) {
  const map = { farm: [() => G.farmLvl, v => G.farmLvl = v, FARM_UPS], roast: [() => G.roastLvl, v => G.roastLvl = v, ROAST_UPS], brew: [() => G.brewLvl, v => G.brewLvl = v, BREW_UPS], shop: [() => G.shopLvl, v => G.shopLvl = v, SHOP_UPS] };
  const [get, set, ups] = map[type];
  const next = ups[get() + 1];
  if (next && G.money >= next.cost) { G.money -= next.cost; set(get() + 1); if (type === "farm") initPlots(); }
};

window.serveCustomer = function (cid, e) {
  const idx = G.customers.findIndex(c => c.id === cid);
  if (idx === -1) return;
  const c = G.customers[idx], d = DRINKS[c.di];
  if (G.brewedCups < d.cups) return;
  G.brewedCups -= d.cups; G.money += c.price; G.totalEarned += c.price; G.lifetimeEarned += c.price; G.totalServed++;
  G.customers.splice(idx, 1);
  const now = Date.now(); G.recentServes = G.recentServes.filter(t => now - t < 10000); G.recentServes.push(now);
  if (G.recentServes.length >= 5) grantAch("sd");
  G.floats.push({ id: uid(), x: e.clientX, y: e.clientY, text: `+${fmt(c.price)}`, color: "#4ade80", life: 900 });
};

window.setTab = function (t) {
  G.tab = t;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === t));
};

window.doPrestigeAction = function () {
  if (G.totalEarned < PRESTIGE_THRESHOLD) return;
  if (!confirm(`Prestige for +${calcPrestigeStars(G.totalEarned)} stars? All progress will reset but your stars and achievements are permanent.`)) return;
  doPrestige();
};

window.startGame = function () {
  document.getElementById("title-screen").style.display = "none";
  G.started = true; initPlots(); lastT = performance.now();
};

// ── INIT ──
async function init() {
  const hadSave = load();
  await initPixi();

  // Canvas clicks — use pointerdown only (covers mouse + touch)
  app.canvas.addEventListener("pointerdown", onCanvasClick);

  // Shop delegation
  document.getElementById("panel-shop").addEventListener("click", e => {
    const card = e.target.closest("[data-cid]");
    if (card) serveCustomer(parseInt(card.dataset.cid), e);
  });

  // Tab buttons
  document.querySelectorAll(".tab-btn").forEach(b => b.addEventListener("click", () => setTab(b.dataset.tab)));

  // Start
  document.getElementById("start-btn").addEventListener("click", startGame);
  if (hadSave) startGame();

  hudLoop();

  if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
}

init();
