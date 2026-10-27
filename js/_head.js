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

