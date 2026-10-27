# Rescate del millar

Juego educativo de Matemáticas (Día 19): **suma de cuatro cifras con reagrupación de centenas a millares**. Mecánica de plataformas y recolección: el niño vuela recogiendo monedas, llega a cada estación y elige la respuesta correcta con reintentos y pistas.

## Cómo jugarlo

Abre `index.html` desde un servidor web local, por ejemplo:

```bash
python -m http.server
```

y visita http://localhost:8000. Funciona en PC (mouse y teclado) y en tablet (táctil), en horizontal. También se puede subir tal cual a un LMS.

## Qué incluye

- `index.html`, `css/`, `js/`, `fonts/`: el juego.
- `assets/`: imágenes, interfaz y voces narradas (mp3).
- `escena.json`, `assets-manifest.json`: composición de la escena y localización de recursos.
- `tools/`, `build_rescate.py`: herramientas para generar y empaquetar el juego.
- `PROMPT_MAESTRO.md`: especificación con la que se construyó.
- `ELEVENLABS.md`, `GENERAR VOCES.cmd`, `generar_voces.ps1`: cómo regenerar las voces. La clave de ElevenLabs **nunca** se guarda en el repositorio: se lee de una variable de entorno o se pide de forma oculta.

## Controles

↑/↓ (o W/S) vuelan · ←/→ cambian de caja · Tab + Intro eligen · P o Esc pausan.

## Datos de la sesión

`window.rescateSession` registra los retos (aciertos en primer intento o tras reintento, pistas, refuerzo, tiempo), las piezas del mosaico, las monedas, el reto que más costó y la estrategia escrita por el estudiante.
