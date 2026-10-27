import { mkdir, writeFile, access, readdir, readFile, rename } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  throw new Error('Falta ELEVENLABS_API_KEY. Ejecuta GENERAR VOCES.cmd para pegarla de forma segura.');
}

// La voz depende del prefijo de la clave (ver js/voz-guion.js)
const VOICES = {
  nar: 'YKUjKbMlejgvkOZlnnvt'    // Narrador: Alejandro Ballesteros
};

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'assets', 'voz');
const force = process.argv.includes('--force');

const sandbox = { window: {} };
vm.runInNewContext(await readFile(path.join(root, 'js', 'voz-guion.js'), 'utf8'), sandbox);
const guion = sandbox.window.VOZ_GUION;

await mkdir(outputDir, { recursive: true });

for (const [key, text] of Object.entries(guion)) {
  const prefix = key.split('-')[0];
  const voiceId = VOICES[prefix];
  if (!voiceId) throw new Error(`Sin voz para la clave "${key}"`);
  const output = path.join(outputDir, `${key}.mp3`);
  if (!force) {
    try { await access(output); console.log(`Ya existe: ${key}.mp3`); continue; } catch {}
  }
  const voice_settings = { stability: 0.5, similarity_boost: 0.8, use_speaker_boost: true };
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'xi-api-key': apiKey },
      body: JSON.stringify({ text, model_id: 'eleven_v3', voice_settings })
    }
  );
  if (!response.ok) {
    throw new Error(`ElevenLabs respondió ${response.status} para "${text}": ${await response.text()}`);
  }
  await writeFile(output, Buffer.from(await response.arrayBuffer()));
  console.log(`Creado: ${key}.mp3 (${prefix})`);
}

// eleven_v3 a veces deja segundos de silencio al final/inicio: se recortan con ffmpeg (si está instalado)
function recortarSilencio(file) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-i', file, '-af', 'silencedetect=noise=-30dB:d=0.25', '-f', 'null', '-'], { encoding: 'utf8' });
  if (r.error) return null;
  const out = r.stderr || '';
  const d = /Duration: (\d+):(\d+):([\d.]+)/.exec(out);
  if (!d) return false;
  const total = +d[1] * 3600 + +d[2] * 60 + +d[3];
  const starts = [...out.matchAll(/silence_start: (-?[\d.]+)/g)].map((m) => Math.max(0, +m[1]));
  const ends = [...out.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  let ss = 0, tt = total;
  if (starts.length && starts[0] <= 0.02 && ends.length) ss = Math.max(0, ends[0] - 0.06);
  if (starts.length > ends.length || (ends.length && total - ends[ends.length - 1] < 0.05)) {
    const tail = starts[starts.length - 1];
    if (tail > ss + 0.1) tt = Math.min(total, tail + 0.2);
  }
  if (ss < 0.05 && total - tt < 0.3) return false;
  const tmp = file + '.tmp.mp3';
  const c = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(ss), '-i', file, '-t', String(tt - ss), '-q:a', '2', tmp]);
  return c.status === 0 ? tmp : false;
}
let recortados = 0, sinFfmpeg = false;
for (const f of (await readdir(outputDir)).filter((n) => n.endsWith('.mp3'))) {
  const file = path.join(outputDir, f);
  const tmp = recortarSilencio(file);
  if (tmp === null) { sinFfmpeg = true; break; }
  if (tmp) { await rename(tmp, file); recortados++; }
}
console.log(sinFfmpeg ? 'ffmpeg no está instalado: no se recortó el silencio (opcional).' : `Silencio recortado en ${recortados} audios.`);

const listo = (await readdir(outputDir)).filter((f) => f.endsWith('.mp3')).map((f) => f.replace(/\.mp3$/, '')).sort();
await writeFile(path.join(outputDir, 'lista.js'),
  '/* Lista de audios MP3 generados (la reescribe el generador). Vacía = el juego usa la voz del navegador. */\n' +
  `window.VOZ_LISTA = ${JSON.stringify(listo)};\n`);
console.log(`Audios guardados en: ${outputDir} (${listo.length})`);
