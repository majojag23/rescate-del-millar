/* ============================================================
   SFX - Efectos con Web Audio API (sin archivos, sin música de fondo)
   Rescate del millar
   ============================================================ */
const SFX = (() => {
  let ctx = null, master = null, noiseBuffer = null;
  let muted = false;

  function ensureCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.9;
      master.connect(ctx.destination);
      const rate = ctx.sampleRate;
      noiseBuffer = ctx.createBuffer(1, rate, rate);
      const d = noiseBuffer.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, type = 'sine', peak = 0.2, glideTo = null) {
    const c = ensureCtx();
    const o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, c.currentTime + start);
    if (glideTo !== null) o.frequency.exponentialRampToValueAtTime(Math.max(glideTo, 1), c.currentTime + start + dur);
    g.gain.setValueAtTime(0.0001, c.currentTime + start);
    g.gain.exponentialRampToValueAtTime(peak, c.currentTime + start + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
    o.connect(g).connect(master);
    o.start(c.currentTime + start);
    o.stop(c.currentTime + start + dur + 0.03);
  }

  function noise(start, dur, freq, type = 'lowpass', peak = 0.3, glideTo = null) {
    const c = ensureCtx();
    const s = c.createBufferSource(); s.buffer = noiseBuffer; s.loop = true;
    const f = c.createBiquadFilter(); f.type = type;
    f.frequency.setValueAtTime(freq, c.currentTime + start);
    if (glideTo !== null) f.frequency.exponentialRampToValueAtTime(Math.max(glideTo, 40), c.currentTime + start + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, c.currentTime + start);
    g.gain.exponentialRampToValueAtTime(peak, c.currentTime + start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
    s.connect(f).connect(g).connect(master);
    s.start(c.currentTime + start);
    s.stop(c.currentTime + start + dur + 0.03);
  }

  return {
    unlock() { ensureCtx(); },
    isMuted() { return muted; },
    toggleMute() {
      muted = !muted;
      if (master) master.gain.setTargetAtTime(muted ? 0 : 0.9, ctx.currentTime, 0.02);
      return muted;
    },

    /* ---- interfaz ---- */
    click()   { tone(700, 0, 0.06, 'square', 0.1); tone(1040, 0.05, 0.06, 'square', 0.08); },
    key()     { tone(1400 + Math.random() * 200, 0, 0.04, 'square', 0.07); noise(0, 0.03, 4000, 'highpass', 0.05); },
    del()     { tone(420, 0, 0.08, 'triangle', 0.1, 260); },
    pop()     { tone(500, 0, 0.07, 'triangle', 0.12, 850); },
    hint()    { tone(700, 0, 0.1, 'sine', 0.12); tone(1050, 0.1, 0.14, 'sine', 0.13); },
    select()  { tone(880, 0, 0.07, 'triangle', 0.12, 1320); tone(1320, 0.06, 0.08, 'sine', 0.07); },
    whoosh()  { noise(0, 0.5, 500, 'bandpass', 0.16, 3000); tone(220, 0, 0.45, 'sawtooth', 0.03, 700); },
    swoosh()  { noise(0, 1.0, 400, 'bandpass', 0.1, 2400); },

    /* ---- nave y espacio ---- */
    sputter() { for (let i = 0; i < 7; i++) { tone(150 - i * 11, i * 0.07, 0.06, 'sawtooth', 0.07); noise(i * 0.07, 0.05, 900 - i * 90, 'lowpass', 0.07); } },
    boost()   { noise(0, 0.9, 300, 'bandpass', 0.2, 4200); tone(120, 0, 0.8, 'sawtooth', 0.07, 760); tone(240, 0.05, 0.7, 'triangle', 0.05, 1500); },
    reignite() { noise(0, 0.5, 400, 'bandpass', 0.15, 2600); tone(110, 0, 0.45, 'sawtooth', 0.07, 420); },
    zap()     { noise(0, 0.5, 5200, 'highpass', 0.2, 900); tone(900, 0, 0.45, 'sawtooth', 0.14, 70); tone(1300, 0.05, 0.3, 'square', 0.07, 120); },
    hit()     { tone(120, 0, 0.3, 'sine', 0.4, 45); noise(0, 0.25, 900, 'lowpass', 0.32, 150); tone(520, 0, 0.12, 'square', 0.1, 200); },
    shoot()   { tone(2600 + Math.random() * 600, 0, 0.35, 'sine', 0.035, 600); },
    aim()     { tone(1100, 0, 0.05, 'triangle', 0.08, 1400); },
    arrive()  { tone(330, 0, 0.14, 'triangle', 0.1, 520); tone(660, 0.08, 0.16, 'sine', 0.07, 880); },
    warp()    { noise(0, 1.1, 250, 'bandpass', 0.22, 6000); tone(80, 0, 1.0, 'sawtooth', 0.09, 1100); tone(160, 0.1, 0.9, 'triangle', 0.07, 2200); },
    dash()    { noise(0, 0.35, 900, 'bandpass', 0.18, 5000); tone(300, 0, 0.3, 'sawtooth', 0.07, 1400); },
    shield()  { tone(500, 0, 0.18, 'sine', 0.12, 1100); tone(750, 0.04, 0.2, 'triangle', 0.08, 300); },

    coin(c = 0) { const f = 880 * Math.pow(1.0595, Math.min(c, 12) * 2); tone(f, 0, 0.08, 'square', 0.07); tone(f * 1.5, 0.06, 0.16, 'triangle', 0.1); },
    steal() { tone(500, 0, 0.12, 'sawtooth', 0.08, 220); },
    chime()   { [784, 988, 1175, 1568].forEach((f, i) => tone(f, i * 0.07, 0.3, 'sine', 0.12)); },
    flap()    { noise(0, 0.12, 1800, 'bandpass', 0.03, 700); },

    /* ---- grúa y pinza ---- */
    servo(d = 0.5, f0 = 150, f1 = 190) { tone(f0, 0, d, 'sawtooth', 0.045, f1); tone(f0 * 2, 0, d, 'square', 0.02, f1 * 2); noise(0, d, 900, 'bandpass', 0.03, 1400); },
    winch(d = 0.6, up = false) { for (let i = 0; i < d / 0.07; i++) tone(up ? 280 + i * 4 : 340 - i * 4, i * 0.07, 0.04, 'square', 0.035); },
    clamp()   { tone(180, 0, 0.1, 'square', 0.2, 90); noise(0, 0.08, 2200, 'highpass', 0.22); tone(1900, 0.02, 0.12, 'triangle', 0.1, 1300); },
    release() { tone(1200, 0, 0.1, 'triangle', 0.1, 700); noise(0, 0.12, 5000, 'highpass', 0.08); },
    clank()   { tone(1500, 0, 0.22, 'square', 0.1, 1100); tone(2260, 0, 0.3, 'triangle', 0.09); noise(0, 0.08, 6000, 'highpass', 0.12); },
    thud()    { tone(95, 0, 0.3, 'sine', 0.38, 42); noise(0, 0.12, 700, 'lowpass', 0.25, 180); },
    lever()   { tone(150, 0, 0.14, 'square', 0.2, 70); noise(0, 0.16, 700, 'lowpass', 0.25, 180); tone(95, 0.18, 0.16, 'square', 0.16, 60); },
    hiss()    { noise(0, 0.5, 4500, 'highpass', 0.1, 1200); },
    buzzer()  { tone(150, 0, 0.35, 'sawtooth', 0.18, 110); tone(160, 0, 0.35, 'square', 0.1, 100); },
    splash()  { noise(0, 0.6, 1800, 'lowpass', 0.22, 300); noise(0.05, 0.4, 5000, 'highpass', 0.1, 1500); },

    /* ---- soldadura y dron ---- */
    weld(d = 1) { for (let i = 0; i < d / 0.045; i++) { if (Math.random() < .8) noise(i * 0.045, 0.04, 4200 + Math.random() * 2500, 'highpass', 0.12); } tone(95, 0, d, 'sawtooth', 0.05); },
    arc()     { noise(0, 0.12, 7000, 'highpass', 0.16); tone(2400 + Math.random() * 600, 0, 0.06, 'square', 0.04); },
    rotor(d = 1) { for (let i = 0; i < d / 0.06; i++) noise(i * 0.06, 0.05, 700 + (i % 2) * 120, 'bandpass', 0.07); tone(120, 0, d, 'sawtooth', 0.04, 150); },
    step()    { noise(0, 0.05, 700 + Math.random() * 300, 'lowpass', 0.09); },

    /* ---- resultado ---- */
    correct() {
      [660, 880, 1108, 1320, 1568].forEach((f, i) => tone(f, i * 0.08, 0.18, 'triangle', 0.2));
      setTimeout(() => noise(0, 0.3, 5200, 'highpass', 0.05), 380);
    },
    note(i = 0) { const sc = [523, 587, 659, 784, 880, 1046, 1175, 1318]; tone(sc[i % 8], 0, 0.16, 'triangle', 0.13); tone(sc[i % 8] * 2, 0.02, 0.1, 'sine', 0.04); },
    boing() { tone(260, 0, 0.18, 'sine', 0.2, 620); tone(520, 0.05, 0.12, 'triangle', 0.08, 900); },
    land() { tone(130, 0, 0.18, 'sine', 0.32, 70); noise(0, 0.08, 1400, 'lowpass', 0.14, 300); tone(880, 0.03, 0.1, 'triangle', 0.08); },
    sparkle() { tone(1800 + Math.random() * 700, 0, 0.06, 'triangle', 0.09); },
    star()    { [880, 1174, 1568].forEach((f, i) => tone(f, i * 0.07, 0.2, 'triangle', 0.16)); },
    wrong()   { tone(320, 0, 0.16, 'sawtooth', 0.13, 170); tone(230, 0.14, 0.22, 'sawtooth', 0.12, 120); },
    firework() { tone(500, 0, 0.18, 'sine', 0.1, 1400); setTimeout(() => { noise(0, 0.3, 4200, 'highpass', 0.14, 900); tone(220, 0, 0.2, 'sine', 0.2, 70); }, 170); },
    complete() { [392, 523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.09, 0.3, 'triangle', 0.18)); tone(130, 0, 0.5, 'sine', 0.2, 60); },
    win()     { [523, 659, 784, 1046, 1318, 1568].forEach((f, i) => tone(f, i * 0.12, 0.26, 'triangle', 0.22)); setTimeout(() => noise(0, 0.4, 4200, 'highpass', 0.06), 640); }
  };
})();
