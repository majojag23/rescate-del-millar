/* ============================================================
   RESCATE DEL MILLAR  (Día 19 · suma de cuatro cifras con reagrupación de centenas a millares)
   Goz vuela sin parar entre islas flotantes recogiendo monedas; antes de cada reto llega a una estación donde está la tabla
   de valor posicional M-C-D-U y tres cajas con resultados. Cada acierto da una estrella y coloca una pieza del mosaico.
   Prueba de controles (J-02, sin puntaje) + 6 retos (J-03a-f) con 1 intento + 2 reintentos y 2 pistas propias;
   agotados, el juego sigue sin mostrar la respuesta ("requiere refuerzo", dato interno). Tiempo oculto de 45 s por reto.
   Al final: Goz celebra con el mosaico, "después del juego" (J-04: reto más difícil + estrategia) y pop-up con "Volver a jugar".
   ============================================================ */
(() => {
  'use strict';

  const VW = 1280, VH = 720;
  const W = 'assets/web/';

  /* ===================== CONTENIDO (ficha técnica · Día 19) ===================== */
  // opts = A, B, C tal como en la tabla de retos; ci = índice de la correcta; cs = centenas que se suman
  const RONDAS = [
    { n: 1, id: 'a', a: 2916, b: 3342, r: 6258, opts: [5258, 6258, 6268], ci: 1, cs: [9, 3] },
    { n: 2, id: 'b', a: 5723, b: 3854, r: 9577, opts: [9577, 8577, 9587], ci: 0, cs: [7, 8] },
    { n: 3, id: 'c', a: 1834, b: 5915, r: 7749, opts: [6749, 7739, 7749], ci: 2, cs: [8, 9] },
    { n: 4, id: 'd', a: 2641, b: 6738, r: 9379, opts: [8379, 9379, 9389], ci: 1, cs: [6, 7] },
    { n: 5, id: 'e', a: 3567, b: 2821, r: 6388, opts: [6388, 5388, 6378], ci: 0, cs: [5, 8] },
    { n: 6, id: 'f', a: 4952, b: 4636, r: 9588, opts: [8588, 9598, 9588], ci: 2, cs: [9, 6] }
  ];
  const PRACTICE = { n: 0, id: 'p', a: 10, b: 10, r: 20, opts: [20, 21, 19], ci: 0, practice: true };   // J-02: prueba de controles, no puntúa
  const ESTRATEGIAS = ['Sumé primero las centenas', 'Comparé el total con diez', 'Usé la tabla M C D U'];
  const PHRASES = ['¡Restauraste el mosaico del millar!', '¡Formar el millar con las centenas fue tu gran truco!', '¡Goz y tú son un gran equipo!', '¡Sigue practicando: cada día sumas mejor!', '¡Equivocarse es parte de aprender. Tú no te rendiste!'];
  const MAX_ATTEMPTS = 3;                  // 1 intento inicial + 2 reintentos
  const TIME_LIMIT = 45000;                // 45 s por reto (oculto, sin penalización)
  const TOTAL = RONDAS.length;
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  /* ===================== GEOMETRÍA (escena.json, vista principal) ===================== */
  const GOZ_X = 150, GOZ_Y0 = 175, GOZ_Y1 = 545, GOZ_REST = 340;      // Goz vuela a x fija; sube y baja con las flechas
  const BOX_X = [464, 651, 834], BOX_Y = 484, BOX_W = 162;             // cajas A, B y C (el pedestal queda 108 px más abajo)
  const COLX = [648, 732, 813, 897], ROWY = [260, 307, 355];            // columnas M-C-D-U y filas de la tabla
  const MOS = { x: 159, y: 473, w: 240, h: 237 };                       // mosaico (6 piezas alrededor de una esfera)
  const MOS_SLOTS = [[120, 53], [175, 85], [175, 152], [120, 185], [65, 152], [65, 85]];
  const PIECE = 74;

  /* ===================== ASSETS ===================== */
  const manifest = [];
  const mk = (src) => { const im = new Image(); im.src = src; manifest.push(im); return im; };
  ['pantallas/inicio', 'pantallas/instrucciones', 'cielo', 'islas', 'nubes', 'panel', 'btn-sonido', 'btn-pausa', 'flecha-arriba', 'flecha-abajo', 'caja', 'pedestal', 'pieza', 'mosaico', 'diagrama', 'acierto', 'moneda', 'goz-volar', 'goz-jump'].forEach((n) => mk(W + n + '.webp'));

  /* ===================== DOM ===================== */
  const $ = (id) => document.getElementById(id);
  const el = {
    stageWrap: $('stage-wrap'), stage: $('stage'), loadingFill: $('loading-fill'), world: $('world'), stripSky: $('strip-sky'), stripIsl: $('strip-isl'), stripClo: $('strip-clo'), envc: $('envc'), coins: $('coins'),
    station: $('station'), qTitle: $('q-title'), grid: $('grid'), cells: $('cells'), colglow: $('colglow'), carry: $('carry'), carryArrow: $('carry-arrow'), qHint: $('q-hint'), boxes: $('boxes'), mosaic: $('mosaic'), pieces: $('pieces'), orb: $('orb'),
    goz: $('goz'), gozSpr: $('goz-spr'),
    stars: $('hud-stars'), retoText: $('reto-text'), btnListen: $('btn-listen'), vbox: $('vbox'), vboxIco: $('vbox-ico'),
    coinN: $('coin-n'), coinPill: $('coin-pill'), btnSound: $('btn-sound'), btnPause: $('btn-pause'), btnUp: $('btn-up'), btnDown: $('btn-down'),
    titleCard: $('title-card'), tcA: $('tc-a'), tcB: $('tc-b'), fx: $('fx'), fxc: $('fxc'), flash: $('flash'),
    pause: $('pause-overlay'), end: $('end-overlay'), endPhrase: $('end-phrase'), endStars: $('end-stars'), endSum: $('end-sum'), endMosaic: $('end-mosaic'), endGoz: $('end-goz'),
    rfSummary: $('rf-summary'), rfOrders: $('rf-orders'), rfOpts: $('rf-opts'), rfText: $('rf-text'), rfContinue: $('rf-continue'), rfThanks: $('rf-thanks')
  };

  /* ===================== UTILIDADES ===================== */
  const CANCEL = Symbol('cancel');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const easeInOut = (p) => (p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
  const easeOut = (p) => 1 - Math.pow(1 - p, 3);
  const easeIn = (p) => p * p * p;
  const lin = (p) => p;
  const easeBack = (p) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); };
  const div = (cls, parent, css) => { const d = document.createElement('div'); if (cls) d.className = cls; if (css) d.style.cssText = css; if (parent) parent.appendChild(d); return d; };

  /* ===================== ESTADO ===================== */
  let state = 'loading';          // loading | menu | playing | celebrate | reflect | end
  let phase = 'none';             // fly | enter | play | busy | result
  let paused = false;
  let runId = 0, clock = 0, gameStart = 0, DT = 16;
  let ri = -1, R = PRACTICE, attempts = 0, locked = true;
  let results = [];
  let hintTok = 0, speakingN = 0, shakeAmp = 0, listening = false;
  let boxList = [], coinsGot = 0, combo = 0, comboT = 0, gotPieces = [];
  let survey = { ronda: -1, texto: '' };
  const timer = { on: false, spent: 0 };
  const held = { up: false, down: false };

  /* ===================== TWEENS (con pausa y cancelación) ===================== */
  const tweens = new Set();
  function tween(ms, fn, ease = easeInOut) {
    const my = runId;
    return new Promise((res, rej) => { tweens.add({ t: 0, ms: Math.max(1, ms), fn, ease, res, rej, my }); });
  }
  const wait = (ms) => tween(ms, () => {}, lin);
  function stepTweens(dt) {
    for (const tw of [...tweens]) {
      if (tw.my !== runId) { tweens.delete(tw); tw.rej(CANCEL); continue; }
      tw.t += dt;
      const p = Math.min(1, tw.t / tw.ms);
      tw.fn(tw.ease(p), p);
      if (p >= 1) { tweens.delete(tw); tw.res(); }
    }
  }
  const guard = (fn) => async (...a) => { try { await fn(...a); } catch (e) { if (e !== CANCEL) throw e; } };
  const capped = (p, ms = 12000) => Promise.race([p, new Promise((r) => setTimeout(r, ms))]);
  function cancelAll() { runId++; tweens.forEach((t) => { tweens.delete(t); t.rej(CANCEL); }); }

  /* ===================== PARTÍCULAS (canvas) ===================== */
  const ctx = el.fxc.getContext('2d');
  ctx.setTransform(1.5, 0, 0, 1.5, 0, 0);
  const parts_ = [];
  const C = { water: [190, 235, 255], foam: [255, 255, 255], leaf: [120, 210, 70], leaf2: [170, 235, 90], rose: [255, 120, 170], rose2: [255, 190, 215], gold: [255, 205, 70], white: [255, 255, 255], cyan: [110, 235, 255], green: [120, 255, 170], orange: [255, 150, 50], red: [255, 90, 70], pink: [255, 143, 184], violet: [178, 141, 255], dust: [225, 218, 205], blue: [90, 170, 255], steel: [215, 225, 235], rock: [150, 120, 100], smoke: [120, 120, 130] };
  const CONF = [C.gold, C.cyan, C.pink, C.green, C.white, C.violet, C.orange];
  function P(o) {
    if (parts_.length > 1700) return;
    parts_.push(Object.assign({ kind: 'spark', x: 0, y: 0, vx: 0, vy: 0, g: 0, drag: 1, life: 0.8, age: 0, size: 6, size1: -1, rot: 0, vr: 0, c: C.white, a: 1, w: 4 }, o));
  }
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
  function stepParts(dt) {
    const s = dt / 1000, dr = dt / 16;
    for (let i = parts_.length - 1; i >= 0; i--) {
      const p = parts_[i];
      p.age += s;
      if (p.age >= p.life) { parts_.splice(i, 1); continue; }
      if (p.drag !== 1) { const d = Math.pow(p.drag, dr); p.vx *= d; p.vy *= d; }
      p.vy += p.g * s; p.x += p.vx * s; p.y += p.vy * s; p.rot += p.vr * s;
    }
  }
  function star4(x, y, r, rot) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath();
    ctx.moveTo(0, -r); ctx.quadraticCurveTo(r * .12, -r * .12, r, 0); ctx.quadraticCurveTo(r * .12, r * .12, 0, r);
    ctx.quadraticCurveTo(-r * .12, r * .12, -r, 0); ctx.quadraticCurveTo(-r * .12, -r * .12, 0, -r); ctx.fill(); ctx.restore();
  }
  function star5(x, y, r, rot) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath();
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    ctx.closePath(); ctx.fill(); ctx.restore();
  }
  let clearedEmpty = true;
  function drawParts() {
    if (!parts_.length) { if (!clearedEmpty) { ctx.clearRect(0, 0, VW, VH); clearedEmpty = true; } return; }
    clearedEmpty = false;
    ctx.clearRect(0, 0, VW, VH);
    for (const p of parts_) {
      const t = p.age / p.life;
      const size = p.size1 < 0 ? p.size : lerp(p.size, p.size1, t);
      const a = p.a * (p.kind === 'ring' ? (1 - t) : (1 - t * t));
      switch (p.kind) {
        case 'glow': {
          ctx.globalCompositeOperation = p.add === false ? 'source-over' : 'lighter';
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(.5, size));
          g.addColorStop(0, rgba(p.c, a)); g.addColorStop(1, rgba(p.c, 0));
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(.5, size), 0, 6.3); ctx.fill(); break;
        }
        case 'spark': ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgba(p.c, a); star4(p.x, p.y, size, p.rot); break;
        case 'star5': ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = rgba(p.c, a); star5(p.x, p.y, size, p.rot); break;
        case 'ring': ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = rgba(p.c, a); ctx.lineWidth = p.w * (1 - t) + 1; ctx.beginPath(); ctx.ellipse(p.x, p.y, size, size * (p.sq || 1), 0, 0, 6.3); ctx.stroke(); break;
        case 'line': {
          ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = rgba(p.c, a); ctx.lineWidth = p.w * (1 - t) + .5; ctx.lineCap = 'round';
          const ang = Math.atan2(p.vy, p.vx);
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - Math.cos(ang) * size, p.y - Math.sin(ang) * size); ctx.stroke(); break;
        }
        case 'bolt': {
          ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
          ctx.strokeStyle = rgba(p.c, a * .55); ctx.lineWidth = p.w * 2.6; ctx.beginPath(); p.pts.forEach((q, k) => { if (k) ctx.lineTo(p.x + q[0], p.y + q[1]); else ctx.moveTo(p.x + q[0], p.y + q[1]); }); ctx.stroke();
          ctx.strokeStyle = rgba([255, 255, 255], a); ctx.lineWidth = p.w; ctx.beginPath(); p.pts.forEach((q, k) => { if (k) ctx.lineTo(p.x + q[0], p.y + q[1]); else ctx.moveTo(p.x + q[0], p.y + q[1]); }); ctx.stroke(); break;
        }
        case 'rect': {
          ctx.globalCompositeOperation = 'source-over'; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, Math.cos(p.age * 9 + p.w));
          ctx.fillStyle = rgba(p.c, Math.min(1, a * 1.6)); ctx.fillRect(-size / 2, -size / 3, size, size * .66); ctx.restore(); break;
        }
        case 'petal': {
          ctx.globalCompositeOperation = 'source-over'; ctx.save(); ctx.translate(p.x + Math.sin(p.age * 2.2 + p.w) * 10, p.y); ctx.rotate(p.rot); ctx.scale(1, .55 + .45 * Math.cos(p.age * 3 + p.w));
          ctx.fillStyle = rgba(p.c, Math.min(1, a * 1.3)); ctx.beginPath(); ctx.ellipse(0, 0, size, size * .62, 0, 0, 6.3); ctx.fill();
          ctx.fillStyle = rgba([255, 255, 255], Math.min(1, a * .35)); ctx.beginPath(); ctx.ellipse(-size * .25, -size * .12, size * .45, size * .22, 0, 0, 6.3); ctx.fill(); ctx.restore(); break;
        }
        case 'leaf': {
          ctx.globalCompositeOperation = 'source-over'; ctx.save(); ctx.translate(p.x, p.y + Math.sin(p.age * 5 + p.w) * 4); ctx.rotate(p.rot); ctx.scale(1, .5 + .5 * Math.cos(p.age * 4 + p.w));
          ctx.fillStyle = rgba(p.c, Math.min(1, a * 1.4)); ctx.beginPath(); ctx.moveTo(-size, 0); ctx.quadraticCurveTo(0, -size * .7, size, 0); ctx.quadraticCurveTo(0, size * .7, -size, 0); ctx.fill();
          ctx.strokeStyle = rgba([255, 255, 255], Math.min(1, a * .45)); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-size * .8, 0); ctx.lineTo(size * .8, 0); ctx.stroke(); ctx.restore(); break;
        }
        case 'drop': {
          ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = rgba(p.c, Math.min(1, a * 1.5)); ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, 6.3); ctx.fill();
          ctx.fillStyle = rgba([255, 255, 255], Math.min(1, a * .8)); ctx.beginPath(); ctx.arc(p.x - size * .3, p.y - size * .3, size * .38, 0, 6.3); ctx.fill(); break;
        }
        case 'bubble': {
          ctx.globalCompositeOperation = 'source-over'; ctx.strokeStyle = rgba([255, 255, 255], a * .85); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(p.x + Math.sin(p.age * 6 + p.w) * 4, p.y, size, 0, 6.3); ctx.stroke();
          ctx.fillStyle = rgba([220, 245, 255], a * .25); ctx.fill(); break;
        }
        case 'chunk': {   // pedazo de roca
          ctx.globalCompositeOperation = 'source-over'; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.fillStyle = rgba(p.c, Math.min(1, a * 1.8)); ctx.beginPath(); ctx.moveTo(-size, -size * .3); ctx.lineTo(-size * .2, -size); ctx.lineTo(size, -size * .2); ctx.lineTo(size * .5, size * .8); ctx.lineTo(-size * .7, size * .6); ctx.closePath(); ctx.fill(); ctx.restore(); break;
        }
        default: break;
      }
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  /* --- recetas de efectos --- */
  function sparks(x, y, n = 20, spd = 260, cols = [C.gold, C.white, C.cyan], life = .7, size = [5, 11]) {
    for (let i = 0; i < n; i++) {
      const a = rand(0, 6.283), v = rand(spd * .35, spd);
      P({ kind: 'spark', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, drag: .95, life: rand(life * .6, life), size: rand(size[0], size[1]), rot: rand(0, 3), vr: rand(-6, 6), c: pick(cols) });
    }
  }
  function ringFx(x, y, r0, r1, col = C.white, life = .6, w = 8, sq = 1) { P({ kind: 'ring', x, y, size: r0, size1: r1, life, c: col, w, sq }); }
  function glowFx(x, y, r, col = C.white, life = .5, a = 1) { P({ kind: 'glow', x, y, size: r, size1: r * 1.6, life, c: col, a }); }
  function smokeFx(x, y, n = 6, spread = 40) {
    for (let i = 0; i < n; i++) P({ kind: 'glow', add: false, x: x + rand(-spread / 3, spread / 3), y: y + rand(-spread / 3, spread / 3), vx: rand(-spread, spread * .3), vy: rand(-spread * .6, spread * .2), drag: .93, life: rand(.6, 1.2), size: rand(10, 24), c: C.smoke, a: .35 });
  }
  function confettiFx(x, y, n = 60, spread = 500, up = 380) {
    for (let i = 0; i < n; i++) P({ kind: 'rect', x: x + rand(-spread / 2, spread / 2), y, vx: rand(-160, 160), vy: rand(-up, -up * .3), g: 420, drag: .985, life: rand(1.6, 2.6), size: rand(9, 17), rot: rand(0, 6), vr: rand(-8, 8), w: rand(0, 6), c: pick(CONF) });
  }
  function starsBurst(x, y, n = 12, spd = 320) {
    for (let i = 0; i < n; i++) { const a = rand(0, 6.283), v = rand(spd * .4, spd); P({ kind: 'star5', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, drag: .94, g: 120, life: rand(.8, 1.3), size: rand(9, 17), rot: rand(0, 3), vr: rand(-5, 5), c: pick([C.gold, [255, 236, 150], C.white]) }); }
  }
  function fireworkFx(x, y) {
    const col = pick([C.gold, C.cyan, C.pink, C.green, C.orange, C.violet]);
    glowFx(x, y, 70, col, .5, .9); ringFx(x, y, 8, 120, col, .7, 6);
    for (let i = 0; i < 26; i++) { const a = i / 26 * 6.283 + rand(-.1, .1), v = rand(180, 330); P({ kind: 'line', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 160, drag: .965, life: rand(.7, 1.1), size: rand(14, 26), w: 4, c: col }); }
    sparks(x, y, 14, 220, [col, C.white], .9, [4, 8]);
  }
  function boltFx(x, y, len = 60, col = C.cyan) {   // rayo en zigzag
    const a = rand(0, 6.283), pts = [[0, 0]]; let px = 0, py = 0;
    for (let i = 1; i <= 5; i++) { px += Math.cos(a) * len / 5 + rand(-9, 9); py += Math.sin(a) * len / 5 + rand(-9, 9); pts.push([px, py]); }
    P({ kind: 'bolt', x, y, pts, life: rand(.14, .26), w: rand(1.4, 2.4), c: col, a: 1 });
  }
  function leafBurst(x, y, n = 14, cols = [C.leaf, C.leaf2, C.green], spd = 260) {
    for (let i = 0; i < n; i++) { const a = rand(0, 6.283), v = rand(spd * .3, spd); P({ kind: 'leaf', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 40, g: 120, drag: .96, life: rand(.8, 1.5), size: rand(7, 13), rot: rand(0, 6), vr: rand(-6, 6), w: rand(0, 6), c: pick(cols), a: .95 }); }
  }
  function petalBurst(x, y, n = 14, spd = 260) {
    for (let i = 0; i < n; i++) { const a = rand(0, 6.283), v = rand(spd * .3, spd); P({ kind: 'petal', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 40, g: 120, drag: .96, life: rand(.8, 1.5), size: rand(6, 11), rot: rand(0, 6), vr: rand(-6, 6), w: rand(0, 6), c: pick([C.rose, C.rose2, C.pink]), a: .95 }); }
  }
  function splashFx(x, y, n = 18, spd = 300, up = 1) {
    for (let i = 0; i < n; i++) { const a = rand(-Math.PI * .95, -Math.PI * .05), v = rand(spd * .35, spd); P({ kind: 'drop', x: x + rand(-14, 14), y, vx: Math.cos(a) * v * .6, vy: Math.sin(a) * v * up, g: 900, life: rand(.5, 1), size: rand(2.5, 6), c: pick([C.water, C.foam, [150, 215, 245]]), a: .95 }); }
    for (let i = 0; i < 5; i++) P({ kind: 'glow', add: false, x: x + rand(-24, 24), y: y + rand(-6, 6), vx: rand(-60, 60), vy: rand(-50, -10), drag: .92, life: rand(.5, .9), size: rand(14, 28), c: C.foam, a: .6 });
  }
  function bubblesFx(x, y, n = 8) { for (let i = 0; i < n; i++) P({ kind: 'bubble', x: x + rand(-30, 30), y: y + rand(0, 20), vx: rand(-10, 10), vy: -rand(40, 110), drag: .99, life: rand(.7, 1.4), size: rand(3, 8), w: rand(0, 6), a: .9 }); }
  function rockBurst(x, y, size) {
    for (let i = 0; i < 9; i++) { const a = rand(0, 6.283), v = rand(80, 300); P({ kind: 'chunk', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, drag: .97, life: rand(.7, 1.3), size: rand(size * .06, size * .14), rot: rand(0, 6), vr: rand(-9, 9), c: pick([C.rock, [110, 90, 80], [185, 150, 125]]) }); }
    smokeFx(x, y, 5, 70); sparks(x, y, 14, 300, [C.orange, C.gold, C.white], .6, [3, 7]); glowFx(x, y, size * .7, C.orange, .35, .8);
  }

  /* --- efectos DOM sencillos --- */
  function flash(kind) { el.flash.className = ''; void el.flash.offsetWidth; el.flash.className = kind || 'go'; }
  function shake(a) { shakeAmp = Math.max(shakeAmp, a); }
  function classPulse(node, cls, ms = 700) { node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls); setTimeout(() => node.classList.remove(cls), ms); }
  function mark(txt, x, y) {
    const d = document.createElement('div'); d.className = 'mark'; d.textContent = txt; d.style.left = x + 'px'; d.style.top = y + 'px';
    el.fx.appendChild(d); setTimeout(() => d.remove(), 1000);
  }
  function nudge(txt, x, y) {
    const d = document.createElement('div'); d.className = 'nudge'; d.textContent = txt; d.style.left = x + 'px'; d.style.top = y + 'px';
    el.fx.appendChild(d); setTimeout(() => d.remove(), 1700);
  }

  /* ===================== VOZ E ÍCONO DE AVISO ===================== */
  function applySpeaking() { el.vbox.classList.toggle('speaking', speakingN > 0); el.btnListen.classList.toggle('speaking', listening); }
  function speak(key, mode2 = 'high') {
    let started = false;
    return VOICE.play(key, mode2, () => { started = true; speakingN++; applySpeaking(); }).then(() => { if (started) { speakingN--; applySpeaking(); } });
  }
  /* lo que se narra por voz no se repite en texto: solo un ícono (✔/❌/💡) y la voz */
  function hideVbox() { el.vbox.className = ''; }
  function vCue(key, kind, ico, minMs = 1800, mode2 = 'high') {
    hintTok++;
    el.vbox.className = 'show' + (kind ? ' ' + kind : '');
    el.vboxIco.textContent = ico || '';
    const t0 = Date.now();
    return speak(key, mode2).then(() => new Promise((res) => { setTimeout(res, Math.max(200, minMs - (Date.now() - t0))); }));
  }

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

  /* ===================== HUD ===================== */
  function renderStars() {
    el.stars.innerHTML = '';
    for (let i = 0; i < TOTAL; i++) { const s = document.createElement('i'); s.className = 'star' + (results[i] && results[i].ganado ? ' on' : ''); s.style.left = (13 + i * 32.8) + 'px'; el.stars.appendChild(s); }
  }
  const starPos = (i) => ({ x: 15 + 13 + 13 + i * 32.8, y: 29 + 8 + 13 });
  const coinPos = () => ({ x: 19 + 28, y: 135 + 22 });
  function setCoins() { el.coinN.textContent = coinsGot; }
  const canPlay = () => state === 'playing' && phase === 'play' && !locked && !paused;
  function setBtns() { const on = state === 'playing' && Pl.ctrl && phase === 'fly'; [el.btnUp, el.btnDown].forEach((b) => b.classList.toggle('dim', !on)); el.btnListen.classList.toggle('off', state !== 'playing' || phase !== 'play'); }

  /* ===================== MOSAICO ===================== */
  function addPiece(host, k, animate, scale = 1) {
    const im = document.createElement('img'); im.className = 'piece' + (animate ? ' pop' : ''); im.src = W + 'pieza.webp'; im.alt = ''; im.draggable = false;
    const s = PIECE * scale; im.style.cssText = `left:${(MOS_SLOTS[k][0] * scale - s / 2).toFixed(1)}px;top:${(MOS_SLOTS[k][1] * scale - s / 2).toFixed(1)}px;width:${s.toFixed(1)}px;height:${s.toFixed(1)}px;`;
    host.appendChild(im); return im;
  }
  function renderPieces() { el.pieces.innerHTML = ''; gotPieces.forEach((g, k) => { if (g) addPiece(el.pieces, k, false); }); el.mosaic.classList.toggle('full', gotPieces.length === TOTAL && gotPieces.every(Boolean)); }
  const slotPos = (k) => ({ x: MOS.x + MOS_SLOTS[k][0], y: MOS.y + MOS_SLOTS[k][1] });

  /* ===================== ESTACIÓN: tabla M-C-D-U, cajas con pedestal y mosaico ===================== */
  const pad4 = (n) => String(n).padStart(4, ' ').split('');
  function buildStationText() {
    const prac = !!R.practice;
    el.qTitle.textContent = `Resuelve: ${fmt(R.a)} + ${fmt(R.b)}.`; el.grid.classList.toggle('hide', prac); el.qTitle.classList.toggle('big', prac);
    el.qHint.textContent = prac ? 'Toca la opción correcta para probar los controles.' : 'Revisa la columna de centenas: ¿llegaste a diez o más?';
    el.cells.innerHTML = ''; el.carry.className = ''; el.carryArrow.classList.remove('show'); el.colglow.className = '';
    if (prac) return;
    [R.a, R.b].forEach((n, r) => pad4(n).forEach((d, c) => { const e = div('dg', el.cells, `left:${COLX[c] - 582 - 20}px;top:${ROWY[r] - 153 - 20}px;`); e.textContent = d.trim(); e.dataset.r = r; e.dataset.c = c; }));
    for (let c = 0; c < 4; c++) { const e = div('dg res', el.cells, `left:${COLX[c] - 582 - 20}px;top:${ROWY[2] - 153 - 20}px;`); e.dataset.r = 2; e.dataset.c = c; }
  }
  function buildBoxes() {
    el.boxes.innerHTML = ''; boxList = [];
    R.opts.forEach((v, i) => {
      const b = document.createElement('button'); b.className = 'abox'; b.type = 'button'; b.setAttribute('aria-label', `Caja ${'ABC'[i]}: ${fmt(v)}`); b.style.cssText = `left:${BOX_X[i]}px;top:${BOX_Y}px;--d:${180 + i * 150};`;
      b.innerHTML = `<span class="ab-in"><img class="ab-ped" src="${W}pedestal.webp" alt="" draggable="false" /><span class="ab-top" style="animation-delay:${(-i * .7).toFixed(2)}s"><img class="ab-caja" src="${W}caja.webp" alt="" draggable="false" /><span class="ab-num">${fmt(v)}</span></span><img class="ab-burst" src="${W}acierto.webp" alt="" draggable="false" /><em class="ab-x">✖</em></span>`;
      el.boxes.appendChild(b);
      const bx = { el: b, i, val: v, cx: BOX_X[i] + BOX_W / 2, cy: BOX_Y + 78 };
      b.addEventListener('click', () => { SFX.unlock(); VOICE.unlock(); chooseBox(i); });
      boxList.push(bx);
    });
  }
  function eqHl(k) {
    el.cells.querySelectorAll('.dg').forEach((d) => d.classList.remove('hl')); el.colglow.className = ''; el.carryArrow.classList.remove('show');
    if (!k) return;
    if (k === 'c') { el.cells.querySelectorAll('.dg').forEach((d) => { if (d.dataset.c === '1' && d.dataset.r !== '2') d.classList.add('hl'); }); el.colglow.className = 'on c'; }
    else if (k === 'm') { el.colglow.className = 'on m'; el.carryArrow.classList.add('show'); el.cells.querySelectorAll('.dg').forEach((d) => { if (d.dataset.c === '0' && d.dataset.r !== '2') d.classList.add('hl'); }); }
  }
  async function stationIn() {
    phase = 'enter'; locked = true; Pl.ctrl = false; Pl.glide = null; held.up = held.down = false; setBtns(); hideVbox();
    attempts = 0; timer.on = false; timer.spent = 0; renderPieces(); buildStationText(); buildBoxes(); renderStars();
    el.retoText.textContent = R.practice ? 'Prueba de controles' : `Reto ${ri + 1} de ${TOTAL}`;
    SFX.whoosh(); el.station.classList.remove('celebrate'); void el.station.offsetWidth; el.station.classList.add('on');
    setPower(.22, 1500, easeOut).catch(() => {});
    const y0 = Pl.y; await tween(900, (p) => { Pl.y = lerp(y0, GOZ_REST, p); }, easeInOut);
    await wait(500);
    boxList.forEach((b) => { SFX.arrive(); splashPuff(b.cx, BOX_Y + 190); });
    if (!R.practice) {   // la tabla se llena columna por columna (los dos sumandos)
      const cells = [...el.cells.querySelectorAll('.dg:not(.res)')];
      for (let k = 0; k < cells.length; k++) { if (cells[k].textContent) { cells[k].classList.add('in'); if (k % 2 === 0) SFX.pop(); } await wait(55); }
    }
    await wait(250);
    Pl.ctrl = false; phase = 'play'; locked = false; timer.on = !R.practice; setBtns(); hintTok++;
    if (R.practice) { await capped(speak('nar-prueba', 'high'), 14000); }
    else {
      const q = speak(`nar-q${R.n}`, 'high');
      if (ri === 0) { await capped(q, 24000); if (phase === 'play' && !locked) runGuide(); }
    }
  }
  function splashPuff(x, y) { sparks(x, y, 7, 140, [C.white, C.cyan, [255, 244, 214]], .6, [2, 5]); ringFx(x, y, 10, 60, C.white, .5, 3, .35); }

  /* ===================== TRAMO DE VUELO Y MONEDAS (antes de cada estación) ===================== */
  const PATTERNS = [['line', 'arc', 'zig'], ['arc', 'wave', 'valley'], ['zig', 'stairs', 'arc'], ['wave', 'line', 'zig'], ['valley', 'zig', 'wave'], ['arc', 'wave', 'zig']];
  onCoin = (x, y) => {
    combo = clamp(combo + 1, 0, 12); comboT = 1300; coinsGot++; setCoins(); classPulse(el.coinPill, 'pop', 450); SFX.coin(combo);
    sparks(x, y, 10, 230, [C.gold, C.white, [255, 236, 150]], .55, [3, 7]); ringFx(x, y, 8, 46, C.gold, .4, 4); glowFx(x, y, 40, C.gold, .3, .8);
    for (let k = 0; k < 4; k++) P({ kind: 'petal', x, y, vx: rand(-90, 90), vy: rand(-130, -30), g: 140, drag: .97, life: rand(.6, 1), size: rand(4, 7), rot: rand(0, 6), vr: rand(-8, 8), w: rand(0, 6), c: [255, 240, 190], a: .95 });
    const d = div('plus', el.fx, `left:${x}px;top:${y - 30}px;`); d.textContent = '+1'; setTimeout(() => d.remove(), 900);
  };
  async function flyInterval(i) {
    phase = 'fly'; locked = false; hideVbox(); Pl.ctrl = true; Pl.glide = null; Pl.scale = 1; Pl.op = 1; Pl.flip = 1;
    el.retoText.textContent = i < 0 ? 'Prueba de controles' : `Reto ${i + 1} de ${TOTAL}`; setBtns(); timer.on = false; combo = 0;
    el.tcA.textContent = '¡Recoge monedas!'; el.tcB.textContent = i < 0 ? 'Primero, prueba los controles' : `Camino a la estación ${i + 1}`; classPulse(el.titleCard, 'on', 1750);
    if (i < 0) { speak('nar-consigna'); speak('nar-vuela'); }
    const pats = i < 0 ? ['arc', 'zig'] : PATTERNS[i], gap = 2000, lead = 1300, total = lead + gap * (pats.length - 1) + 3600; let wi = 0;
    const startX = Pl.x < 100 ? Pl.x : null;
    await tween(total, (p, pr) => {
      const t = pr * total;
      if (startX !== null && t < 1100) Pl.x = lerp(startX, GOZ_X, easeOut(t / 1100)); else if (startX !== null) Pl.x = GOZ_X;
      if (comboT > 0) { comboT -= DT; if (comboT <= 0) combo = 0; }
      while (wi < pats.length && t >= lead + wi * gap) { spawnPattern(pats[wi], rand(300, 440)); wi++; }
    }, lin);
    Pl.x = GOZ_X; clearCoins(); await wait(200);
  }

  /* ===================== ELEGIR CAJA ===================== */
  async function flyToBox(b) {
    Pl.ctrl = false; Pl.glide = null; held.up = held.down = false; SFX.dash(); setBtns();
    const x0 = Pl.x, y0 = Pl.y; let acc = 0;
    await tween(700, (q, pr) => {
      Pl.x = lerp(x0, b.cx - 100, q); Pl.y = lerp(y0, b.cy - 36, easeInOut(pr)); power = lerp(.22, 1.4, Math.min(1, pr * 2));
      acc += DT; if (acc > 30) { acc = 0; P({ kind: 'line', x: Pl.x - 70, y: Pl.y + rand(-24, 24), vx: -rand(400, 800), vy: 0, life: .28, size: rand(50, 100), w: 2.2, c: C.white }); }
    }, easeInOut);
  }
  const chooseBox = guard(async (i) => {
    if (!canPlay()) return; if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    endGuide(); hideVbox(); VOICE.stopAll(); speakingN = 0; applySpeaking(); eqHl(null);
    locked = true; phase = 'result'; timer.on = false; setBtns(); hintTok++;
    const b = boxList[i], r = results[ri];
    await flyToBox(b);
    if (i === R.ci) await onSuccess(r, b); else await onWrong(r, b);
  });
  async function typeResult() {
    const digs = pad4(R.r), cells = [...el.cells.querySelectorAll('.dg.res')], carry = el.carry;
    const put = async (c) => { cells[c].textContent = digs[c].trim(); cells[c].classList.add('in', 'pop'); SFX.note(c + 2); sparks(COLX[c], ROWY[2], 6, 110, [C.gold, C.white], .45, [2, 4]); await wait(330); };
    await put(3); await put(2);
    // las centenas suman 10 o más: se forma 1 millar y se traslada a la columna de los millares
    await put(1);
    carry.className = 'show'; carry.style.left = (COLX[1] - 15) + 'px'; carry.style.top = '184px'; SFX.hint(); await wait(380);
    const x0 = COLX[1] - 15, x1 = COLX[0] - 15;
    await tween(520, (q) => { carry.style.left = lerp(x0, x1, easeInOut(q)) + 'px'; carry.style.top = (184 - Math.sin(Math.PI * q) * 26) + 'px'; }, lin);
    SFX.pop(); carry.classList.add('land'); ringFx(COLX[0], 200, 8, 40, C.gold, .5, 4); await wait(280);
    await put(0);
  }
  async function onSuccess(r, b) {
    const prac = !!R.practice;
    if (!prac) { r.ganado = true; r.intentos = attempts + 1; r.reintentos = attempts; r.primerIntento = attempts === 0; r.tiempoMs = Math.round(timer.spent); }
    b.el.classList.add('ok'); SFX.correct(); flash('small'); shake(3);
    sparks(b.cx, b.cy, 30, 420, [C.cyan, C.white, C.gold, C.green], 1, [4, 9]); ringFx(b.cx, b.cy, 20, 200, C.white, .8, 7); glowFx(b.cx, b.cy, 150, C.cyan, .9, .9); starsBurst(b.cx, b.cy - 20, 10, 340);
    boxList.forEach((o) => { if (o !== b) o.el.classList.add('fade'); });
    // Goz celebra con una pirueta de vuelo mientras la tabla se completa
    const gy = Pl.y; tween(700, (q) => { Pl.y = gy - 60 * Math.sin(Math.PI * q); Pl.scale = 1 + .12 * Math.sin(Math.PI * q); }, lin).catch(() => {});
    const cue = vCue(prac ? 'nar-prueba-ok' : 'nar-ok', 'ok', '✔', 1900);
    if (!prac) {
      await typeResult();
      const k = ri; gotPieces[k] = true; await flyPiece(b, k); starFly(b, k);
    } else await wait(1200);
    await Promise.all([capped(cue, 9000), wait(500)]); hideVbox();
    await nextStage();
  }
  async function flyPiece(b, k) {
    const im = document.createElement('img'); im.className = 'flypiece'; im.src = W + 'pieza.webp'; im.alt = ''; el.fx.appendChild(im); SFX.whoosh();
    const sp = slotPos(k), x0 = b.cx, y0 = b.cy - 10; let acc = 0;
    await tween(900, (q) => { const e = easeInOut(q); im.style.left = lerp(x0, sp.x, e) + 'px'; im.style.top = (lerp(y0, sp.y, e) - Math.sin(Math.PI * q) * 140) + 'px'; im.style.transform = `translate(-50%,-50%) rotate(${q * 360}deg) scale(${lerp(.9, 1, q)})`; acc += DT; if (acc > 30) { acc = 0; P({ kind: 'spark', x: parseFloat(im.style.left), y: parseFloat(im.style.top), vx: rand(-40, 40), vy: rand(-40, 40), life: .5, size: rand(3, 6), c: pick([C.cyan, C.white, C.gold]) }); } }, lin);
    im.remove(); addPiece(el.pieces, k, true); SFX.chime(); ringFx(sp.x, sp.y, 16, 110, C.cyan, .7, 6); sparks(sp.x, sp.y, 22, 300, [C.cyan, C.white, C.gold], .9, [3, 8]); glowFx(sp.x, sp.y, 90, C.cyan, .7, .9); classPulse(el.mosaic, 'flashm', 800);
    if (gotPieces.length === TOTAL && gotPieces.every(Boolean)) { el.mosaic.classList.add('full'); ringFx(MOS.x + 120, MOS.y + 118, 20, 220, C.gold, 1, 8); }
  }
  async function onWrong(r, b) {
    if (R.practice) {   // la prueba de controles no puntúa y no tiene límite de intentos
      b.el.classList.add('wrong'); SFX.buzzer(); shake(3); setTimeout(() => b.el.classList.remove('wrong'), 700); hideVbox();
      const x1 = Pl.x, y1 = Pl.y; await tween(600, (q) => { Pl.x = lerp(x1, GOZ_X, q); Pl.y = lerp(y1, GOZ_REST, q); }, easeInOut);
      Pl.ctrl = false; locked = false; phase = 'play'; setBtns(); return;
    }
    attempts++; r.intentos = attempts; r.errores = (r.errores || 0) + 1;
    const last = attempts >= MAX_ATTEMPTS;
    b.el.classList.add('wrong'); SFX.buzzer(); SFX.wrong(); shake(6); flash('bad'); sparks(b.cx, b.cy, 18, 300, [C.red, C.orange, C.white], .7); ringFx(b.cx, b.cy, 20, 150, C.red, .6, 6);
    const xb = Pl.x, yb = Pl.y; setPower(.22, 700, easeOut).catch(() => {});
    const back = tween(900, (q, pr) => { Pl.x = lerp(xb, GOZ_X, easeInOut(pr)); Pl.y = lerp(yb, GOZ_REST, easeInOut(pr)); }, lin);
    const key = last ? 'nar-no-b' : (attempts === 1 ? 'nar-no-a' : `nar-no-c${R.n}`);
    const cue = vCue(key, 'bad', '❌', 2400);
    if (last) {
      r.refuerzo = true; r.tiempoMs = Math.round(timer.spent);   // no se muestra la respuesta correcta
      await Promise.all([capped(cue, 14000), back]); hideVbox(); b.el.classList.remove('wrong');
      await nextStage(); return;
    }
    await Promise.all([capped(cue, 14000), back]);
    r.pistas = attempts; SFX.hint(); hideVbox();
    const sp = speak(attempts === 1 ? `nar-p1-${R.n}` : 'nar-p2', 'high'); el.vbox.className = 'show hint'; el.vboxIco.textContent = '💡'; eqHl(attempts === 1 ? 'c' : 'm');
    await capped(sp, 18000); await wait(900); eqHl(null); hideVbox(); b.el.classList.remove('wrong'); b.el.classList.add('dim');
    locked = false; phase = 'play'; timer.on = true; setBtns();
  }
  function starFly(b, k) {
    const tp = starPos(k), from = { x: b.cx, y: b.cy };
    const fs = document.createElement('div'); fs.className = 'flystar'; el.fx.appendChild(fs); SFX.star();
    tween(1000, (q) => { fs.style.left = lerp(from.x, tp.x, q) + 'px'; fs.style.top = (lerp(from.y, tp.y, q) - Math.sin(Math.PI * q) * 120) + 'px'; fs.style.transform = `rotate(${q * 540}deg) scale(${1 + Math.sin(Math.PI * q) * .7})`; if (Math.random() < .8) P({ kind: 'spark', x: parseFloat(fs.style.left), y: parseFloat(fs.style.top), vx: rand(-40, 40), vy: rand(-40, 40), life: .5, size: rand(4, 8), c: C.gold }); }, easeInOut)
      .then(() => { fs.remove(); const s = el.stars.children[k]; if (s) { s.classList.add('on'); classPulse(s, 'pop', 750); } sparks(tp.x, tp.y, 14, 150, [C.gold, C.white], .6); ringFx(tp.x, tp.y, 8, 60, C.gold, .5, 5); }).catch(() => { fs.remove(); });
  }

  /* ===================== TIEMPO (45 s ocultos por reto) ===================== */
  function stepTimer(dt) {
    if (!timer.on || phase !== 'play' || locked || state !== 'playing') return;
    if (VOICE.busy()) return;
    timer.spent += dt; if (timer.spent >= TIME_LIMIT) onTimeout();
  }
  const onTimeout = guard(async () => {
    timer.on = false; if (state !== 'playing' || phase !== 'play' || locked) return;
    locked = true; phase = 'result'; Pl.ctrl = false; held.up = held.down = false; setBtns(); endGuide(); eqHl(null);
    const r = results[ri]; if (r) { r.tiempoAgotado = true; r.refuerzo = true; r.tiempoMs = TIME_LIMIT; }
    VOICE.stopAll(); speakingN = 0; applySpeaking(); SFX.hint();
    await vCue('nar-tiempo', 'hint', '⏱', 2600); hideVbox(); await wait(250); await nextStage();
  });

  /* ===================== SALIDA DE LA ESTACIÓN Y SIGUIENTE TRAMO ===================== */
  async function exitStation() {
    hideVbox(); eqHl(null); Pl.ctrl = false; Pl.glide = null; setBtns(); SFX.whoosh(); gust = 1;
    el.station.classList.remove('on'); burstStreaks();
    const y0 = Pl.y, x0 = Pl.x; Pl.scale = 1;
    setPower(1.7, 800, easeIn).catch(() => {});
    await tween(1100, (q, pr) => { Pl.x = lerp(x0, GOZ_X + 40 * Math.sin(Math.PI * pr), 1); Pl.y = lerp(y0, GOZ_REST, easeInOut(pr)); }, lin);
    el.boxes.innerHTML = ''; boxList = []; Pl.x = GOZ_X;
    await setPower(1, 800, easeOut);
  }
  function burstStreaks() { for (let i = 0; i < 12; i++) P({ kind: 'line', x: rand(300, 1300), y: rand(80, 680), vx: -rand(1400, 2400), vy: 0, life: rand(.3, .6), size: rand(140, 300), w: rand(1.5, 3), c: pick([C.white, C.cyan]), a: .8 }); }
  async function nextStage() {
    phase = 'result'; locked = true; setBtns(); VOICE.stopAll(); speakingN = 0; applySpeaking(); timer.on = false;
    await exitStation();
    if (ri >= TOTAL - 1) { celebrate(); return; }
    startStage(ri + 1);
  }
  const startStage = guard(async (i) => {
    ri = i; R = i < 0 ? PRACTICE : RONDAS[i];
    if (i >= 0) results[i] = results[i] || { n: i + 1, id: RONDAS[i].id, intentos: 0, pistas: 0, errores: 0, ganado: false, primerIntento: false, refuerzo: false, tiempoMs: 0 };
    await flyInterval(i); await stationIn();
  });

  /* ===================== GUÍA PASO A PASO (solo en el reto 1) ===================== */
  let guideTok = 0, guideOn = false;
  function clearGuideVis() { document.querySelectorAll('.guide').forEach((n) => n.classList.remove('guide')); el.fx.querySelectorAll('.stepnum').forEach((d) => d.remove()); }
  function endGuide() { if (!guideOn) return; guideOn = false; guideTok++; clearGuideVis(); VOICE.stopAll(); speakingN = 0; applySpeaking(); hideVbox(); }
  const runGuide = guard(async () => {
    const tok = ++guideTok; guideOn = true;
    const steps = [{ key: 'nar-g1a', on: () => el.grid.classList.add('guide'), pos: [566, 300] }, { key: 'nar-g1b', on: () => boxList.forEach((b) => b.el.classList.add('guide')), pos: [446, 560] }];
    await wait(300);
    for (let k = 0; k < steps.length; k++) {
      if (tok !== guideTok) return; clearGuideVis(); steps[k].on();
      const d = div('stepnum', el.fx, `left:${steps[k].pos[0]}px;top:${steps[k].pos[1]}px;`); d.textContent = k + 1; SFX.pop();
      el.vbox.className = 'show hint'; el.vboxIco.textContent = '👆';
      await speak(steps[k].key, 'high'); if (tok !== guideTok) return; await wait(k < steps.length - 1 ? 350 : 700);
    }
    if (tok === guideTok) { guideOn = false; clearGuideVis(); hideVbox(); }
  });

  /* ===================== CELEBRACIÓN CON EL MOSAICO, J-04 Y FINAL ===================== */
  async function celebrate() {
    cancelAll(); state = 'celebrate'; phase = 'none'; locked = true; timer.on = false; Pl.ctrl = false; Pl.spin = 0; Pl.scale = 1; Pl.op = 1; setBtns();
    renderPieces(); el.station.classList.remove('on'); el.station.classList.add('celebrate'); void el.station.offsetWidth; el.station.classList.add('on');
    setPower(1.2, 800, easeOut).catch(() => {}); SFX.win();
    celebrateRun().catch(() => {});
  }
  const celebrateRun = guard(async () => {
    const full = gotPieces.length === TOTAL && gotPieces.every(Boolean);
    await wait(900); if (full) { ringFx(640, 360, 30, 300, C.gold, 1.2, 10); glowFx(640, 360, 240, C.cyan, 1.2, .9); el.mosaic.classList.add('full'); }
    for (let i = 0; i < 6; i++) setTimeout(() => { if (state === 'celebrate') { SFX.firework(); fireworkFx(rand(200, 1080), rand(90, 300)); } }, 300 + i * 520);
    confettiFx(640, -20, 120, 1200, 80);
    // vuelo triunfal alrededor del mosaico
    const x0 = Pl.x, y0 = Pl.y;
    await tween(4600, (q, pr) => { const a = pr * Math.PI * 2 * 1.5 - Math.PI / 2; Pl.x = lerp(x0, 640 + 330 * Math.cos(a), Math.min(1, pr * 4)); Pl.y = lerp(y0, 360 + 150 * Math.sin(a), Math.min(1, pr * 4)); Pl.flip = Math.sin(a + Math.PI / 2) >= 0 ? -1 : 1; Pl.rot = 0; }, lin);
    Pl.flip = 1; await wait(300); showReflect();
  });
  function showReflect() {
    cancelAll(); state = 'reflect'; $('screen-reflect').classList.add('active'); survey = { ronda: -1, texto: '' };
    el.rfOrders.innerHTML = ''; el.rfOpts.innerHTML = ''; el.rfText.value = ''; el.rfContinue.disabled = true; el.rfThanks.className = ''; el.rfThanks.textContent = '';
    const g1 = results.filter((r) => r && r.primerIntento).length, g2 = results.filter((r) => r && r.ganado && !r.primerIntento).length;
    el.rfSummary.innerHTML = `<span>Aciertos en el primer intento: <b>${g1}</b></span><span>Aciertos después de reintento: <b>${g2}</b></span><span>Monedas: <b>${coinsGot}</b></span>`;
    const upd = () => { el.rfContinue.disabled = !(survey.ronda >= 0 && el.rfText.value.trim().length >= 3); };
    RONDAS.forEach((r, i) => {
      const b = document.createElement('button'); b.className = 'rf-card'; b.type = 'button'; b.setAttribute('aria-label', `Reto ${i + 1}: ${fmt(r.a)} más ${fmt(r.b)}`);
      b.innerHTML = `<b>Reto ${i + 1}</b><span class="big">${fmt(r.a)}</span><small>+ ${fmt(r.b)}</small>`;
      b.addEventListener('click', () => { SFX.click(); [...el.rfOrders.children].forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); survey.ronda = i; upd(); });
      el.rfOrders.appendChild(b);
    });
    ESTRATEGIAS.forEach((t) => {
      const b = document.createElement('button'); b.className = 'rf-opt'; b.type = 'button'; b.textContent = t;
      b.addEventListener('click', () => { SFX.click(); [...el.rfOpts.children].forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); el.rfText.value = t; upd(); });
      el.rfOpts.appendChild(b);
    });
    el.rfText.oninput = upd; speak('nar-j04');
  }
  async function finishReflect() {
    if (survey.ronda < 0 || el.rfText.value.trim().length < 3) return; el.rfContinue.disabled = true; survey.texto = el.rfText.value.trim();
    window.rescateSession = { rondas: results.map((r) => ({ ...r })), piezas: gotPieces.filter(Boolean).length, monedas: coinsGot, rondaMasDificil: survey.ronda + 1, estrategia: survey.texto, tiempoTotalMs: Math.round(clock - gameStart) };
    el.rfThanks.textContent = 'Gracias por compartir tu estrategia. Vamos a seguir practicando solo.'; el.rfThanks.className = 'show'; SFX.correct();
    await capped(speak('nar-gracias'), 7000); await wait(400); finish();
  }
  function finish() {
    $('screen-reflect').classList.remove('active'); state = 'end'; phase = 'none'; showScreen('screen-game'); setBtns(); SFX.win();
    el.station.classList.remove('on'); el.station.classList.remove('celebrate'); Pl.x = GOZ_X; Pl.y = GOZ_REST; Pl.flip = 1;
    const g1 = results.filter((r) => r && r.primerIntento).length, g2 = results.filter((r) => r && r.ganado && !r.primerIntento).length, piezas = gotPieces.filter(Boolean).length;
    const k = Math.floor(Math.random() * PHRASES.length); el.endPhrase.textContent = PHRASES[k]; el.endStars.innerHTML = '';
    for (let i = 0; i < TOTAL; i++) { const s = document.createElement('i'); if (results[i] && results[i].ganado) { s.className = 'on'; s.style.animationDelay = (0.3 + i * 0.14) + 's'; } el.endStars.appendChild(s); }
    el.endMosaic.innerHTML = '<img src="' + W + 'mosaico.webp" alt="" draggable="false" />'; gotPieces.forEach((g, i) => { if (g) addPiece(el.endMosaic, i, false, .92); }); el.endMosaic.classList.toggle('full', piezas === TOTAL);
    el.endSum.innerHTML = `<span>Mosaico: <b>${piezas}</b> de ${TOTAL} piezas</span><span>Primer intento: <b>${g1}</b></span><span>Después de reintento: <b>${g2}</b></span><span>Monedas: <b>${coinsGot}</b></span>`;
    el.end.classList.add('active'); confettiFx(640, -20, 120, 1200, 80);
    setTimeout(() => confettiFx(400, 300, 50, 500, 320), 350); setTimeout(() => confettiFx(900, 300, 50, 500, 320), 700);
    for (let i = 0; i < 5; i++) setTimeout(() => { if (state === 'end') { SFX.firework(); fireworkFx(rand(160, 1120), rand(90, 300)); } }, 300 + i * 380);
    setTimeout(() => speak('nar-final-' + k), 1400);
  }

  /* ===================== BUCLE ===================== */
  function step(dt) {
    if (paused) return;
    DT = dt; clock += dt; stepTweens(dt); stepTimer(dt);
    if (state === 'playing' || state === 'celebrate' || state === 'reflect' || state === 'end') {
      wspeed = speedOf(power) * (1 + Math.min(1, gust) * .25);
      off.sky = (off.sky + wspeed * .004 * dt / 1000) % (VW * 2); off.isl = (off.isl + wspeed * .03 * dt / 1000) % (VW * 2); off.clo = (off.clo + wspeed * .1 * dt / 1000) % (VW * 2);
      el.stripSky.style.transform = `translateX(${(-off.sky).toFixed(1)}px)`; el.stripIsl.style.transform = `translate(${(-off.isl).toFixed(1)}px, ${(Math.sin(clock / 2400) * 3).toFixed(1)}px)`; el.stripClo.style.transform = `translateX(${(-off.clo).toFixed(1)}px)`;
      drawEnv(dt); emitAmbient(dt); stepGoz(dt); stepCoins(dt); stepSprite(SG, dt); if (state === 'end') stepSprite(SE, dt);
    }
    stepParts(dt);
    if (shakeAmp > .2) shakeAmp *= Math.pow(.9, dt / 16); else shakeAmp = 0;
    el.world.style.transform = shakeAmp > .2 ? `translate(${(rand(-1, 1) * shakeAmp).toFixed(1)}px,${(rand(-1, 1) * shakeAmp).toFixed(1)}px)` : '';
    drawParts();
  }
  function frame(ts) { const dt = frame.last ? Math.min(ts - frame.last, 50) : 0; frame.last = ts; if (!window.__manual) step(dt); requestAnimationFrame(frame); }

  /* ===================== PANTALLAS / CONTROL ===================== */
  function showScreen(id) { document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active')); if (id) $(id).classList.add('active'); }
  function resetWorld() {
    clearCoins(); el.boxes.innerHTML = ''; boxList = []; el.station.classList.remove('on', 'celebrate'); el.fx.innerHTML = ''; el.mosaic.classList.remove('full'); el.pieces.innerHTML = '';
    Object.assign(Pl, { x: -300, y: GOZ_REST, vy: 0, spin: 0, scale: 1, op: 1, ctrl: false, glide: null, flip: 1 }); held.up = held.down = false; power = 1; hideVbox(); eqHl(null);
  }
  const startGame = guard(async () => {
    cancelAll(); endGuide(); paused = false; locked = true; VOICE.stopAll(); speakingN = 0; applySpeaking(); SFX.unlock(); VOICE.unlock();
    results = []; gotPieces = new Array(TOTAL).fill(false); coinsGot = 0; setCoins(); renderStars(); el.pause.classList.remove('active'); el.end.classList.remove('active'); $('screen-reflect').classList.remove('active'); resetWorld(); gameStart = clock;
    showScreen('screen-game'); state = 'playing'; await startStage(-1);
  });
  function goMenu() { cancelAll(); endGuide(); state = 'menu'; phase = 'none'; paused = false; locked = true; timer.on = false; VOICE.stopAll(); speakingN = 0; applySpeaking(); resetWorld(); el.pause.classList.remove('active'); el.end.classList.remove('active'); $('screen-reflect').classList.remove('active'); showScreen('screen-start'); }
  function togglePause(force) {
    if (state !== 'playing') return; paused = force === undefined ? !paused : !!force; el.pause.classList.toggle('active', paused);
    if (paused) { endGuide(); VOICE.stopAll(); speakingN = 0; applySpeaking(); held.up = held.down = false; }
  }
  function toggleMute() { SFX.unlock(); VOICE.unlock(); const m = SFX.toggleMute(); VOICE.setMuted(m); el.btnSound.classList.toggle('muted', m); }

  /* ===================== ENTRADA ===================== */
  function holdBtn(btn, key) {
    const on = (e) => { e.preventDefault(); SFX.unlock(); VOICE.unlock(); held[key] = true; btn.classList.add('pressed'); };
    const off = () => { held[key] = false; btn.classList.remove('pressed'); };
    btn.addEventListener('pointerdown', on); btn.addEventListener('pointerup', off); btn.addEventListener('pointerleave', off); btn.addEventListener('pointercancel', off);
    btn.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  function bindUI() {
    $('btn-play').addEventListener('click', () => { SFX.unlock(); VOICE.unlock(); SFX.click(); startGame(); });
    $('btn-instructions').addEventListener('click', () => { SFX.unlock(); VOICE.unlock(); SFX.click(); state = 'menu'; showScreen('screen-instructions'); VOICE.play('nar-intro', 'high'); });
    $('btn-go').addEventListener('click', () => { SFX.unlock(); SFX.click(); VOICE.stopAll(); startGame(); });
    $('btn-inst-back').addEventListener('click', () => { SFX.click(); VOICE.stopAll(); showScreen('screen-start'); });
    $('btn-mute-a').addEventListener('click', toggleMute);
    $('screen-game').addEventListener('pointerdown', () => { if (guideOn) endGuide(); }, true);
    document.addEventListener('keydown', () => { if (guideOn) endGuide(); }, true);
    holdBtn(el.btnUp, 'up'); holdBtn(el.btnDown, 'down');
    el.btnListen.addEventListener('pointerdown', (e) => {
      e.preventDefault(); SFX.unlock(); VOICE.unlock(); if (state !== 'playing' || phase !== 'play') return;
      VOICE.stopAll(); speakingN = 0; listening = true; applySpeaking(); VOICE.play(R.practice ? 'nar-prueba' : `nar-q${R.n}`, 'high', () => { listening = true; applySpeaking(); }).then(() => { listening = false; applySpeaking(); });
    });
    el.btnPause.addEventListener('click', () => { SFX.click(); togglePause(); });
    $('btn-resume').addEventListener('click', () => { SFX.click(); togglePause(false); });
    $('btn-restart').addEventListener('click', () => { SFX.click(); startGame(); });
    $('btn-pause-home').addEventListener('click', () => { SFX.click(); goMenu(); });
    $('btn-again').addEventListener('click', () => { SFX.click(); startGame(); });
    $('btn-end-home').addEventListener('click', () => { SFX.click(); goMenu(); });
    el.btnSound.addEventListener('click', toggleMute);
    el.rfContinue.addEventListener('click', () => { SFX.click(); finishReflect(); });
    // teclado: ↑/↓ (o W/S) vuelan; en la estación ←/→ cambian de caja y Tab + Intro la eligen; P pausa
    const KEYS = { ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down' };
    document.addEventListener('keydown', (e) => {
      const k = e.key;
      if (state === 'playing') {
        if (k === 'p' || k === 'P' || k === 'Escape') { if (!e.repeat) togglePause(); return; }
        if (paused) return;
        if (KEYS[k]) { e.preventDefault(); held[KEYS[k]] = true; }
        else if ((k === 'ArrowRight' || k === 'ArrowLeft') && canPlay() && boxList.length) {
          e.preventDefault(); const cur = boxList.findIndex((b) => b.el === document.activeElement); const nx = cur < 0 ? (k === 'ArrowRight' ? 0 : boxList.length - 1) : (cur + (k === 'ArrowRight' ? 1 : -1) + boxList.length) % boxList.length; boxList[nx].el.focus(); SFX.aim();
        } else if ((k === ' ') && canPlay() && boxList.length && document.activeElement === document.body && !e.repeat) { e.preventDefault(); nudge('Toca una de las tres cajas', 640, 450); SFX.wrong(); speak('nar-nosel', 'hint'); }
      }
    });
    document.addEventListener('keyup', (e) => { if (KEYS[e.key]) held[KEYS[e.key]] = false; });
    window.addEventListener('blur', () => { held.up = held.down = false; });
    document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'playing' && !paused && !window.__noAutoPause) togglePause(true); });
    document.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  /* ===================== ESCALADO Y ARRANQUE ===================== */
  function resize() { const s = Math.min(el.stageWrap.clientWidth / VW, el.stageWrap.clientHeight / VH); el.stage.style.transform = `translate(-50%, -50%) scale(${s})`; }
  function preload(done) {
    let loaded = 0; const total = manifest.length; let fin = false;
    const finish2 = () => { if (!fin) { fin = true; done(); } };
    const tick = () => { loaded++; el.loadingFill.style.width = Math.round(loaded / total * 100) + '%'; if (loaded >= total) finish2(); };
    manifest.forEach((im) => { if (im.complete && im.naturalWidth) tick(); else { im.onload = tick; im.onerror = tick; } });
    setTimeout(finish2, 15000);
  }
  function init() {
    resize(); window.addEventListener('resize', resize); window.addEventListener('orientationchange', () => setTimeout(resize, 120));
    R = PRACTICE; bindUI(); renderStars(); setCoins(); gotPieces = new Array(TOTAL).fill(false); requestAnimationFrame(frame);

    /*QA-START*/
    // sondas para pruebas (QA): el build de entrega las elimina
    window.__rm = {
      get: () => ({ state, phase, ri, attempts, locked, timer: Math.round(timer.spent), power: +power.toFixed(2), vcls: el.vbox.className, ico: el.vboxIco.textContent, coins: coinsGot, goz: { x: Math.round(Pl.x), y: Math.round(Pl.y), ctrl: Pl.ctrl }, coinN: coinList.length, boxes: boxList.map((b) => ({ v: b.val, cls: b.el.className })), pieces: gotPieces.slice(), results }),
      advance: async (ms) => { let k = 0; for (let t = 0; t < ms; t += 16) { step(16); for (let i = 0; i < 5; i++) await null; if (++k % 40 === 0) await new Promise((r) => setTimeout(r, 0)); } },
      start: () => startGame(),
      go: (i) => { cancelAll(); resetWorld(); state = 'playing'; showScreen('screen-game'); ri = i; R = i < 0 ? PRACTICE : RONDAS[i]; if (i >= 0) results[i] = results[i] || { n: i + 1, id: RONDAS[i].id, intentos: 0, pistas: 0, errores: 0, ganado: false, primerIntento: false, refuerzo: false, tiempoMs: 0 }; Pl.x = GOZ_X; guard(stationIn)(); },
      goFly: (i) => { cancelAll(); resetWorld(); state = 'playing'; showScreen('screen-game'); ri = i; R = i < 0 ? PRACTICE : RONDAS[i]; Pl.x = GOZ_X; guard(flyInterval)(i); },
      choose: (i) => { chooseBox(i); return 0; }, setSpent: (v) => { timer.spent = v; }, hold: (k, v) => { held[k] = v; }, setY: (y) => { Pl.y = y; },
      pieces: (n) => { gotPieces = gotPieces.map((_, i) => i < n); renderPieces(); },
      celebrate: () => { results = RONDAS.map((r, i) => ({ n: i + 1, ganado: i !== 3, intentos: 1, errores: i === 3 ? 1 : 0, reintentos: 0, primerIntento: i !== 3 })); gotPieces = RONDAS.map((_, i) => i !== 3); coinsGot = 88; setCoins(); celebrate(); },
      reflect: () => { results = RONDAS.map((r, i) => ({ n: i + 1, ganado: i !== 3, intentos: 1, errores: i === 3 ? 1 : 0, reintentos: i === 4 ? 1 : 0, primerIntento: i !== 3 && i !== 4 })); gotPieces = RONDAS.map((_, i) => i !== 3); coinsGot = 88; setCoins(); showReflect(); }, finish: () => finish(), cancel: cancelAll
    };
    /*QA-END*/
    preload(() => { setTimeout(() => { state = 'menu'; showScreen('screen-start'); }, 300); });
  }
  init();
})();
