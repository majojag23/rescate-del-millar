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

