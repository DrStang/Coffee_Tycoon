// ═══════════════════════════════════════════════
// COFFEE TYCOON — PixiJS + DOM Hybrid Game Engine
// ═══════════════════════════════════════════════

// ── PIXI.JS loaded via CDN in index.html ──

// ─────────────────────────────────────────
// GAME CONSTANTS
// ─────────────────────────────────────────

const GROWTH = [
  { name: "Seed",      color: 0x8B6914, time: 3500, scale: 0.3, symbol: "●" },
  { name: "Sprout",    color: 0x66BB6A, time: 4000, scale: 0.5, symbol: "↑" },
  { name: "Bush",      color: 0x388E3C, time: 4500, scale: 0.7, symbol: "♣" },
  { name: "Flowering", color: 0xEC407A, time: 3500, scale: 0.85, symbol: "✿" },
  { name: "Cherry",    color: 0xE53935, time: 0,    scale: 1.0, symbol: "●" },
];

const FARM_UPS = [
  { name: "Backyard Plot",   cost: 0,     growMult: 1,   slots: 8,  autoHarvest: false, autoRate: 0,    desc: "A humble start" },
  { name: "Small Farm",      cost: 80,    growMult: 1.3, slots: 12, autoHarvest: false, autoRate: 0,    desc: "Room to grow" },
  { name: "Plantation",      cost: 400,   growMult: 1.7, slots: 16, autoHarvest: true,  autoRate: 3000, desc: "Workers pick for you (slow)" },
  { name: "Estate",          cost: 1500,  growMult: 2.2, slots: 20, autoHarvest: true,  autoRate: 1500, desc: "Foremen keep it moving" },
  { name: "Global Network",  cost: 6000,  growMult: 3.0, slots: 25, autoHarvest: true,  autoRate: 800,  desc: "Instant global harvest" },
  { name: "Orbital Garden",  cost: 25000, growMult: 4.0, slots: 30, autoHarvest: true,  autoRate: 400,  desc: "Zero-G beans hit different" },
];

const ROASTER_UPS = [
  { name: "Frying Pan",         cost: 0,     batch: 3,  speed: 5500, desc: "Smoky and uneven" },
  { name: "Popcorn Popper",     cost: 120,   batch: 5,  speed: 4500, desc: "The OG hack" },
  { name: "Drum Roaster",       cost: 500,   batch: 8,  speed: 3500, desc: "Consistent heat" },
  { name: "Commercial Roaster", cost: 2000,  batch: 14, speed: 2500, desc: "Café-grade" },
  { name: "AI Roaster",         cost: 8000,  batch: 22, speed: 1800, desc: "Perfection every time" },
  { name: "Quantum Roaster",    cost: 35000, batch: 35, speed: 1000, desc: "Roasts across timelines" },
];

const BREWER_UPS = [
  { name: "French Press",     cost: 0,     batch: 2,  speed: 5000, desc: "Simple and honest" },
  { name: "Pour Over",        cost: 140,   batch: 3,  speed: 4200, desc: "Artisan craft" },
  { name: "Drip Machine",     cost: 600,   batch: 5,  speed: 3200, desc: "Reliable output" },
  { name: "Espresso Machine", cost: 2500,  batch: 8,  speed: 2500, desc: "Pressure perfection" },
  { name: "Barista Bot",      cost: 10000, batch: 14, speed: 1800, desc: "Never sleeps" },
  { name: "Molecular Brewer", cost: 40000, batch: 24, speed: 1000, desc: "Deconstructs coffee itself" },
];

const SHOP_UPS = [
  { name: "Sidewalk Cart",  cost: 0,     priceMult: 1,   maxCust: 3,  spawn: 5500, desc: "Corner hustle" },
  { name: "Tiny Kiosk",     cost: 250,   priceMult: 1.4, maxCust: 5,  spawn: 4500, desc: "A real spot" },
  { name: "Cozy Café",      cost: 1000,  priceMult: 2,   maxCust: 8,  spawn: 3500, desc: "Regulars love it" },
  { name: "Trendy Spot",    cost: 4000,  priceMult: 3,   maxCust: 12, spawn: 2800, desc: "Insta-worthy" },
  { name: "Chain Store",    cost: 18000, priceMult: 5,   maxCust: 16, spawn: 2200, desc: "Locations everywhere" },
  { name: "Coffee Empire",  cost: 60000, priceMult: 8,   maxCust: 22, spawn: 1500, desc: "You ARE coffee now" },
];

const DRINKS = [
  { name: "Black Coffee",     cups: 1, price: 3,  unlock: 0,     emoji: "☕", color: "#5D4037" },
  { name: "Latte",            cups: 2, price: 7,  unlock: 150,   emoji: "🥛", color: "#BCAAA4" },
  { name: "Cappuccino",       cups: 2, price: 9,  unlock: 500,   emoji: "☕", color: "#8D6E63" },
  { name: "Mocha",            cups: 3, price: 14, unlock: 1800,  emoji: "🍫", color: "#4E342E" },
  { name: "Cold Brew",        cups: 2, price: 11, unlock: 4000,  emoji: "🧊", color: "#78909C" },
  { name: "Affogato",         cups: 3, price: 18, unlock: 10000, emoji: "🍨", color: "#FFF9C4" },
  { name: "Espresso Martini", cups: 4, price: 28, unlock: 25000, emoji: "🍸", color: "#880E4F" },
  { name: "Golden Latte",     cups: 5, price: 45, unlock: 60000, emoji: "✨", color: "#FFD54F" },
];

