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

