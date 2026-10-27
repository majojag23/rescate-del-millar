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
