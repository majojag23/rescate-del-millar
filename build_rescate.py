# Genera entrega/ (solo lo que usa el juego, sin sondas de prueba) y Rescate_millar_entrega.zip
import os, re, shutil, zipfile
ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'entrega')
ZIP = os.path.join(ROOT, 'Rescate_millar_entrega.zip')

if os.path.isdir(OUT): shutil.rmtree(OUT)
os.makedirs(OUT)

def cp(rel):
    src = os.path.join(ROOT, rel); dst = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True); shutil.copy2(src, dst)

for f in ('index.html', 'fonts.css', 'ELEVENLABS.md', 'GENERAR VOCES.cmd', 'generar_voces.ps1', 'css/style.css', 'js/voice.js', 'js/sfx.js', 'js/voz-guion.js', 'tools/generate_elevenlabs_audio.mjs'):
    cp(f)
g = open(os.path.join(ROOT, 'js', 'game.js'), encoding='utf8').read()
g = re.sub(r'\n\s*/\*QA-START\*/.*?/\*QA-END\*/\n', '\n', g, flags=re.S)
os.makedirs(os.path.join(OUT, 'js'), exist_ok=True)
open(os.path.join(OUT, 'js', 'game.js'), 'w', encoding='utf8').write(g)
for f in os.listdir(os.path.join(ROOT, 'fonts')): cp('fonts/' + f)
for base, _, files in os.walk(os.path.join(ROOT, 'assets', 'web')):
    for f in files: cp(os.path.relpath(os.path.join(base, f), ROOT).replace(chr(92), '/'))
for f in os.listdir(os.path.join(ROOT, 'assets', 'voz')): cp('assets/voz/' + f)

open(os.path.join(OUT, 'LEEME.md'), 'w', encoding='utf8').write('''# Rescate del millar (Día 19 · suma de cuatro cifras con reagrupación de centenas a millares)

Abre `index.html` desde un servidor web (por ejemplo `python -m http.server`) o súbelo tal cual al LMS. Funciona en PC (mouse + teclado) y tablet (táctil), en horizontal.

- Flujo: inicio (Jugar / Instrucciones) -> vuelo con monedas -> prueba de controles (J-02, sin puntaje: 10 + 10) -> vuelo -> estación del reto 1 -> ... -> reto 6 (J-03a-f) -> Goz celebra con el mosaico -> "después del juego" (J-04: reto que más costó + estrategia) -> pop-up "¡Lo lograste!" con "Volver a jugar".
- Goz vuela sin parar sobre islas flotantes (3 capas con parallax, nubes, rayos de luz, viento, pájaros lejanos, plumas). Entre estación y estación se sube y baja con las flechas para recoger monedas-pluma.
- En cada estación aparece la tabla de valor posicional M-C-D-U con los dos sumandos y la columna de centenas resaltada, y tres cajas con resultados (A, B, C) tal como en la ficha. Se toca/clic una caja (o ←/→ + Intro, o Tab + Intro) y Goz vuela hasta ella: si acierta la tabla se completa con la reagrupación (el millar se traslada), una pieza del mosaico vuela a su lugar y suma una estrella.
- 1 intento + 2 reintentos con las 2 pistas de cada reto (narradas; resaltan la columna de centenas y la traslado al millar, sin revelar la respuesta). Agotados, el juego sigue sin mostrar la respuesta y se registra "requiere refuerzo" (dato interno, no se muestra). Tiempo oculto de 45 s por reto, sin penalización.
- Teclado: ↑/↓ (o W/S) vuelan; ←/→ cambian de caja; Tab + Intro eligen; P o Esc pausan.
- Voz (ElevenLabs): narrador Alejandro. Botón "Leer en voz alta" repite el enunciado. Ver `ELEVENLABS.md`.
- Datos de la sesión: `window.rescateSession` (retos con aciertos en primer intento / tras reintento, pistas, refuerzo, tiempo, piezas del mosaico, monedas, reto más difícil y estrategia escrita).
''')
if os.path.exists(ZIP): os.remove(ZIP)
with zipfile.ZipFile(ZIP, 'w', zipfile.ZIP_DEFLATED) as z:
    for base, _, files in os.walk(OUT):
        for f in files:
            p = os.path.join(base, f); z.write(p, os.path.relpath(p, OUT))
tot = sum(os.path.getsize(os.path.join(b, f)) for b, _, fs in os.walk(OUT) for f in fs)
print('entrega OK:', round(tot / 1e6, 1), 'MB - zip', round(os.path.getsize(ZIP) / 1e6, 1), 'MB')
