# Voces de "Rescate del millar" con ElevenLabs

1. Abre `GENERAR VOCES.cmd`.
2. Si existe la variable de entorno `ELEVENLABS_API_KEY` se usa sola; si no, pega una clave (se oculta al escribir y no se guarda).
3. Se crean los MP3 en `assets\voz` y se actualiza `assets\voz\lista.js`. Para regenerarlos: `generar_voces.ps1 --force`. El guion se genera con `tools/make_voz.py`.

Voz: narrador (todas las claves `nar-`) = Alejandro Ballesteros `YKUjKbMlejgvkOZlnnvt`, modelo eleven_v3. Goz no habla.
Mientras no existan los MP3 el juego habla con la voz en español del navegador/dispositivo.
