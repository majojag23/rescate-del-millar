/* ============================================================
   VOICE - narración del juego
   1) Si existe assets/voz/<clave>.mp3 (ver ELEVENLABS.md) lo reproduce.
   2) Si no, usa la voz en español del navegador/dispositivo como respaldo.

   Prioridades (para que la retroalimentación NUNCA se corte):
   - play(clave, 'high')  → se pone en cola y se dice completa (niveles, felicitaciones, errores).
   - play(clave, 'hint')  → como 'high', pero se descarta si ya hay algo sonando o en cola (avisos repetibles).
   - play(clave)          → 'low' (nombre de la letra): se descarta si hay una voz 'high' en curso.
   play() devuelve una promesa que se resuelve cuando termina (o se descarta / se corta con stopAll).
   ============================================================ */
const VOICE = (() => {
  const guion = window.VOZ_GUION || {};
  const listed = new Set(window.VOZ_LISTA || []);
  const cache = {};
  const queue = [];
  let playing = null;      // { key, high, resolve, cancel }
  let muted = false;

  function pickVoice() {
    if (!('speechSynthesis' in window)) return null;
    const vs = speechSynthesis.getVoices() || [];
    const es = vs.filter((v) => /^es[-_]/i.test(v.lang));
    return es.find((v) => /(419|mx|us|latin|sabina|paulina|monica)/i.test(v.lang + ' ' + v.name)) || es[0] || null;
  }
  if ('speechSynthesis' in window) { try { speechSynthesis.getVoices(); } catch (e) {} }

  function speak(text, done) {
    if (!('speechSynthesis' in window) || !text) { done(); return () => {}; }
    let ended = false;
    const finish = () => { if (ended) return; ended = true; clearTimeout(t); done(); };
    const t = setTimeout(finish, 1500 + text.length * 90);
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice();
      u.lang = v ? v.lang : 'es-419'; if (v) u.voice = v;
      u.rate = 0.88; u.pitch = 1.1;
      u.onend = finish; u.onerror = finish;
      speechSynthesis.speak(u);
    } catch (e) { finish(); }
    return () => { try { speechSynthesis.cancel(); } catch (e) {} finish(); };
  }

  function playFile(key, done, fallback) {
    let a = cache[key];
    if (!a) { a = new Audio(`assets/voz/${key}.mp3`); a.preload = 'auto'; cache[key] = a; }
    let ended = false;
    // guardia: ningún audio debe durar más de 30 s; si uno se queda "pegado" el juego continúa
    const wd = setTimeout(() => { try { a.pause(); } catch (e) {} finish(); }, 30000);
    const finish = () => { if (ended) return; ended = true; clearTimeout(wd); a.onended = a.onerror = null; done(); };
    a.onended = finish;
    a.onerror = () => { if (ended) return; ended = true; delete cache[key]; fallback(); };
    try { a.pause(); a.currentTime = 0; } catch (e) {}
    const p = a.play();
    if (p && p.catch) p.catch(() => { if (!ended) { ended = true; fallback(); } });
    return () => { try { a.pause(); a.currentTime = 0; } catch (e) {} finish(); };
  }

  function run(item) {
    playing = item;
    if (item.onstart) { try { item.onstart(); } catch (e) {} }
    const done = () => { if (playing === item) playing = null; item.resolve(); next(); };
    if (listed.has(item.key)) {
      const cancel = playFile(item.key, done, () => { item.cancel = speak(guion[item.key], done); });
      item.cancel = () => cancel();
    } else {
      item.cancel = speak(guion[item.key], done);
    }
  }
  function next() { if (!playing && queue.length) run(queue.shift()); }

  function stopAll() {
    const pend = queue.splice(0);
    pend.forEach((q) => q.resolve());
    if (playing) { const p = playing; playing = null; if (p.cancel) p.cancel(); p.resolve(); }
  }

  return {
    unlock() { if ('speechSynthesis' in window) { try { speechSynthesis.getVoices(); } catch (e) {} } },
    isMuted() { return muted; },
    setMuted(v) { muted = !!v; if (muted) stopAll(); },
    stopAll,
    busy() { return !!playing || queue.length > 0; },
    play(key, mode = 'low', onstart = null) {
      return new Promise((resolve) => {
        if (muted || !guion[key]) { resolve(); return; }
        const high = mode === 'high' || mode === 'hint';
        if (mode === 'hint' && (playing || queue.length)) { resolve(); return; }
        if (!high) {
          if ((playing && playing.high) || queue.length) { resolve(); return; }   // no pisar la retroalimentación
          if (playing) { const p = playing; playing = null; if (p.cancel) p.cancel(); p.resolve(); }
        }
        queue.push({ key, high, resolve, cancel: null, onstart });
        next();
      });
    }
  };
})();