const CUSTOMERS = [
  { emoji: "👩", name: "Emma" },  { emoji: "👨", name: "Jake" },
  { emoji: "👵", name: "Nana" },  { emoji: "🧑", name: "Alex" },
  { emoji: "👩‍💼", name: "Diana" },{ emoji: "👨‍💼", name: "Marcus" },
  { emoji: "👧", name: "Lily" },  { emoji: "👦", name: "Sam" },
  { emoji: "🧓", name: "Earl" },  { emoji: "👩‍🎨", name: "Frida" },
  { emoji: "🧔", name: "Hank" },  { emoji: "👩‍🍳", name: "Rosa" },
];

const ACHIEVEMENTS = [
  { id: "first_pick",   name: "Green Thumb",   desc: "Pick your first cherry",       icon: "🌱" },
  { id: "first_sale",   name: "First Sip",     desc: "Serve a customer",             icon: "🎉" },
  { id: "50_picked",    name: "Harvester",     desc: "Pick 50 cherries",             icon: "🌾" },
  { id: "50_served",    name: "Popular",       desc: "Serve 50 customers",           icon: "⭐" },
  { id: "200_served",   name: "Beloved",       desc: "Serve 200 customers",          icon: "💖" },
  { id: "1k_earned",    name: "Thousandaire",  desc: "Earn $1,000 total",            icon: "💵" },
  { id: "10k_earned",   name: "Big Money",     desc: "Earn $10,000 total",           icon: "💎" },
  { id: "100k_earned",  name: "Coffee Baron",  desc: "Earn $100,000 total",          icon: "👑" },
  { id: "auto_harvest", name: "Automation",    desc: "Unlock auto-harvest",          icon: "🤖" },
  { id: "all_drinks",   name: "Full Menu",     desc: "Unlock all drinks",            icon: "📋" },
  { id: "speed_demon",  name: "Speed Demon",   desc: "Serve 5 in 10 seconds",       icon: "⚡" },
  { id: "max_any",      name: "Perfectionist", desc: "Max out any station",          icon: "🏆" },
];

