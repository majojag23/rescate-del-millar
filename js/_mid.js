  /* ===================== CIELO: 3 capas con parallax, nubes, rayos de luz, viento, pájaros lejanos y plumas ===================== */
  let power = 1, wspeed = 586, gust = 0, gustT = 4500;
  const speedOf = (p) => 30 + 556 * p;
  function makeStrip(node, name) {
    [0, 1, 2].forEach((i) => { const im = document.createElement('img'); im.src = W + name + '.webp'; im.draggable = false; im.alt = ''; im.style.left = (i * VW) + 'px'; if (i === 1) im.style.transform = 'scaleX(-1)'; node.appendChild(im); });
  }
  makeStrip(el.stripSky, 'cielo'); makeStrip(el.stripIsl, 'islas'); makeStrip(el.stripClo, 'nubes');
  const off = { sky: 0, isl: 0, clo: 0 };

  function makeCloudSprite(w, h) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'), n = 8;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1), cx = w * (.14 + .72 * t) + rand(-w * .03, w * .03), r = h * (.26 + .22 * Math.sin(t * Math.PI)) * rand(.85, 1.1), cy = h * (.66 - .3 * Math.sin(t * Math.PI)) + rand(-h * .04, h * .04);
      const gr = g.createRadialGradient(cx, cy, 0, cx, cy, r); gr.addColorStop(0, 'rgba(255,255,255,.95)'); gr.addColorStop(.6, 'rgba(255,255,255,.68)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, r, 0, 6.3); g.fill();
    }
    return c;
  }
  const cloudSprites = [makeCloudSprite(420, 170), makeCloudSprite(340, 150), makeCloudSprite(520, 190)];
  const CLOUD_LAYERS = [{ n: 3, f: .2, a: .4, s: .8, y: [60, 640] }, { n: 3, f: .5, a: .5, s: 1.2, y: [380, 700] }];
  const cloudList = [], winds = [], birds = [], motes = [];
  CLOUD_LAYERS.forEach((L, li) => { for (let i = 0; i < L.n; i++) cloudList.push({ l: li, x: rand(-200, VW + 200), y: rand(L.y[0], L.y[1]), sp: pick(cloudSprites), k: rand(.85, 1.2) }); });
  for (let i = 0; i < 12; i++) winds.push({ x: rand(0, VW), y: rand(20, VH - 20), len: rand(120, 300), k: rand(.6, 1.4), a: rand(.15, .38) });
  for (let i = 0; i < 40; i++) motes.push({ x: rand(0, VW), y: rand(0, VH), ph: rand(0, 6.3), tw: rand(1.2, 3), d: rand(.2, 1) });
  const env = el.envc.getContext('2d');
  let birdAcc = 2500;
  function drawEnv(dt) {
    const s = dt / 1000, t = clock / 1000;
    env.clearRect(0, 0, VW, VH);
    gustT -= dt; if (gustT <= 0) { gustT = rand(6000, 10000); gust = 1; }
    gust = Math.max(0, gust - s * .25); const gk = Math.sin(Math.min(1, gust) * Math.PI) * .5 + Math.min(1, gust) * .5;
    // rayos de luz que se desplazan suavemente
    for (let i = 0; i < 3; i++) {
      const bx = ((t * 18 + i * 430) % 1700) - 300, g = env.createLinearGradient(bx, 0, bx + 220, 720); g.addColorStop(0, 'rgba(255,248,210,0)'); g.addColorStop(.5, `rgba(255,248,210,${.12 + .05 * Math.sin(t * .8 + i)})`); g.addColorStop(1, 'rgba(255,248,210,0)');
      env.fillStyle = g; env.beginPath(); env.moveTo(bx, 0); env.lineTo(bx + 120, 0); env.lineTo(bx + 420, 720); env.lineTo(bx + 240, 720); env.closePath(); env.fill();
    }
    // nubes de relleno (más rápidas = más cerca)
    for (const c of cloudList) {
      const L = CLOUD_LAYERS[c.l], w = c.sp.width * L.s * c.k, h = c.sp.height * L.s * c.k;
      c.x -= (wspeed * L.f + 5 + gk * 40) * s;
      if (c.x < -w) { c.x = VW + rand(20, 300); c.y = rand(L.y[0], L.y[1]); c.sp = pick(cloudSprites); c.k = rand(.85, 1.2); }
      env.globalAlpha = L.a; env.drawImage(c.sp, c.x, c.y, w, h);
    }
    // rayas de viento
    env.lineCap = 'round'; env.strokeStyle = '#ffffff';
    for (const w of winds) {
      w.x -= (wspeed * (.9 * w.k) + 60) * s * .5; if (w.x < -w.len - 20) { w.x = VW + rand(0, 300); w.y = rand(20, VH - 20); w.len = rand(120, 300) * (.7 + power * .4 + gk * .6); w.a = rand(.12, .38); }
      env.globalAlpha = w.a * (.4 + Math.min(power, 1.6) * .5 + gk * .6); env.lineWidth = 1.6 + gk; env.beginPath(); env.moveTo(w.x, w.y); env.quadraticCurveTo(w.x + w.len * .5, w.y - 6 - 5 * Math.sin(t + w.k * 5), w.x + w.len, w.y); env.stroke();
    }
    // pájaros lejanos (vuelan hacia el mismo lado que Goz)
    birdAcc -= dt; if (birdAcc <= 0) { birdAcc = rand(5000, 9000); const n = 3 + Math.floor(Math.random() * 3), y0 = rand(90, 380); for (let i = 0; i < n; i++) birds.push({ x: -40 - i * 46, y: y0 + i * rand(8, 20) - (n - i) * 4, vx: rand(150, 230), ph: rand(0, 6), sz: rand(.7, 1.1) }); }
    env.strokeStyle = '#34536b';
    for (let i = birds.length - 1; i >= 0; i--) {
      const b = birds[i]; b.x += (b.vx - wspeed * .05) * s; b.ph += s * 9; if (b.x > VW + 60) { birds.splice(i, 1); continue; }
      const f = Math.sin(b.ph), wg = 11 * b.sz; env.globalAlpha = .6; env.lineWidth = 2 * b.sz; env.beginPath(); env.moveTo(b.x - wg, b.y - 5 * f * b.sz); env.quadraticCurveTo(b.x - wg * .4, b.y - 3 * b.sz - 4 * f, b.x, b.y); env.quadraticCurveTo(b.x + wg * .4, b.y - 3 * b.sz - 4 * f, b.x + wg, b.y - 5 * f * b.sz); env.stroke();
    }
    // motas de luz flotando
    env.fillStyle = '#ffffff';
    for (const m of motes) {
      m.x -= (wspeed * .12 * m.d + 8) * s; m.y += Math.sin(t * .8 + m.ph) * 4 * s; if (m.x < -10) { m.x = VW + 10; m.y = rand(0, VH); }
      const tw = .5 + .5 * Math.sin(t * m.tw + m.ph); env.globalAlpha = .55 * tw * m.d; env.beginPath(); env.arc(m.x, m.y, 1.4 + 1.8 * m.d, 0, 6.3); env.fill();
    }
    env.globalAlpha = 1;
  }
  let ambAcc = 0;
  function emitAmbient(dt) {   // plumas que flotan con el viento
    ambAcc += dt;
    while (ambAcc > 520) {
      ambAcc -= 520;
      P({ kind: 'petal', x: VW + 30, y: rand(60, 700), vx: -(wspeed * .7 + rand(30, 120)), vy: rand(-20, 30), life: rand(3, 5), size: rand(5, 8), rot: rand(0, 6), vr: rand(-2, 2), w: rand(0, 6), c: pick([[255, 255, 255], [255, 244, 214], [200, 240, 235]]), a: .8 });
    }
  }

  /* ===================== GOZ (hoja de 5x5 cuadros de 256 px) ===================== */
  const FRAMES = 25;
  function mkSpr(node, sheet, fps) { const c = { el: node, sheet: '', fps, t: rand(0, 1500), f: -1 }; setSheet(c, sheet, fps); return c; }
  function setSheet(c, sheet, fps) {
    if (c.sheet === sheet && c.fps === fps) return;
    if (c.sheet !== sheet) { c.f = -1; c.el.style.backgroundImage = `url(${W}${sheet}.webp)`; }
    c.sheet = sheet; c.fps = fps;
  }
  function stepSprite(c, dt) {
    c.t += dt; const f = Math.floor(c.t * c.fps / 1000) % FRAMES;
    if (f !== c.f) { c.f = f; c.el.style.backgroundPosition = `${-(f % 5) * 256}px ${-Math.floor(f / 5) * 256}px`; }
  }
  const SG = mkSpr(el.gozSpr, 'goz-volar', 12), SE = mkSpr(el.endGoz, 'goz-jump', 14);
  const Pl = { x: -300, y: GOZ_REST, vy: 0, vx: 0, rot: 0, spin: 0, scale: 1, op: 1, ctrl: false, glide: null, bob: 0, flip: 1 };
  function stepGoz(dt) {
    const s = dt / 1000, t = clock / 1000, dir = (held.down ? 1 : 0) - (held.up ? 1 : 0);
    if (Pl.ctrl) {
      if (dir) { Pl.glide = null; Pl.vy += (dir * 320 - Pl.vy) * Math.min(1, s * 9); }
      else if (Pl.glide !== null) { const d = Pl.glide - Pl.y; Pl.vy += (clamp(d * 5, -320, 320) - Pl.vy) * Math.min(1, s * 9); if (Math.abs(d) < 2 && Math.abs(Pl.vy) < 12) Pl.glide = null; }
      else Pl.vy += (0 - Pl.vy) * Math.min(1, s * 6);
      Pl.y += Pl.vy * s;
      if (Pl.y < GOZ_Y0) { Pl.y = GOZ_Y0; Pl.vy = Math.max(0, Pl.vy); } else if (Pl.y > GOZ_Y1) { Pl.y = GOZ_Y1; Pl.vy = Math.min(0, Pl.vy); }
    } else Pl.vy *= Math.pow(.05, s);
    Pl.bob = Math.sin(t * 2.7) * 6 + Math.sin(t * 1.4) * 3;
    Pl.rot = clamp(Pl.vy * .04, -18, 18) + Math.sin(t * 1.9) * 1.2;
    el.goz.style.transform = `translate(${(Pl.x - 128).toFixed(1)}px,${(Pl.y - 128 + Pl.bob).toFixed(1)}px) rotate(${(Pl.rot + Pl.spin).toFixed(2)}deg) scale(${(Pl.scale * Pl.flip).toFixed(3)},${Pl.scale.toFixed(3)})`;
    el.goz.style.opacity = Pl.op;
    if (state === 'menu') return;
    const p = clamp(power, 0, 1.9);
    // cola luminosa y plumas de la estela
    if (Pl.op > .1 && Math.random() < dt * (.014 + .03 * p)) P({ kind: 'spark', x: Pl.x - 100 * Pl.flip, y: Pl.y + Pl.bob + rand(6, 24), vx: -(70 + 220 * p) * rand(.4, 1) * Pl.flip, vy: rand(-30, 30), drag: .96, life: rand(.5, .9), size: rand(2.5, 5), rot: rand(0, 3), vr: rand(-5, 5), c: pick([C.cyan, C.white, [150, 255, 225]]) });
    if (Pl.op > .1 && Math.random() < dt * (.006 + .012 * p)) P({ kind: 'petal', x: Pl.x - 60 * Pl.flip, y: Pl.y + Pl.bob + rand(-8, 18), vx: -(60 + 160 * p) * Pl.flip, vy: rand(-30, 20), drag: .97, life: rand(.8, 1.4), size: rand(4, 7), rot: rand(0, 6), vr: rand(-6, 6), w: rand(0, 6), c: pick([[255, 255, 255], [180, 255, 225], [255, 235, 190]]), a: .9 });
    if (Pl.op > .1 && power > 1.2 && Math.random() < dt * .03) P({ kind: 'line', x: Pl.x - 40, y: Pl.y + Pl.bob + rand(-30, 30), vx: -rand(500, 900), vy: 0, life: .3, size: rand(60, 120), w: 2, c: C.white });
    setSheet(SG, 'goz-volar', Math.round(10 + 6 * Math.min(p, 1.7)));
  }
  const setPower = (v, ms = 0, ease = easeInOut) => { if (!ms) { power = v; return Promise.resolve(); } const p0 = power; return tween(ms, (p) => { power = lerp(p0, v, p); }, ease); };

  /* ===================== MONEDAS-PLUMA ===================== */
  const coinList = [];
  function spawnCoin(x, y) {
    const w = div('coin', el.coins); w.innerHTML = `<img src="${W}moneda.webp" alt="" draggable="false" />`; w.firstChild.style.animationDelay = (-rand(0, .9)).toFixed(2) + 's';
    coinList.push({ el: w, x, y, ph: rand(0, 6) });
  }
  function coinPattern(kind, y0) {
    const out = [];
    if (kind === 'line') for (let i = 0; i < 7; i++) out.push([i * 74, y0]);
    else if (kind === 'arc') for (let i = 0; i < 8; i++) out.push([i * 70, y0 - 80 * Math.sin(i / 7 * Math.PI)]);
    else if (kind === 'valley') for (let i = 0; i < 8; i++) out.push([i * 70, y0 + 80 * Math.sin(i / 7 * Math.PI)]);
    else if (kind === 'zig') for (let i = 0; i < 8; i++) out.push([i * 82, y0 + (i % 2 ? 70 : -70)]);
    else if (kind === 'wave') for (let i = 0; i < 10; i++) out.push([i * 64, y0 + 85 * Math.sin(i * .85)]);
    else for (let i = 0; i < 6; i++) out.push([i * 72, y0 + 60 - i * 24]);   // 'stairs'
    return out.map(([dx, y]) => [dx, clamp(y, 215, 520)]);
  }
  function spawnPattern(kind, y0) { coinPattern(kind, y0).forEach(([dx, y]) => spawnCoin(VW + 60 + dx, y)); }
  function clearCoins() { coinList.splice(0).forEach((c) => c.el.remove()); }
  let onCoin = null;
  function stepCoins(dt) {
    if (!coinList.length) return;
    const s = dt / 1000, t = clock / 1000;
    for (let i = coinList.length - 1; i >= 0; i--) {
      const c = coinList[i];
      c.x -= (wspeed * .72 + 8) * s; const yy = c.y + Math.sin(t * 2.6 + c.ph) * 7;
      c.el.style.transform = `translate(${(c.x - 29).toFixed(1)}px,${(yy - 29).toFixed(1)}px)`;
      if (c.x < -60) { c.el.remove(); coinList.splice(i, 1); continue; }
      if (phase === 'fly' && Pl.ctrl && c.x > Pl.x - 80 && c.x < Pl.x + 115 && Math.abs(yy - (Pl.y + Pl.bob)) < 62) { c.el.remove(); coinList.splice(i, 1); if (onCoin) onCoin(c.x, yy); }
    }
  }