// ─────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────
let _uid = 0;
const uid = () => ++_uid;
const fmt = (n) => {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${Math.floor(n)}`;
};
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// ─────────────────────────────────────────
// GAME STATE
// ─────────────────────────────────────────
const G = {
  started: false,
  money: 0,
  totalEarned: 0,
  totalServed: 0,
  totalPicked: 0,

  rawBeans: 0,
  roastedBeans: 0,
  brewedCups: 0,

  farmLvl: 0,
  roasterLvl: 0,
  brewerLvl: 0,
  shopLvl: 0,

  plots: [],
  customers: [],
  unlockedDrinks: [0],
  achievements: [],

  isRoasting: false,
  roastProgress: 0,
  roastTimer: 0,

  isBrewing: false,
  brewProgress: 0,
  brewTimer: 0,

  autoHarvestTimer: 0,
  recentServes: [],

  activeTab: "farm",
  floats: [],
  achPopup: null,
  achPopupTimer: 0,
  notification: null,
  notifTimer: 0,
};

function initPlots() {
  const target = FARM_UPS[G.farmLvl].slots;
  while (G.plots.length < target) {
    G.plots.push({ id: uid(), stage: 0, stageStart: performance.now(), justPicked: false, pickFlash: 0 });
  }
}

function getFarm() { return FARM_UPS[G.farmLvl]; }
function getRoaster() { return ROASTER_UPS[G.roasterLvl]; }
function getBrewer() { return BREWER_UPS[G.brewerLvl]; }
function getShop() { return SHOP_UPS[G.shopLvl]; }

// ─────────────────────────────────────────
// SAVE / LOAD
// ─────────────────────────────────────────
function saveGame() {
  try {
    const data = {
      money: G.money, totalEarned: G.totalEarned, totalServed: G.totalServed, totalPicked: G.totalPicked,
      rawBeans: G.rawBeans, roastedBeans: G.roastedBeans, brewedCups: G.brewedCups,
      farmLvl: G.farmLvl, roasterLvl: G.roasterLvl, brewerLvl: G.brewerLvl, shopLvl: G.shopLvl,
      achievements: G.achievements, unlockedDrinks: G.unlockedDrinks,
      savedAt: Date.now(),
    };
    localStorage.setItem('coffeeTycoonSave', JSON.stringify(data));
  } catch(e) {}
}

function loadGame() {
  try {
    const raw = localStorage.getItem('coffeeTycoonSave');
    if (!raw) return false;
    const d = JSON.parse(raw);
    G.money = d.money || 0;
    G.totalEarned = d.totalEarned || 0;
    G.totalServed = d.totalServed || 0;
    G.totalPicked = d.totalPicked || 0;
    G.rawBeans = d.rawBeans || 0;
    G.roastedBeans = d.roastedBeans || 0;
    G.brewedCups = d.brewedCups || 0;
    G.farmLvl = d.farmLvl || 0;
    G.roasterLvl = d.roasterLvl || 0;
    G.brewerLvl = d.brewerLvl || 0;
    G.shopLvl = d.shopLvl || 0;
    G.achievements = d.achievements || [];
    G.unlockedDrinks = d.unlockedDrinks || [0];
    // Idle earnings
    if (d.savedAt) {
      const elapsed = (Date.now() - d.savedAt) / 1000;
      if (elapsed > 30) {
        const idleEarnings = Math.floor(elapsed * 0.5 * (G.shopLvl + 1));
        if (idleEarnings > 0) {
          G.money += idleEarnings;
          G.totalEarned += idleEarnings;
          G.notification = `Welcome back! Earned ${fmt(idleEarnings)} while away.`;
          G.notifTimer = 4000;
        }
      }
    }
    return true;
  } catch(e) { return false; }
}

// ─────────────────────────────────────────
// ACHIEVEMENT SYSTEM
// ─────────────────────────────────────────
function grantAch(id) {
  if (G.achievements.includes(id)) return;
  G.achievements.push(id);
  const ach = ACHIEVEMENTS.find(a => a.id === id);
  if (ach) {
    G.achPopup = ach;
    G.achPopupTimer = 3000;
  }
}

function checkAchievements() {
  if (G.totalPicked >= 1) grantAch("first_pick");
  if (G.totalPicked >= 50) grantAch("50_picked");
  if (G.totalServed >= 1) grantAch("first_sale");
  if (G.totalServed >= 50) grantAch("50_served");
  if (G.totalServed >= 200) grantAch("200_served");
  if (G.totalEarned >= 1000) grantAch("1k_earned");
  if (G.totalEarned >= 10000) grantAch("10k_earned");
  if (G.totalEarned >= 100000) grantAch("100k_earned");
  if (getFarm().autoHarvest) grantAch("auto_harvest");
  if (G.unlockedDrinks.length === DRINKS.length) grantAch("all_drinks");
  const maxes = [
    G.farmLvl >= FARM_UPS.length - 1,
    G.roasterLvl >= ROASTER_UPS.length - 1,
    G.brewerLvl >= BREWER_UPS.length - 1,
    G.shopLvl >= SHOP_UPS.length - 1,
  ];
  if (maxes.some(Boolean)) grantAch("max_any");
}

// ─────────────────────────────────────────
// GAME LOGIC UPDATE
// ─────────────────────────────────────────
let lastTime = 0;
let customerSpawnTimer = 2000;
let saveTimer = 0;

function gameUpdate(now) {
  if (!G.started) return;
  const dt = lastTime ? now - lastTime : 16;
  lastTime = now;

  const farm = getFarm();
  const roaster = getRoaster();
  const brewer = getBrewer();
  const shop = getShop();

  // ── Grow plots ──
  for (const plot of G.plots) {
    if (plot.stage >= GROWTH.length - 1) continue;
    const stageTime = GROWTH[plot.stage].time / farm.growMult;
    if (now - plot.stageStart >= stageTime) {
      plot.stage++;
      plot.stageStart = now;
    }
    if (plot.pickFlash > 0) plot.pickFlash -= dt;
  }

  // ── Auto-harvest ──
  if (farm.autoHarvest) {
    G.autoHarvestTimer -= dt;
    if (G.autoHarvestTimer <= 0) {
      G.autoHarvestTimer = farm.autoRate;
      const ripe = G.plots.find(p => p.stage >= GROWTH.length - 1);
      if (ripe) {
        ripe.stage = 0;
        ripe.stageStart = now;
        ripe.pickFlash = 300;
        G.rawBeans++;
        G.totalPicked++;
      }
    }
  }

  // ── Auto-roast ──
  if (G.isRoasting) {
    G.roastTimer -= dt;
    G.roastProgress = clamp(1 - (G.roastTimer / roaster.speed), 0, 1);
    if (G.roastTimer <= 0) {
      G.isRoasting = false;
      G.roastedBeans += roaster.batch;
      G.roastProgress = 0;
    }
  } else if (G.rawBeans >= roaster.batch) {
    G.rawBeans -= roaster.batch;
    G.isRoasting = true;
    G.roastTimer = roaster.speed;
    G.roastProgress = 0;
  }

  // ── Auto-brew ──
  if (G.isBrewing) {
    G.brewTimer -= dt;
    G.brewProgress = clamp(1 - (G.brewTimer / brewer.speed), 0, 1);
    if (G.brewTimer <= 0) {
      G.isBrewing = false;
      G.brewedCups += brewer.batch;
      G.brewProgress = 0;
    }
  } else if (G.roastedBeans >= brewer.batch) {
    G.roastedBeans -= brewer.batch;
    G.isBrewing = true;
    G.brewTimer = brewer.speed;
    G.brewProgress = 0;
  }

  // ── Spawn customers ──
  customerSpawnTimer -= dt;
  if (customerSpawnTimer <= 0) {
    customerSpawnTimer = shop.spawn;
    if (G.customers.length < shop.maxCust) {
      const drinkIdx = pick(G.unlockedDrinks);
      const drink = DRINKS[drinkIdx];
      const tipMult = Math.random() < 0.12 ? 2 : Math.random() < 0.3 ? 1.5 : 1;
      G.customers.push({
        id: uid(), drinkIdx,
        look: pick(CUSTOMERS),
        price: Math.round(drink.price * shop.priceMult * tipMult),
        patience: 100, tipMult,
      });
    }
  }

  // ── Drain patience ──
  for (let i = G.customers.length - 1; i >= 0; i--) {
    G.customers[i].patience -= (dt / 1000) * 3;
    if (G.customers[i].patience <= 0) G.customers.splice(i, 1);
  }

  // ── Unlock drinks ──
  for (let i = 0; i < DRINKS.length; i++) {
    if (G.totalEarned >= DRINKS[i].unlock && !G.unlockedDrinks.includes(i)) {
      G.unlockedDrinks.push(i);
      G.unlockedDrinks.sort((a, b) => a - b);
      G.notification = `🎉 New drink unlocked: ${DRINKS[i].name}!`;
      G.notifTimer = 3000;
    }
  }

  // ── Floats ──
  for (let i = G.floats.length - 1; i >= 0; i--) {
    G.floats[i].life -= dt;
    if (G.floats[i].life <= 0) G.floats.splice(i, 1);
  }

  // ── Achievement popup ──
  if (G.achPopupTimer > 0) {
    G.achPopupTimer -= dt;
    if (G.achPopupTimer <= 0) G.achPopup = null;
  }

  // ── Notification ──
  if (G.notifTimer > 0) {
    G.notifTimer -= dt;
    if (G.notifTimer <= 0) G.notification = null;
  }

  // ── Save ──
  saveTimer -= dt;
  if (saveTimer <= 0) {
    saveTimer = 15000;
    saveGame();
  }

  checkAchievements();
}

// ─────────────────────────────────────────
// PIXI.JS CANVAS RENDERING
// ─────────────────────────────────────────
let pixiApp = null;
let farmContainer = null;
let particleContainer = null;
let bgGraphics = null;
let plotSprites = [];
let plotTexts = [];
let plotProgressBars = [];
let particles = [];

function initPixi() {
  const canvas = document.getElementById("game-canvas");

  pixiApp = new PIXI.Application();
  return pixiApp.init({
    canvas,
    resizeTo: window,
    backgroundColor: 0x0d0a07,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  }).then(() => {
    bgGraphics = new PIXI.Graphics();
    pixiApp.stage.addChild(bgGraphics);

    farmContainer = new PIXI.Container();
    pixiApp.stage.addChild(farmContainer);

    particleContainer = new PIXI.Container();
    pixiApp.stage.addChild(particleContainer);

    pixiApp.ticker.add((ticker) => {
      gameUpdate(performance.now());
      renderPixi(ticker.deltaMS);
    });

    window.addEventListener("resize", onResize);
  });
}

function onResize() {
  if (pixiApp && pixiApp.renderer) {
    pixiApp.renderer.resize(window.innerWidth, window.innerHeight);
  }
}

// ── Particle system ──
function spawnParticle(x, y, color, count = 3) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 3,
      vy: -Math.random() * 4 - 1,
      life: 600 + Math.random() * 400,
      maxLife: 600 + Math.random() * 400,
      size: 2 + Math.random() * 3,
      color,
      graphics: null,
    });
  }
}

function renderPixi(dt) {
  if (!G.started || G.activeTab !== "farm") {
    farmContainer.visible = false;
    return;
  }
  farmContainer.visible = true;

  const W = pixiApp.screen.width;
  const H = pixiApp.screen.height;

  // ── Background ──
  bgGraphics.clear();
  // Subtle radial gradient feel
  bgGraphics.circle(W * 0.3, H * 0.3, W * 0.8);
  bgGraphics.fill({ color: 0x1a0f05, alpha: 0.3 });

  // ── Render farm plots ──
  const farm = getFarm();
  const numPlots = G.plots.length;
  const cols = Math.min(6, Math.ceil(Math.sqrt(numPlots * 1.5)));
  const rows = Math.ceil(numPlots / cols);

  const padX = 20;
  const padTop = 100;
  const padBot = 160;
  const availW = W - padX * 2;
  const availH = H - padTop - padBot;
  const cellSize = Math.min(availW / cols, availH / rows, 65);
  const gap = Math.min(8, cellSize * 0.1);
  const plotSize = cellSize - gap;

  const gridW = cols * cellSize;
  const gridH = rows * cellSize;
  const offsetX = (W - gridW) / 2 + gap / 2;
  const offsetY = padTop + (availH - gridH) / 2 + gap / 2;

  // Ensure enough sprites
  while (plotSprites.length < numPlots) {
    const g = new PIXI.Graphics();
    farmContainer.addChild(g);
    plotSprites.push(g);

    const txt = new PIXI.Text({ text: "", style: { fontSize: 24, fill: 0xffffff } });
    txt.anchor.set(0.5);
    farmContainer.addChild(txt);
    plotTexts.push(txt);

    const bar = new PIXI.Graphics();
    farmContainer.addChild(bar);
    plotProgressBars.push(bar);
  }

  // Hide excess
  for (let i = numPlots; i < plotSprites.length; i++) {
    plotSprites[i].visible = false;
    plotTexts[i].visible = false;
    plotProgressBars[i].visible = false;
  }

  const now = performance.now();

  for (let i = 0; i < numPlots; i++) {
    const plot = G.plots[i];
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = offsetX + col * cellSize;
    const y = offsetY + row * cellSize;
    const stage = GROWTH[plot.stage];
    const isReady = plot.stage >= GROWTH.length - 1;

    const g = plotSprites[i];
    g.visible = true;
    g.clear();

    // Plot background
    const flashIntensity = plot.pickFlash > 0 ? plot.pickFlash / 300 : 0;
    const bgColor = isReady ? 0x3a1508 : (flashIntensity > 0 ? 0x2a3a15 : 0x1a0f05);
    const borderColor = isReady ? 0xE53935 : (flashIntensity > 0 ? 0x4ade80 : 0x2a1c12);

    // Pulsing glow for ready cherries
    const pulse = isReady ? 0.6 + Math.sin(now / 400) * 0.4 : 0;

    g.roundRect(x, y, plotSize, plotSize, 8);
    g.fill({ color: bgColor });
    g.roundRect(x, y, plotSize, plotSize, 8);
    g.stroke({ color: borderColor, width: isReady ? 2 : 1, alpha: isReady ? 0.5 + pulse * 0.5 : 0.5 });

    if (isReady) {
      // Glow effect
      g.roundRect(x - 2, y - 2, plotSize + 4, plotSize + 4, 10);
      g.stroke({ color: 0xE53935, width: 1, alpha: pulse * 0.3 });
    }

    // Symbol
    const txt = plotTexts[i];
    txt.visible = true;
    txt.text = stage.symbol;
    txt.style.fontSize = Math.floor(plotSize * 0.4);
    txt.style.fill = stage.color;
    txt.x = x + plotSize / 2;
    txt.y = y + plotSize / 2 - 2;
    txt.scale.set(stage.scale * (isReady ? 1 + Math.sin(now / 300) * 0.08 : 1));

    // Progress bar
    const bar = plotProgressBars[i];
    bar.visible = !isReady;
    bar.clear();
    if (!isReady) {
      const stageTime = GROWTH[plot.stage].time / farm.growMult;
      const prog = clamp((now - plot.stageStart) / stageTime, 0, 1);
      const barY = y + plotSize - 4;
      const barW = plotSize - 8;
      bar.roundRect(x + 4, barY, barW, 3, 1.5);
      bar.fill({ color: 0x0d0a07 });
      bar.roundRect(x + 4, barY, barW * prog, 3, 1.5);
      bar.fill({ color: stage.color, alpha: 0.8 });
    }

    // Store hitbox for click detection
    g._hitX = x;
    g._hitY = y;
    g._hitW = plotSize;
    g._hitH = plotSize;
    g._plotId = plot.id;
    g._isReady = isReady;
  }

  // ── Particles ──
  // Clear old particle graphics
  particleContainer.removeChildren();
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.08; // gravity

    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }

    const alpha = clamp(p.life / p.maxLife, 0, 1);
    const pg = new PIXI.Graphics();
    pg.circle(0, 0, p.size * alpha);
    pg.fill({ color: p.color, alpha });
    pg.x = p.x;
    pg.y = p.y;
    particleContainer.addChild(pg);
  }
}

// ── Handle farm clicks on canvas ──
function handleCanvasClick(e) {
  if (!G.started || G.activeTab !== "farm") return;

  const rect = pixiApp.canvas.getBoundingClientRect();
  const scaleX = pixiApp.screen.width / rect.width;
  const scaleY = pixiApp.screen.height / rect.height;
  const mx = (e.clientX - rect.left) * scaleX;
  const my = (e.clientY - rect.top) * scaleY;

  for (const spr of plotSprites) {
    if (!spr.visible || !spr._isReady) continue;
    const { _hitX: hx, _hitY: hy, _hitW: hw, _hitH: hh, _plotId: pid } = spr;
    if (mx >= hx && mx <= hx + hw && my >= hy && my <= hy + hh) {
      // Pick this cherry!
      const plot = G.plots.find(p => p.id === pid);
      if (plot) {
        plot.stage = 0;
        plot.stageStart = performance.now();
        plot.pickFlash = 300;
        G.rawBeans++;
        G.totalPicked++;
        spawnParticle(hx + hw / 2, hy + hh / 2, 0xE53935, 5);

        // Float
        G.floats.push({
          id: uid(), x: e.clientX, y: e.clientY,
          text: "+1 🫘", color: "#E53935", life: 900,
        });
      }
      break;
    }
  }
}

// ─────────────────────────────────────────
// DOM HUD RENDERING
// ─────────────────────────────────────────
let hudRafId = null;

function renderHUD() {
  // Money
  document.getElementById("hud-money").textContent = `💰 ${fmt(G.money)}`;

  // Pipeline
  document.getElementById("pip-raw").textContent = G.rawBeans;
  document.getElementById("pip-roasted").textContent = G.roastedBeans;
  document.getElementById("pip-cups").textContent = G.brewedCups;

  // Tab badges
  const readyCount = G.plots.filter(p => p.stage >= GROWTH.length - 1).length;
  const farmBadge = document.getElementById("badge-farm");
  farmBadge.textContent = readyCount;
  farmBadge.style.display = readyCount > 0 ? "block" : "none";

  const shopBadge = document.getElementById("badge-shop");
  shopBadge.textContent = G.customers.length;
  shopBadge.style.display = G.customers.length > 0 ? "block" : "none";

  // Active panel content
  renderActivePanel();

  // Floats
  renderFloats();

  // Achievement popup
  renderAchPopup();

  // Notification
  renderNotification();

  hudRafId = requestAnimationFrame(renderHUD);
}

function renderActivePanel() {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`panel-${G.activeTab}`);
  if (panel) panel.classList.add('active');

  if (G.activeTab === "farm") renderFarmPanel();
  else if (G.activeTab === "process") renderProcessPanel();
  else if (G.activeTab === "shop") renderShopPanel();
  else if (G.activeTab === "menu") renderMenuPanel();
  else if (G.activeTab === "stats") renderStatsPanel();
}

function renderFarmPanel() {
  const el = document.getElementById("farm-content");
  const farm = getFarm();
  const next = FARM_UPS[G.farmLvl + 1];
  const readyCount = G.plots.filter(p => p.stage >= GROWTH.length - 1).length;

  let html = `<div class="panel-header">
    <div>
      <div class="panel-title">${farm.name}</div>
      <div class="panel-subtitle">Tap ripe cherries 🔴 to pick! • ${readyCount} ready</div>
    </div>`;

  if (farm.autoHarvest) {
    html += `<div class="auto-harvest-badge"><span class="dot"></span> AUTO-PICK</div>`;
  }
  html += `</div>`;

  // Canvas handles the farm grid — just show info below
  html += `<div class="info-box" style="margin-top: ${Math.max(40, window.innerHeight - 340)}px">
    <strong>Growth:</strong> ×${farm.growMult} speed • <strong style="color:#E53935">Ripe:</strong> ${readyCount} • <strong>Raw beans:</strong> ${G.rawBeans}`;

  if (farm.autoHarvest) {
    html += `<br>🤖 <strong style="color:var(--green)">Auto-harvest active</strong> — picking every ${(farm.autoRate / 1000).toFixed(1)}s`;
  }

  html += `</div>`;

  if (next) {
    const canAfford = G.money >= next.cost;
    html += `<button class="btn btn-primary" style="margin-top:10px;
      background:${canAfford ? 'linear-gradient(135deg, var(--green), var(--green-dark))' : 'var(--bg-dark)'};
      color:${canAfford ? '#fff' : 'var(--text-muted)'}"
      onclick="doUpgrade('farm')" ${canAfford ? '' : 'disabled'}>
      ⬆ ${next.name} — ${fmt(next.cost)}${next.autoHarvest && !farm.autoHarvest ? ' 🤖 Unlocks auto-harvest!' : ''}
    </button>`;
  } else {
    html += `<div style="text-align:center;margin-top:10px;color:var(--gold);font-weight:700">✨ FARM MAXED OUT ✨</div>`;
  }

  el.innerHTML = html;
}

function renderProcessPanel() {
  const el = document.getElementById("process-content");
  const roaster = getRoaster();
  const brewer = getBrewer();
  const nextR = ROASTER_UPS[G.roasterLvl + 1];
  const nextB = BREWER_UPS[G.brewerLvl + 1];

  let html = `
  <div class="station-card ${G.isRoasting ? 'active' : ''}">
    <div class="station-header">
      <div class="station-name">
        <span class="emoji">🔥</span>
        <div><div class="label">Roaster</div>
        <div class="sublabel">Lv.${G.roasterLvl + 1} — ${roaster.batch} beans / ${(roaster.speed / 1000).toFixed(1)}s</div></div>
      </div>
      <div class="station-counts">
        <div class="count-box">🫘 <span style="color:var(--text-secondary)">${G.rawBeans}</span></div>
        <span style="color:var(--text-muted)">→</span>
        <div class="count-box">🟤 <span style="color:var(--text-secondary)">${G.roastedBeans}</span></div>
      </div>
    </div>
    <div class="progress-track">
      <div class="progress-fill" style="width:${G.roastProgress * 100}%;background:linear-gradient(90deg,var(--orange),#FF8F00);
        ${G.isRoasting ? 'box-shadow:0 0 8px rgba(245,127,23,0.3)' : ''}"></div>
    </div>
    <div class="station-actions">
      ${nextR ? `<button class="btn btn-upgrade" style="border-color:${G.money >= nextR.cost ? 'var(--orange)' : 'var(--border)'};
        color:${G.money >= nextR.cost ? 'var(--orange)' : 'var(--text-muted)'}"
        onclick="doUpgrade('roaster')" ${G.money >= nextR.cost ? '' : 'disabled'}>
        ⬆ ${nextR.name} — ${fmt(nextR.cost)}</button>` :
        `<span style="color:var(--gold);font-weight:700;font-size:11px">✨ MAXED</span>`}
    </div>
  </div>

  <div style="text-align:center;font-size:18px;color:var(--text-muted);margin:4px 0">⬇</div>

  <div class="station-card ${G.isBrewing ? 'active' : ''}">
    <div class="station-header">
      <div class="station-name">
        <span class="emoji">🫖</span>
        <div><div class="label">Brewer</div>
        <div class="sublabel">Lv.${G.brewerLvl + 1} — ${brewer.batch} roasted / ${(brewer.speed / 1000).toFixed(1)}s</div></div>
      </div>
      <div class="station-counts">
        <div class="count-box">🟤 <span style="color:var(--text-secondary)">${G.roastedBeans}</span></div>
        <span style="color:var(--text-muted)">→</span>
        <div class="count-box">☕ <span style="color:var(--text-secondary)">${G.brewedCups}</span></div>
      </div>
    </div>
    <div class="progress-track">
      <div class="progress-fill" style="width:${G.brewProgress * 100}%;background:linear-gradient(90deg,var(--blue),#1E88E5);
        ${G.isBrewing ? 'box-shadow:0 0 8px rgba(66,165,245,0.3)' : ''}"></div>
    </div>
    <div class="station-actions">
      ${nextB ? `<button class="btn btn-upgrade" style="border-color:${G.money >= nextB.cost ? 'var(--blue)' : 'var(--border)'};
        color:${G.money >= nextB.cost ? 'var(--blue)' : 'var(--text-muted)'}"
        onclick="doUpgrade('brewer')" ${G.money >= nextB.cost ? '' : 'disabled'}>
        ⬆ ${nextB.name} — ${fmt(nextB.cost)}</button>` :
        `<span style="color:var(--gold);font-weight:700;font-size:11px">✨ MAXED</span>`}
    </div>
  </div>

  <div class="info-box">Processing runs automatically when you have enough materials!<br>Upgrade for bigger batches and faster processing.</div>`;

  el.innerHTML = html;
}

function renderShopPanel() {
  const el = document.getElementById("shop-content");
  const shop = getShop();
  const next = SHOP_UPS[G.shopLvl + 1];

  let html = `<div class="panel-header">
    <div>
      <div class="panel-title">${shop.name}</div>
      <div class="panel-subtitle">${G.customers.length}/${shop.maxCust} customers • Price ×${shop.priceMult}</div>
    </div>
    ${next ? `<button class="btn btn-upgrade" style="border-color:${G.money >= next.cost ? 'var(--purple)' : 'var(--border)'};
      color:${G.money >= next.cost ? 'var(--purple)' : 'var(--text-muted)'}"
      onclick="doUpgrade('shop')" ${G.money >= next.cost ? '' : 'disabled'}>
      ⬆ ${fmt(next.cost)}</button>` : ''}
  </div>`;

  if (G.customers.length === 0) {
    html += `<div style="text-align:center;padding:50px 0;color:var(--text-muted)">
      <div style="font-size:48px;margin-bottom:8px">🚶</div>
      <div style="font-size:13px;color:var(--text-dim)">Waiting for customers...</div>
    </div>`;
  } else {
    for (const c of G.customers) {
      const drink = DRINKS[c.drinkIdx];
      const canServe = G.brewedCups >= drink.cups;
      const pColor = c.patience > 60 ? 'var(--green)' : c.patience > 30 ? '#fbbf24' : 'var(--red)';
      html += `<div class="customer-card ${canServe ? 'servable' : ''}" onclick="${canServe ? `serveCustomer(${c.id}, event)` : ''}">
        <span class="customer-emoji">${c.look.emoji}</span>
        <div class="customer-info">
          <div class="customer-name">${c.look.name}${c.tipMult > 1 ? ' ✨' : ''}</div>
          <div class="customer-order">
            <span style="color:${drink.color};font-size:13px">${drink.emoji}</span>
            ${drink.name} <span style="color:var(--text-muted)">•</span>
            <span style="color:var(--green);font-weight:600">${fmt(c.price)}</span>
          </div>
          <div class="customer-patience"><div class="patience-fill" style="width:${c.patience}%;background:${pColor}"></div></div>
        </div>
        ${canServe ? '<div class="serve-tag">SERVE →</div>' : `<div class="need-tag">Need ${drink.cups} ☕</div>`}
      </div>`;
    }
  }

  el.innerHTML = html;
}

function renderMenuPanel() {
  const el = document.getElementById("menu-content");
  let html = `<div class="panel-title" style="margin-bottom:14px">Drink Menu</div>`;

  for (let i = 0; i < DRINKS.length; i++) {
    const d = DRINKS[i];
    const unlocked = G.unlockedDrinks.includes(i);
    html += `<div class="drink-row ${unlocked ? '' : 'locked'}">
      <div class="drink-icon" style="background:${unlocked ? d.color + '22' : 'var(--bg-dark)'};
        border:1px solid ${unlocked ? d.color + '33' : 'transparent'}">
        ${unlocked ? d.emoji : '?'}
      </div>
      <div class="drink-info">
        <div class="drink-name">${unlocked ? d.name : '???'}</div>
        <div class="drink-cost">${unlocked ? `${d.cups} cups → $${d.price} base` : `Unlocks at ${fmt(d.unlock)} earned`}</div>
      </div>
      ${unlocked ? '<span class="drink-badge">UNLOCKED</span>' : ''}
    </div>`;
  }

  el.innerHTML = html;
}

function renderStatsPanel() {
  const el = document.getElementById("stats-content");

  let html = `<div class="panel-title" style="margin-bottom:14px">Achievements</div>
  <div class="ach-grid">`;
  for (const ach of ACHIEVEMENTS) {
    const earned = G.achievements.includes(ach.id);
    html += `<div class="ach-card ${earned ? 'earned' : ''}">
      <div class="ach-icon">${ach.icon}</div>
      <div class="ach-name">${ach.name}</div>
      <div class="ach-desc">${ach.desc}</div>
    </div>`;
  }
  html += `</div>`;

  html += `<div class="panel-title" style="margin-bottom:14px">Statistics</div>
  <div class="stat-grid">`;
  const stats = [
    { label: "Total Earned", value: fmt(G.totalEarned) },
    { label: "Current Cash", value: fmt(G.money) },
    { label: "Customers Served", value: G.totalServed },
    { label: "Beans Picked", value: G.totalPicked },
    { label: "Drinks Unlocked", value: `${G.unlockedDrinks.length}/${DRINKS.length}` },
    { label: "Achievements", value: `${G.achievements.length}/${ACHIEVEMENTS.length}` },
  ];
  for (const s of stats) {
    html += `<div class="stat-box">
      <div class="stat-label">${s.label}</div>
      <div class="stat-value">${s.value}</div>
    </div>`;
  }
  html += `</div>`;

  el.innerHTML = html;
}

function renderFloats() {
  const container = document.getElementById("floats-container");
  container.innerHTML = "";
  for (const f of G.floats) {
    const pct = f.life / 900;
    const div = document.createElement("div");
    div.className = "float-reward";
    div.style.left = `${f.x - 30}px`;
    div.style.top = `${f.y - (1 - pct) * 50}px`;
    div.style.opacity = pct;
    div.style.color = f.color;
    div.textContent = f.text;
    container.appendChild(div);
  }
}

function renderAchPopup() {
  const el = document.getElementById("ach-popup");
  if (G.achPopup) {
    el.style.display = "flex";
    el.innerHTML = `<span class="ach-popup-icon">${G.achPopup.icon}</span>
      <div><div class="ach-popup-label">ACHIEVEMENT</div><div>${G.achPopup.name}</div></div>`;
  } else {
    el.style.display = "none";
  }
}

function renderNotification() {
  const el = document.getElementById("notification");
  if (G.notification) {
    el.style.display = "block";
    el.textContent = G.notification;
  } else {
    el.style.display = "none";
  }
}

// ─────────────────────────────────────────
// GLOBAL HANDLERS (called from HTML onclick)
// ─────────────────────────────────────────
window.doUpgrade = function (type) {
  const map = {
    farm:    { lvl: () => G.farmLvl,    set: (v) => G.farmLvl = v,    ups: FARM_UPS },
    roaster: { lvl: () => G.roasterLvl, set: (v) => G.roasterLvl = v, ups: ROASTER_UPS },
    brewer:  { lvl: () => G.brewerLvl,  set: (v) => G.brewerLvl = v,  ups: BREWER_UPS },
    shop:    { lvl: () => G.shopLvl,    set: (v) => G.shopLvl = v,    ups: SHOP_UPS },
  };
  const m = map[type];
  const next = m.ups[m.lvl() + 1];
  if (next && G.money >= next.cost) {
    G.money -= next.cost;
    m.set(m.lvl() + 1);
    if (type === "farm") initPlots();
  }
};

window.serveCustomer = function (custId, event) {
  const idx = G.customers.findIndex(c => c.id === custId);
  if (idx === -1) return;
  const c = G.customers[idx];
  const drink = DRINKS[c.drinkIdx];
  if (G.brewedCups < drink.cups) return;

  G.brewedCups -= drink.cups;
  G.money += c.price;
  G.totalEarned += c.price;
  G.totalServed++;
  G.customers.splice(idx, 1);

  // Speed demon
  const now = Date.now();
  G.recentServes = G.recentServes.filter(t => now - t < 10000);
  G.recentServes.push(now);
  if (G.recentServes.length >= 5) grantAch("speed_demon");

  G.floats.push({
    id: uid(), x: event.clientX, y: event.clientY,
    text: `+${fmt(c.price)}`, color: "#4ade80", life: 900,
  });
};

window.setTab = function (tab) {
  G.activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
};

window.startGame = function () {
  document.getElementById("title-screen").style.display = "none";
  G.started = true;
  initPlots();
  lastTime = performance.now();
};

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────
async function init() {
  const hadSave = loadGame();

  await initPixi();

  // Canvas click handler
  pixiApp.canvas.addEventListener("pointerdown", handleCanvasClick);

  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => setTab(btn.dataset.tab));
  });

  // Start button
  document.getElementById("start-btn").addEventListener("click", startGame);

  if (hadSave) {
    // Auto-start if we have a save
    startGame();
  }

  // Start HUD render loop
  renderHUD();

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

init();
