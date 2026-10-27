# Implementar: Rescate del millar 

Construye un juego educativo funcional a partir de esta maqueta. Usa escena.json como fuente de verdad para la composición y assets-manifest.json para localizar los recursos. La maqueta HTML es una referencia visual, NO un juego terminado.

## Objetivo y reglas
Asignatura: Matemáticas
Mecánica: Plataformas y recolección
Objetivo educativo:  practicar la reagrupación de centenas a millares en un formato de reto con reintentos y pistas
Instrucciones del autor: el niño va volando cojiendo monedas por cada reto llega a la estacion y debe seleccionar la respuesta correcta puede ver la tabla donde estan organizados los datos por cada acierto gana una estrella y completa una parte del mosaico al final goz celebra con el mosaico completo  la encuesta y el boton de volver a jugar, mete mucha animacion y demas cosas tecnicas de otros juego  

## Contrato visual
Lienzo lógico: 1280 × 720 px. Coordenadas x/y en la esquina superior izquierda; rotación en grados alrededor del centro. El orden de objects va del fondo al frente.
Respeta posición, tamaño, opacidad, giro, reflejos, textos y recortes crop (píxeles del archivo original). No uses una captura completa como fondo sustituyendo objetos interactivos.
layer=Interfaz significa fijado a la pantalla. Las demás capas pertenecen al mundo. hidden significa no renderizar; locked es solo un bloqueo de edición. role y notes son intención de diseño, no código ejecutado.
Si hay crop, utiliza ese recorte; no muestres toda la hoja de sprites. Si existe atlas, utiliza su definición original. No supongas que los fotogramas numerados son animaciones aprobadas.

## Pantallas de este archivo
Este archivo trae 4 pantallas. Cada una es una composición 2D independiente y completa (no una rotación 3D de la misma escena) — arma cada una por separado siguiendo su propia referencia visual. El orden aquí es el orden de flujo pensado por la autora, pero las transiciones entre ellas (cuándo pasa de una a otra) no están definidas salvo que las notas lo digan explícitamente.
1. Vista lateral [Juego] → referencia: pantallas/01-juego-vista-lateral.png
2. Vista lateral [Juego] → referencia: pantallas/02-juego-vista-lateral.png
3. Vista principal (copia) [Juego] → referencia: pantallas/03-juego-vista-principal-copia.png
4. Vista principal [Juego] → referencia: pantallas/04-juego-vista-principal.png · PANTALLA ACTIVA (referencia.png)

## Recursos exactos

## Personajes KIRA incluidos
Referencia visual oficial (para identificar cada personaje y etapa a simple vista): https://contenido.edu.gob.sv/muestra/personajeskira/index.html
Cada carpeta trae ya TODAS las animaciones disponibles de esa etapa (estándar del paquete v3); no hace falta pedir ni buscar más fotogramas de ese personaje/etapa.
- GOZ · etapa e3 → carpeta assets/personajes/goz/e3/

- ID 11a116037546a6c36987d57a · GOZ · Etapa 3 · Saltar
  Paquete: assets/personajes/goz/e3/jump.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/personajes-kira/personajes/goz/e3/jump_sheet.png
  SHA-256: 96dded1f05ffe79bea47e8fb7f3fcb013e04d952ef94df7d40ac548898497637
  Atlas: assets/personajes/goz/e3/jump.json
  Personaje: goz / e3; movimiento: jump; orientación: original; frames: 25; fps de referencia: 12.
  Observación del autor del paquete: Torogoz adulto. volar = vuelo horizontal estricto. Mira a la derecha (flipeado). walk sostiene 3/4.
- ID 1578ab000f8894098fb1c6e4 · mosaico-vacio
  Paquete: assets/props/mosaico-vacio.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/0e7994da-5f24-4fdd-8688-532f2f6f207b/mosaico-vacio.png
  SHA-256: 4887cb3b3a9d95831b35e7085fc6c91b5c9ab6de5c1db4c1fc4f6785394d5378
- ID 1f7514d4fbec30cbca7001fe · 02-islas-lejanas
  Paquete: assets/props/02-islas-lejanas.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/d35fb0b7-6a14-468f-b9ef-7cb926c7da23/02-islas-lejanas.png
  SHA-256: 482e3102bc6699d1a04e1384b4037f4328312c596c1782c64c396d09ddb0351d
- ID 3271a87b0eab5cad554198fe · pantalla-inicio-v1
  Paquete: assets/referencias/pantalla-inicio-v1.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/ab1940eb-45d6-4675-87c7-319fc2bf883b/pantalla-inicio-v1.png
  SHA-256: 155431ff1fb0ad758aec64bfd63ada556da45150b478dea6f61e37b3275c3f23
- ID 5441b8afb49e648b8b3c4e62 · GOZ · Etapa 3 · Caminar · Izquierda
  Paquete: assets/personajes/goz/e3/walk-izquierda.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/personajes-kira/personajes/goz/e3/alt_mira_izquierda/walk_sheet.png
  SHA-256: eefa4805a867b35d6f3c5a6a5738fd842b28c4623686891c3557a39c629f26ae
  Atlas: assets/personajes/goz/e3/walk-izquierda.json
  Personaje: goz / e3; movimiento: walk; orientación: izquierda; frames: 25; fps de referencia: 12.
  Observación del autor del paquete: Torogoz adulto. volar = vuelo horizontal estricto. Mira a la derecha (flipeado). walk sostiene 3/4.
- ID 591b65c0b3de515daee65100 · GOZ · Etapa 3 · Caminar
  Paquete: assets/personajes/goz/e3/walk.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/personajes-kira/personajes/goz/e3/walk_sheet.png
  SHA-256: 182e468431c2d89d8d3bc785e6c938df34265abf069254efd30580727ff96a66
  Atlas: assets/personajes/goz/e3/walk.json
  Personaje: goz / e3; movimiento: walk; orientación: original; frames: 25; fps de referencia: 12.
  Observación del autor del paquete: Torogoz adulto. volar = vuelo horizontal estricto. Mira a la derecha (flipeado). walk sostiene 3/4.
- ID 5cd58fecda45626d89501d22 · moneda-pluma
  Paquete: assets/props/moneda-pluma.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/4762b387-97e2-4faf-a681-e37b9c4f4560/objetos/moneda-pluma.png
  SHA-256: 0a4edd3599f9f681549d0382d364025a9c728c4a2a82abd3212a4202b551a3c8
- ID 6d6769ab2779eb92616abdcf · GOZ · Etapa 3 · Reposo · Izquierda
  Paquete: assets/personajes/goz/e3/idle-izquierda.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/personajes-kira/personajes/goz/e3/alt_mira_izquierda/idle_sheet.png
  SHA-256: 9d094a46f540ca6a999edf75781f65c2351eb126331d3ce953e3ea54c79ce708
  Atlas: assets/personajes/goz/e3/idle-izquierda.json
  Personaje: goz / e3; movimiento: idle; orientación: izquierda; frames: 25; fps de referencia: 8.
  Observación del autor del paquete: Torogoz adulto. volar = vuelo horizontal estricto. Mira a la derecha (flipeado). walk sostiene 3/4.
- ID 7edf9b67b5ea5f63c75caa73 · flecha-arriba
  Paquete: assets/props/flecha-arriba.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/69a0b3c8-2bd9-4744-aefb-a6d8dae3f526/flecha-arriba.png
  SHA-256: f19b590bf319386d9933d2e15808289c8e909101d885fa99787b900d98e02e5e
- ID 8e53e122ab5edb85ccc49448 · diagrama-MCDU-vacio
  Paquete: assets/props/diagrama-mcdu-vacio.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/1c83d707-6afc-4a72-b0ee-3ee741341b46/diagrama-MCDU-vacio.png
  SHA-256: 6b1ae9eb30b0099a3d7b39e5363441498e90c2011982ff26411a83786880ebcf
- ID 8f03ecce4c17dd96bfa89f01 · pieza-hexagonal
  Paquete: assets/props/pieza-hexagonal.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/29d2bbf0-c85d-4fff-88db-440913942ecb/pieza-hexagonal.png
  SHA-256: d84ad2380df1f976cb937584824cefa74916324ab7c8401778978f1aca410dd4
- ID 8f871cf856937a8809385669 · GOZ · Etapa 3 · Saltar · Izquierda
  Paquete: assets/personajes/goz/e3/jump-izquierda.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/personajes-kira/personajes/goz/e3/alt_mira_izquierda/jump_sheet.png
  SHA-256: ea763408a5d70de852173e850179a11eacab50650599199a99b998ac6612a8a4
  Atlas: assets/personajes/goz/e3/jump-izquierda.json
  Personaje: goz / e3; movimiento: jump; orientación: izquierda; frames: 25; fps de referencia: 12.
  Observación del autor del paquete: Torogoz adulto. volar = vuelo horizontal estricto. Mira a la derecha (flipeado). walk sostiene 3/4.
- ID 97c4615bddbc819a6e37cba5 · GOZ · Etapa 3 · Volar · Izquierda
  Paquete: assets/personajes/goz/e3/volar-izquierda.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/personajes-kira/personajes/goz/e3/alt_mira_izquierda/volar_sheet.png
  SHA-256: feea5151404b27daa81d29f1a6554de0a3602087db05ca5da12435562ecc664e
  Atlas: assets/personajes/goz/e3/volar-izquierda.json
  Personaje: goz / e3; movimiento: volar; orientación: izquierda; frames: 25; fps de referencia: 12.
  Observación del autor del paquete: Torogoz adulto. volar = vuelo horizontal estricto. Mira a la derecha (flipeado). walk sostiene 3/4.
- ID 98899603884e77ebdac5bdca · GOZ · Etapa 3 · Volar
  Paquete: assets/personajes/goz/e3/volar.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/personajes-kira/personajes/goz/e3/volar_sheet.png
  SHA-256: c8c590e55a6bf502be55010cf67c545d49705c7cbe791b5fd48a10d75c3fecac
  Atlas: assets/personajes/goz/e3/volar.json
  Personaje: goz / e3; movimiento: volar; orientación: original; frames: 25; fps de referencia: 12.
  Observación del autor del paquete: Torogoz adulto. volar = vuelo horizontal estricto. Mira a la derecha (flipeado). walk sostiene 3/4.
- ID 9bcd74e7a06e9f54d5abacd1 · boton-pausa-normal
  Paquete: assets/interfaz/boton-pausa-normal.png
  Original local: /home/customer/juegos_workspace/diseño juegos matemáticas/02-componentes/png/boton-pausa-normal.png
  SHA-256: 37502c903e72f2903416950d7ec5a71cf016ede74cdb18e9fd3a85b02a5d68b7
- ID b373007861f1eeaa49cdc5da · pedestal
  Paquete: assets/props/pedestal.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/f983d384-77a8-45aa-a85e-ea39a6a76aaa/pedestal.png
  SHA-256: 2cbefb52e75a04e59a4b5516c3aa12405796434f52a613309e500e25615064fe
- ID c040baef29e4136d7e9cbe3d · GOZ · Etapa 3 · Correr · Izquierda
  Paquete: assets/personajes/goz/e3/run-izquierda.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/personajes-kira/personajes/goz/e3/alt_mira_izquierda/run_sheet.png
  SHA-256: 3d536598bb74abe08eb30ac9c2b8e7139fd92520cab373de54be33fad6df7f74
  Atlas: assets/personajes/goz/e3/run-izquierda.json
  Personaje: goz / e3; movimiento: run; orientación: izquierda; frames: 25; fps de referencia: 12.
  Observación del autor del paquete: Torogoz adulto. volar = vuelo horizontal estricto. Mira a la derecha (flipeado). walk sostiene 3/4.
- ID c5908e9295a349ce0783cd66 · 01-cielo
  Paquete: assets/props/01-cielo.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/dbf35428-9c09-4356-a474-5ade715cfe7a/01-cielo.png
  SHA-256: 3025d8de8294ec90d92d3ee6308b126394603b80027bf8146090c30f53724463
- ID c657baf65fb921ae9c146c93 · boton-sonido-normal
  Paquete: assets/interfaz/boton-sonido-normal.png
  Original local: /home/customer/juegos_workspace/diseño juegos matemáticas/02-componentes/png/boton-sonido-normal.png
  SHA-256: 1a135ff11756376743e95be7dc1e9a6a8e3cf5a64b802135afc936f985d58d13
- ID cc7e872a2cbc0ebaffef0d02 · 03-nubes-cercanas
  Paquete: assets/props/03-nubes-cercanas.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/28afb5ae-e8c3-40a7-8b6e-23880e1e9522/03-nubes-cercanas.png
  SHA-256: 68d4ffb7d49aabed67a7c4f1631eb6b8df9aabec7392507772dff7bc60058f99
- ID d3b49cf8baf9c9030c358be3 · GOZ · Etapa 3 · Referencia
  Paquete: assets/personajes/goz/e3/ref_oficial.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/personajes-kira/personajes/goz/e3/ref_oficial.png
  SHA-256: 197025fc99ae6c1b335d9af4d5a09c185b3b68945db4ad962320970d88b41de6
  Personaje: goz / e3; movimiento: ref_oficial; orientación: original; frames: 0; fps de referencia: 12.
  Observación del autor del paquete: Torogoz adulto. volar = vuelo horizontal estricto. Mira a la derecha (flipeado). walk sostiene 3/4.
- ID d8e7341c41b61035ec085002 · flecha-abajo
  Paquete: assets/props/flecha-abajo.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/69a0b3c8-2bd9-4744-aefb-a6d8dae3f526/flecha-abajo.png
  SHA-256: 59bfc3fd43690c0e798e198ea6f412417c8b47ccd74741fe2fdda0eec3ff0616
- ID e4191a12a7b3429d460e666b · caja-respuesta
  Paquete: assets/props/caja-respuesta.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/2d42b8f0-b5b4-4c05-ba3a-7d74a49517c2/caja-respuesta.png
  SHA-256: fdafea7b51e82364f63643f76c9c7c21b281e9cf364e79ed7bb5123508027777
- ID e42d425f653a80071417a057 · pantalla-instrucciones-v1
  Paquete: assets/referencias/pantalla-instrucciones-v1.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/6f20218d-1003-40f5-99d8-6c50992d51da/pantalla-instrucciones-v1.png
  SHA-256: ad04b932b9785a1507e33f2cfef520a1c79a2b56e8db224a8a5560c7990e9b23
- ID e935d048a2e26059991ecaee · panel-reto
  Paquete: assets/interfaz/panel-reto.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/c2358615-8181-43d0-b7e4-8409fa397fc5/panel-reto.png
  SHA-256: e67b01fb61c7f1931a6b3a1f5e95d2980b7584d63e9d2b4d2838803efae38725
- ID eed654d8a71ad9b66578e3de · GOZ · Etapa 3 · Reposo
  Paquete: assets/personajes/goz/e3/idle.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/personajes-kira/personajes/goz/e3/idle_sheet.png
  SHA-256: f56c392ca243ab18249bd0c30f3be56e5b92b4fa9cd1380b61b8d7be40a8f4fd
  Atlas: assets/personajes/goz/e3/idle.json
  Personaje: goz / e3; movimiento: idle; orientación: original; frames: 25; fps de referencia: 8.
  Observación del autor del paquete: Torogoz adulto. volar = vuelo horizontal estricto. Mira a la derecha (flipeado). walk sostiene 3/4.
- ID f712fe236f663a05dc0d7723 · efecto-acierto
  Paquete: assets/props/efecto-acierto.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/imports/61c3c36a-f1db-421f-bad1-dabb6cfb325f/efecto-acierto.png
  SHA-256: 53e4be72983edfe2d278d791d0425b38ff10ef20aba760ac7a84c69154c588c9
- ID f9ef262eec9ca6408b693770 · GOZ · Etapa 3 · Correr
  Paquete: assets/personajes/goz/e3/run.png
  Original local: /home/customer/juegos_workspace/estudio-juegos/data/personajes-kira/personajes/goz/e3/run_sheet.png
  SHA-256: 1520cb962cc50326380e0320d49603c0006d5f1989c45912035cb22123a2962a
  Atlas: assets/personajes/goz/e3/run.json
  Personaje: goz / e3; movimiento: run; orientación: original; frames: 25; fps de referencia: 12.
  Observación del autor del paquete: Torogoz adulto. volar = vuelo horizontal estricto. Mira a la derecha (flipeado). walk sostiene 3/4.

Se incluyen todas las animaciones disponibles de cada personaje y etapa utilizados. Los atlas conservan el formato original: frames contiene x/y/w/h. Usa el PNG packagePath del manifiesto al cargar el atlas; no dependas del nombre original en meta.image. Conserva la separación entre etapas y orientaciones.

## Objetos y comportamientos
1. efecto-acierto [decoracion] ID=ceb3da4a-c6ee-4eb2-beaa-cb0b3df874bd asset=f712fe236f663a05dc0d7723; x=611.8922143445695, y=539.155809319144, tamaño=240×216.03630862329803, giro=0, capa=Objetos; texto=""; notas=
2. pieza-hexagonal [decoracion] ID=5ee0459b-9237-4d37-a5df-80a48420261b asset=8f03ecce4c17dd96bfa89f01; x=252.67234425469968, y=430.51434761176637, tamaño=74.10309124913633×74.10309124913633, giro=0, capa=Objetos; texto=""; notas=
3. 01-cielo [decoracion] ID=e229881b-b153-40fa-b3ec-755cd2f1d2f3 asset=c5908e9295a349ce0783cd66; x=-6.644115066598033, y=2.842170943040401e-14, tamaño=1309.288743789226×736.8664520966876, giro=0, capa=Objetos; texto=""; notas=
4. 03-nubes-cercanas [decoracion] ID=435a895f-9339-43f1-86cd-427957fd7b77 asset=cc7e872a2cbc0ebaffef0d02; x=19.297348387899888, y=8.289023242777972, tamaño=1283.347280334728×722.2666212888632, giro=0, capa=Objetos; texto=""; notas=
5. 02-islas-lejanas [decoracion] ID=59d1e58e-b603-4ca0-8b36-2138d55677fd asset=1f7514d4fbec30cbca7001fe; x=19.297348387899888, y=2.842170943040401e-14, tamaño=1289.2901094630256×725.6112398353512, giro=0, capa=Objetos; texto=""; notas=
6. Pieza 1 [decoracion] ID=af141cbd-3a2e-445b-acae-dac8f2e18370 asset=ninguno; x=15.477104297793488, y=30.550145750157256, tamaño=217.49636491067685×43.9905849145453, giro=0, capa=Objetos; texto=""; notas=
7. Pieza 2 [decoracion] ID=d505e5d3-97c7-4e96-a953-a1693cb85436 asset=ninguno; x=15.477104297793488, y=27.00508197659404, tamaño=214.70012589751713×43.9905849145453, giro=0, capa=Objetos; texto=""; notas=
8. Pieza 3 [decoracion] ID=a15ead1e-8c31-4e0a-bbae-d2a2d87b1130 asset=ninguno; x=20.788265771189202, y=29.937787637563744, tamaño=204.0778029507257×38.12517359260593, giro=0, capa=Objetos; texto=""; notas=
9. Pieza 4 [decoracion] ID=4f60a12b-6b27-4cd2-b858-f0a82002f268 asset=ninguno; x=28.45589066057154, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037, giro=0, capa=Objetos; texto=""; notas=
10. Pieza 5 [decoracion] ID=e7a6b5b7-50fe-42ed-9def-4a35544f2b5f asset=ninguno; x=61.08836409196948, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037, giro=0, capa=Objetos; texto=""; notas=
11. Pieza 6 [decoracion] ID=058d6d6b-b01a-40f3-9ffe-b8f11a8c9f42 asset=ninguno; x=93.72083752336741, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037, giro=0, capa=Objetos; texto=""; notas=
12. Pieza 7 [decoracion] ID=0efb0e3c-75ce-48f0-bae2-b2f8d094f96b asset=ninguno; x=126.35331095476536, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037, giro=0, capa=Objetos; texto=""; notas=
13. Pieza 1 [decoracion] ID=c962145f-5fe5-47e4-baf2-30e0e24de910 asset=ninguno; x=15.477104297793502, y=92.3888288521896, tamaño=215.60940862956366×32.68437352600664, giro=0, capa=Objetos; texto=""; notas=
14. Pieza 2 [decoracion] ID=0abb7076-89c7-438e-881f-1d616de7ca58 asset=ninguno; x=15.477104297793502, y=87.4403752439422, tamaño=215.29427676655556×34.69820080081924, giro=0, capa=Objetos; texto=""; notas=
15. Pieza 3 [decoracion] ID=550d37bb-6111-4637-abb4-d27dd985e76d asset=ninguno; x=18.66546628964693, y=90.73934431610714, tamaño=208.0091284265368×30.09495059411735, giro=0, capa=Objetos; texto=""; notas=
16. ¡Inténtalo de nuevo! [pregunta] ID=b41dad2f-d41c-4bc1-8a4c-008803c30d66 asset=ninguno; x=57.95341563387939, y=92.3888288521896, tamaño=111.77047424538853×27.711340206185568, giro=0, capa=Objetos; texto="Reto 1 de 6"; notas=
17. Pieza 7 [decoracion] ID=647b00e8-f751-4227-8315-3d4823dfd4df asset=ninguno; x=158.98578438616326, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037, giro=0, capa=Objetos; texto=""; notas=
18. Pieza 7 [decoracion] ID=0b8ea663-ef13-4117-9591-569bcd2525da asset=ninguno; x=191.6182578175612, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037, giro=0, capa=Objetos; texto=""; notas=
19. boton-sonido-normal [boton] ID=0f78c66d-a3dd-4317-912a-7029d3d4890a asset=c657baf65fb921ae9c146c93; x=1093.1284406551508, y=0, tamaño=91.59479808040727×97.91168070664224, giro=0, capa=Interfaz; texto=""; notas=
20. boton-pausa-normal [boton] ID=ba2af924-49c8-4fef-878d-b64f67c47488 asset=9bcd74e7a06e9f54d5abacd1; x=1172.8447757936815, y=0, tamaño=91.67811990852482×98.00074886773342, giro=0, capa=Interfaz; texto=""; notas=
21. Pieza 1 [decoracion] ID=6fd8d5f4-f14a-427b-9fb4-8de28f6bc27c asset=ninguno; x=18.66546628964693, y=139.6527417158474, tamaño=128.5003962973254×43.31474032494115, giro=0, capa=Objetos; texto=""; notas=
22. Pieza 2 [decoracion] ID=31e94932-4861-441d-a9bf-0453e631520c asset=ninguno; x=18.66546628964693, y=135.32126768335326, tamaño=128.5003962973254×43.31474032494115, giro=0, capa=Objetos; texto=""; notas=
23. Pieza 3 [decoracion] ID=1e5252c9-fa44-4f3a-a12b-6d0e4f63b849 asset=ninguno; x=21.553115644643007, y=138.20891703834934, tamaño=122.72509758733325×37.539441614949, giro=0, capa=Objetos; texto=""; notas=
24. Pieza 4 [decoracion] ID=27eb5940-81ba-4698-b1ed-aa0427b490b9 asset=ninguno; x=30.150435315199488, y=144.57487129822704, tamaño=27.56392566132619×27.56392566132619, giro=0, capa=Objetos; texto=""; notas=
25. Pieza 5 [decoracion] ID=e05d7286-852e-4d8f-974d-74d1a2f52616 asset=ninguno; x=30.150435315199488, y=142.5075768736276, tamaño=27.56392566132619×27.56392566132619, giro=0, capa=Objetos; texto=""; notas=
26. Pieza 6 [decoracion] ID=09b6987b-b453-47da-845d-bd0914daa46d asset=ninguno; x=32.90682788133214, y=145.26396943976022, tamaño=22.051140529060955×22.05114052906095, giro=0, capa=Objetos; texto=""; notas=
27. Pieza 7 [decoracion] ID=3ebc3d55-1c82-48ae-9882-1f1a0cf00fb5 asset=ninguno; x=34.974122305931616, y=147.3312638643597, tamaño=17.91655167986202×16.538355396795712, giro=0, capa=Objetos; texto=""; notas=
28. 30 [pregunta] ID=e0c018bb-89d6-4396-89e0-9ec49206dbfa asset=ninguno; x=77.16924508589958, y=145.42804042583953, tamaño=41.81315693227898×27.944267150417772, giro=0, capa=Objetos; texto="30"; notas=
29. flecha-abajo [decoracion] ID=5d15fa33-72a9-4d4a-aa57-10701325f942 asset=d8e7341c41b61035ec085002; x=63.293879691110064, y=616.2335854037859, tamaño=83.17989588781381×83.17989588781381, giro=0, capa=Objetos; texto=""; notas=
30. flecha-arriba [decoracion] ID=a3790d32-ffc9-46af-b62d-fc51fbd01738 asset=7edf9b67b5ea5f63c75caa73; x=63.293879691110064, y=526.7173357414508, tamaño=83.17989588781381×83.17989588781381, giro=0, capa=Objetos; texto=""; notas=
31. panel-reto [boton] ID=85486964-5395-4726-a4b7-513f8e29a62f asset=e935d048a2e26059991ecaee; x=324.26559930383144, y=39.77588015496298, tamaño=887.3148156881092×499.379929164181, giro=0, capa=Interfaz; texto=""; notas=
32. Pregunta [pregunta] ID=a8f20814-f536-43ed-b2df-add5d72c1f6e asset=ninguno; x=580.4753492634723, y=136.5220297293822, tamaño=398.17572994425973×35.61676723017102, giro=0, capa=Interfaz; texto="Resuelve: 2,916 + 3,342."; notas=
33. Pregunta [pregunta] ID=8871b3ea-8e0f-40c9-8493-f274bddaa2f9 asset=ninguno; x=463.52401350774966, y=398.19945696559023, tamaño=613.5536422879786×22.942526139115444, giro=0, capa=Interfaz; texto="Revisa la columna de centenas: ¿llegaste a diez o más?"; notas=
34. pedestal [decoracion] ID=e6bb4d27-9f02-4fdb-b952-f1d28814d948 asset=b373007861f1eeaa49cdc5da; x=463.52401350774977, y=591.5194240217252, tamaño=161.84108590481185×107.89405726987457, giro=0, capa=Objetos; texto=""; notas=
35. caja-respuesta [decoracion] ID=837db38c-8ed1-4bf5-910c-2590668662eb asset=e4191a12a7b3429d460e666b; x=463.5240135077497, y=483.62536675185066, tamaño=161.84108590481185×161.84108590481185, giro=0, capa=Objetos; texto=""; notas=
36. Pregunta [pregunta] ID=d08c7f75-4dda-4f4d-b9bc-edfdb05adfe0 asset=ninguno; x=508.4137636568391, y=551.304231177557, tamaño=72.06158560663317×26.483357053399118, giro=0, capa=Interfaz; texto="5,258"; notas=
37. pedestal [decoracion] ID=989667b5-55c6-4603-872a-48394ff9dac4 asset=b373007861f1eeaa49cdc5da; x=650.9716713921637, y=591.5194240217252, tamaño=161.84108590481185×107.89405726987457, giro=0, capa=Objetos; texto=""; notas=
38. caja-respuesta [decoracion] ID=7d1c3b18-fe27-4ea5-98c4-6cf7e9e80611 asset=e4191a12a7b3429d460e666b; x=650.9716713921637, y=483.62536675185066, tamaño=161.84108590481185×161.84108590481185, giro=0, capa=Objetos; texto=""; notas=
39. Pregunta [pregunta] ID=b7efebb2-0524-4921-a267-dc0a4a45ac96 asset=ninguno; x=695.861421541253, y=551.304231177557, tamaño=72.06158560663317×26.483357053399118, giro=0, capa=Interfaz; texto="6,258 "; notas=
40. pedestal [decoracion] ID=b4d6381c-5cd6-40de-8dc8-d94fe009507c asset=b373007861f1eeaa49cdc5da; x=834.4027154559711, y=591.5194240217252, tamaño=161.84108590481185×107.89405726987457, giro=0, capa=Objetos; texto=""; notas=
41. caja-respuesta [decoracion] ID=06a86d33-a3f6-4e26-9808-f7eafefac127 asset=e4191a12a7b3429d460e666b; x=834.4027154559711, y=483.62536675185066, tamaño=161.84108590481185×161.84108590481185, giro=0, capa=Objetos; texto=""; notas=
42. Pregunta [pregunta] ID=c8436a6e-642e-47ec-b012-4cc2a29de3f0 asset=ninguno; x=879.2924656050604, y=551.304231177557, tamaño=72.06158560663317×26.483357053399118, giro=0, capa=Interfaz; texto="6,268"; notas=
43. GOZ · Etapa 3 · Volar [personaje] ID=99e116ae-a3ee-47f6-974a-48f5ea31a95e asset=98899603884e77ebdac5bdca; x=30.150435315199488, y=200.7758656558741, tamaño=240×240, giro=0, capa=Objetos; texto=""; notas=
44. mosaico-vacio [decoracion] ID=3b263aa1-b0f8-418e-a253-83f60052c6a3 asset=1578ab000f8894098fb1c6e4; x=158.9857843861633, y=472.85169999317645, tamaño=240×237.33544805709752, giro=0, capa=Objetos; texto=""; notas=
45. diagrama-MCDU-vacio [decoracion] ID=a6a4ae84-24c1-4958-abaf-351d1a6c8cf6 asset=8e53e122ab5edb85ccc49448; x=581.9574126069979, y=153.12965129843877, tamaño=371.9311890817763×278.94839181133227, giro=0, capa=Objetos; texto=""; notas=
46. Pregunta [pregunta] ID=59a3854d-9877-4bb6-a999-b36d923c7b56 asset=ninguno; x=629.8418073457865, y=242.29856966004928, tamaño=36.316898964456755×35.61676723017102, giro=0, capa=Interfaz; texto="2"; notas=
47. Pregunta [pregunta] ID=dc254e45-7ad2-4c90-91f9-ff75532c7a49 asset=ninguno; x=713.7337648623411, y=242.29856966004928, tamaño=36.316898964456755×35.61676723017102, giro=0, capa=Interfaz; texto="9"; notas=
48. Pregunta [pregunta] ID=f5cb0469-62a5-4664-abfa-8b3281ba1c06 asset=ninguno; x=794.654307814747, y=242.29856966004928, tamaño=36.316898964456755×35.61676723017102, giro=0, capa=Interfaz; texto="1"; notas=
49. Pregunta [pregunta] ID=8daeb725-2241-4617-890f-3c9197f1e9ed asset=ninguno; x=879.0063594439202, y=242.29856966004928, tamaño=36.316898964456755×35.61676723017102, giro=0, capa=Interfaz; texto="6"; notas=
50. Pregunta [pregunta] ID=873efc63-0ede-4b8e-91b7-b1e9527abaf3 asset=ninguno; x=629.8418073457865, y=289.46584473705354, tamaño=36.316898964456755×35.61676723017102, giro=0, capa=Interfaz; texto="3"; notas=
51. Pregunta [pregunta] ID=27c2d861-a594-4083-973f-cabdf2d1b91d asset=ninguno; x=713.7337648623411, y=289.46584473705354, tamaño=36.316898964456755×35.61676723017102, giro=0, capa=Interfaz; texto="3"; notas=
52. Pregunta [pregunta] ID=85e22606-e630-4246-83ff-4eb2a51e1bc7 asset=ninguno; x=794.654307814747, y=289.46584473705354, tamaño=36.316898964456755×35.61676723017102, giro=0, capa=Interfaz; texto="4"; notas=
53. Pregunta [pregunta] ID=f87f2995-1941-4939-8939-10d1ba5ecc67 asset=ninguno; x=879.0063594439202, y=289.46584473705354, tamaño=36.316898964456755×35.61676723017102, giro=0, capa=Interfaz; texto="2"; notas=

## Vistas y cámaras
Cada vista es una composición 2D independiente. No es una rotación 3D automática. Conserva sus assets y composición; si faltan dibujos de un ángulo, identifícalos antes de sustituirlos. No inventes transiciones entre cámaras sin reglas del autor.
Vista activa de referencia.png: fa131382-2e8c-440d-88f0-8e4e35eab5fa.
### Vista lateral · [Juego] · Lateral · f7e0aac8-5ae9-4ef3-9341-d6186f03f3e7
Lienzo: 1280 × 720. Notas del autor: 
- pantalla-inicio-v1 ID=18241508-3e87-4574-bf57-4b926dce326a; asset=3271a87b0eab5cad554198fe; función=decoracion; x=0, y=0, tamaño=1279.3305439330543×720.006005885768; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
### Vista lateral · [Juego] · Lateral · a1edce22-1177-405c-a6fe-02b4265c96ce
Lienzo: 1280 × 720. Notas del autor: 
- pantalla-instrucciones-v1 ID=e4c9dfc1-e068-428c-8d43-0c73be8cce2c; asset=e42d425f653a80071417a057; función=decoracion; x=0, y=0, tamaño=1279.3198724760891×720; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
### Vista principal (copia) · [Juego] · Lateral · 73ec314a-2fc7-4841-b2c8-fa262fe2785d
Lienzo: 1280 × 720. Notas del autor: 
- pieza-hexagonal ID=356eb862-9577-4e73-9f31-6b2b4ddf98d7; asset=8f03ecce4c17dd96bfa89f01; función=decoracion; x=252.67234425469968, y=430.51434761176637, tamaño=74.10309124913633×74.10309124913633; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- 01-cielo ID=7ad17e6f-0a8b-473a-80db-c4e79487f438; asset=c5908e9295a349ce0783cd66; función=decoracion; x=-6.644115066598033, y=2.842170943040401e-14, tamaño=1309.288743789226×736.8664520966876; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- 03-nubes-cercanas ID=e7e60bf0-38dc-49e4-bc04-04074689eb80; asset=cc7e872a2cbc0ebaffef0d02; función=decoracion; x=19.297348387899888, y=8.289023242777972, tamaño=1283.347280334728×722.2666212888632; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- 02-islas-lejanas ID=1d86b944-9526-4970-9b0a-07954984b13b; asset=1f7514d4fbec30cbca7001fe; función=decoracion; x=19.297348387899888, y=2.842170943040401e-14, tamaño=1289.2901094630256×725.6112398353512; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 1 ID=df44b4f3-a4bd-49ed-a1ab-afb91b43460d; asset=ninguno; función=decoracion; x=15.477104297793488, y=30.550145750157256, tamaño=217.49636491067685×43.9905849145453; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 2 ID=99c81207-264e-4690-976e-8f7da928620e; asset=ninguno; función=decoracion; x=15.477104297793488, y=27.00508197659404, tamaño=214.70012589751713×43.9905849145453; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 3 ID=0e2d9614-61d7-461f-89b0-5f5b801a1f3d; asset=ninguno; función=decoracion; x=20.788265771189202, y=29.937787637563744, tamaño=204.0778029507257×38.12517359260593; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 4 ID=140d2ebf-bd58-41c5-bd22-6c944c9897cd; asset=ninguno; función=decoracion; x=28.45589066057154, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 5 ID=d2e0c66a-ea09-4096-aaaa-2d452cb7adbf; asset=ninguno; función=decoracion; x=61.08836409196948, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 6 ID=12b50ffe-5bb1-4828-a922-c8ee7cd88baf; asset=ninguno; función=decoracion; x=93.72083752336741, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 7 ID=e30ed332-e733-491f-bc8d-a3b6916ba0de; asset=ninguno; función=decoracion; x=126.35331095476536, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 1 ID=ced28442-58d9-4766-888d-8559958650c5; asset=ninguno; función=decoracion; x=15.477104297793502, y=92.3888288521896, tamaño=215.60940862956366×32.68437352600664; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 2 ID=5b58125b-557f-46f9-bfbe-c720b751d3e9; asset=ninguno; función=decoracion; x=15.477104297793502, y=87.4403752439422, tamaño=215.29427676655556×34.69820080081924; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 3 ID=ed237c83-5942-4720-9db2-a265c6706fd2; asset=ninguno; función=decoracion; x=18.66546628964693, y=90.73934431610714, tamaño=208.0091284265368×30.09495059411735; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- ¡Inténtalo de nuevo! ID=4db3be85-ef6e-4ef0-bab2-c39a8d43c15b; asset=ninguno; función=pregunta; x=57.95341563387939, y=92.3888288521896, tamaño=111.77047424538853×27.711340206185568; giro=0; texto="Reto 1 de 6"; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 7 ID=c35ad16a-672b-4e50-87fe-dee582921839; asset=ninguno; función=decoracion; x=158.98578438616326, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 7 ID=4dffded5-12c7-498c-87ef-1b1fb959be9a; asset=ninguno; función=decoracion; x=191.6182578175612, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- boton-sonido-normal ID=86938665-9ec2-4895-aa58-ea285aa1e581; asset=c657baf65fb921ae9c146c93; función=boton; x=1093.1284406551508, y=0, tamaño=91.59479808040727×97.91168070664224; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- boton-pausa-normal ID=bc0b9e7b-ecc0-444f-8c1d-2293622dc10c; asset=9bcd74e7a06e9f54d5abacd1; función=boton; x=1172.8447757936815, y=0, tamaño=91.67811990852482×98.00074886773342; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 1 ID=8e6ecb5b-c934-4e05-9099-48996fe9b03a; asset=ninguno; función=decoracion; x=18.66546628964693, y=139.6527417158474, tamaño=128.5003962973254×43.31474032494115; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 2 ID=3b31c086-d9ac-4834-8a54-1dfcf41fc152; asset=ninguno; función=decoracion; x=18.66546628964693, y=135.32126768335326, tamaño=128.5003962973254×43.31474032494115; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 3 ID=b6716586-f1bf-4bad-9f10-7f8a793d4034; asset=ninguno; función=decoracion; x=21.553115644643007, y=138.20891703834934, tamaño=122.72509758733325×37.539441614949; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 4 ID=3e1b772f-f692-45eb-8bf0-8614e3c800be; asset=ninguno; función=decoracion; x=30.150435315199488, y=144.57487129822704, tamaño=27.56392566132619×27.56392566132619; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 5 ID=bb8eb688-bc46-4c2f-a10a-f996dbcf72bf; asset=ninguno; función=decoracion; x=30.150435315199488, y=142.5075768736276, tamaño=27.56392566132619×27.56392566132619; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 6 ID=ea5f956b-f315-4ea3-b5eb-f0e58774fa6c; asset=ninguno; función=decoracion; x=32.90682788133214, y=145.26396943976022, tamaño=22.051140529060955×22.05114052906095; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 7 ID=64a7a6ea-2a4b-4aef-a7ab-867b295d8dea; asset=ninguno; función=decoracion; x=34.974122305931616, y=147.3312638643597, tamaño=17.91655167986202×16.538355396795712; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- 30 ID=a60980f4-53c9-440c-b4f1-849d81b5ef2b; asset=ninguno; función=pregunta; x=77.16924508589958, y=145.42804042583953, tamaño=41.81315693227898×27.944267150417772; giro=0; texto="30"; notas=. Resto de propiedades y recorte en escena.json.
- flecha-abajo ID=12481509-c642-42a4-b70d-a7c02441eed1; asset=d8e7341c41b61035ec085002; función=decoracion; x=63.293879691110064, y=616.2335854037859, tamaño=83.17989588781381×83.17989588781381; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- flecha-arriba ID=a6a6b7ab-3025-4687-b4a3-8761f887b15f; asset=7edf9b67b5ea5f63c75caa73; función=decoracion; x=63.293879691110064, y=526.7173357414508, tamaño=83.17989588781381×83.17989588781381; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- GOZ · Etapa 3 · Volar ID=808dd089-99d2-49bc-a410-5226fa74a495; asset=98899603884e77ebdac5bdca; función=personaje; x=30.150435315199474, y=219.52065596052893, tamaño=240×240; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- moneda-pluma ID=0528840a-2ea8-4fb2-84da-59a810ad9bf1; asset=5cd58fecda45626d89501d22; función=decoracion; x=409.035175424408, y=249.8071200531445, tamaño=57.57572366685769×58.91859768824214; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- moneda-pluma ID=33f95732-c75e-4cc2-b818-04e5f210ba81; asset=5cd58fecda45626d89501d22; función=decoracion; x=545.6042130813117, y=360, tamaño=57.57572366685769×58.91859768824214; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- moneda-pluma ID=b5958ddd-e071-4528-b576-9a793ace13f3; asset=5cd58fecda45626d89501d22; función=decoracion; x=694.2234599432364, y=259.5816512486924, tamaño=57.57572366685769×58.91859768824214; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- moneda-pluma ID=6929880b-efb0-4f42-873f-63b0cc2a8cd1; asset=5cd58fecda45626d89501d22; función=decoracion; x=880.3322874144707, y=338.97392720422283, tamaño=57.57572366685769×58.91859768824214; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- moneda-pluma ID=6cc95ddf-0218-40c5-a0e7-59b9e58e3eb0; asset=5cd58fecda45626d89501d22; función=decoracion; x=1045.01847988309, y=249.8071200531445, tamaño=57.57572366685769×58.91859768824214; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- moneda-pluma ID=4924b923-8e07-47ea-ad3b-9d678642070a; asset=5cd58fecda45626d89501d22; función=decoracion; x=1184.723238735558, y=362.8056199176756, tamaño=57.57572366685769×58.91859768824214; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
### Vista principal · [Juego] · Lateral · fa131382-2e8c-440d-88f0-8e4e35eab5fa
Lienzo: 1280 × 720. Notas del autor: 
- efecto-acierto ID=ceb3da4a-c6ee-4eb2-beaa-cb0b3df874bd; asset=f712fe236f663a05dc0d7723; función=decoracion; x=611.8922143445695, y=539.155809319144, tamaño=240×216.03630862329803; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- pieza-hexagonal ID=5ee0459b-9237-4d37-a5df-80a48420261b; asset=8f03ecce4c17dd96bfa89f01; función=decoracion; x=252.67234425469968, y=430.51434761176637, tamaño=74.10309124913633×74.10309124913633; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- 01-cielo ID=e229881b-b153-40fa-b3ec-755cd2f1d2f3; asset=c5908e9295a349ce0783cd66; función=decoracion; x=-6.644115066598033, y=2.842170943040401e-14, tamaño=1309.288743789226×736.8664520966876; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- 03-nubes-cercanas ID=435a895f-9339-43f1-86cd-427957fd7b77; asset=cc7e872a2cbc0ebaffef0d02; función=decoracion; x=19.297348387899888, y=8.289023242777972, tamaño=1283.347280334728×722.2666212888632; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- 02-islas-lejanas ID=59d1e58e-b603-4ca0-8b36-2138d55677fd; asset=1f7514d4fbec30cbca7001fe; función=decoracion; x=19.297348387899888, y=2.842170943040401e-14, tamaño=1289.2901094630256×725.6112398353512; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 1 ID=af141cbd-3a2e-445b-acae-dac8f2e18370; asset=ninguno; función=decoracion; x=15.477104297793488, y=30.550145750157256, tamaño=217.49636491067685×43.9905849145453; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 2 ID=d505e5d3-97c7-4e96-a953-a1693cb85436; asset=ninguno; función=decoracion; x=15.477104297793488, y=27.00508197659404, tamaño=214.70012589751713×43.9905849145453; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 3 ID=a15ead1e-8c31-4e0a-bbae-d2a2d87b1130; asset=ninguno; función=decoracion; x=20.788265771189202, y=29.937787637563744, tamaño=204.0778029507257×38.12517359260593; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 4 ID=4f60a12b-6b27-4cd2-b858-f0a82002f268; asset=ninguno; función=decoracion; x=28.45589066057154, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 5 ID=e7a6b5b7-50fe-42ed-9def-4a35544f2b5f; asset=ninguno; función=decoracion; x=61.08836409196948, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 6 ID=058d6d6b-b01a-40f3-9ffe-b8f11a8c9f42; asset=ninguno; función=decoracion; x=93.72083752336741, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 7 ID=0efb0e3c-75ce-48f0-bae2-b2f8d094f96b; asset=ninguno; función=decoracion; x=126.35331095476536, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 1 ID=c962145f-5fe5-47e4-baf2-30e0e24de910; asset=ninguno; función=decoracion; x=15.477104297793502, y=92.3888288521896, tamaño=215.60940862956366×32.68437352600664; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 2 ID=0abb7076-89c7-438e-881f-1d616de7ca58; asset=ninguno; función=decoracion; x=15.477104297793502, y=87.4403752439422, tamaño=215.29427676655556×34.69820080081924; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 3 ID=550d37bb-6111-4637-abb4-d27dd985e76d; asset=ninguno; función=decoracion; x=18.66546628964693, y=90.73934431610714, tamaño=208.0091284265368×30.09495059411735; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- ¡Inténtalo de nuevo! ID=b41dad2f-d41c-4bc1-8a4c-008803c30d66; asset=ninguno; función=pregunta; x=57.95341563387939, y=92.3888288521896, tamaño=111.77047424538853×27.711340206185568; giro=0; texto="Reto 1 de 6"; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 7 ID=647b00e8-f751-4227-8315-3d4823dfd4df; asset=ninguno; función=decoracion; x=158.98578438616326, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 7 ID=0b8ea663-ef13-4117-9591-569bcd2525da; asset=ninguno; función=decoracion; x=191.6182578175612, y=34.15412677406657, tamaño=25.58018601497136×24.9070232251037; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- boton-sonido-normal ID=0f78c66d-a3dd-4317-912a-7029d3d4890a; asset=c657baf65fb921ae9c146c93; función=boton; x=1093.1284406551508, y=0, tamaño=91.59479808040727×97.91168070664224; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- boton-pausa-normal ID=ba2af924-49c8-4fef-878d-b64f67c47488; asset=9bcd74e7a06e9f54d5abacd1; función=boton; x=1172.8447757936815, y=0, tamaño=91.67811990852482×98.00074886773342; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 1 ID=6fd8d5f4-f14a-427b-9fb4-8de28f6bc27c; asset=ninguno; función=decoracion; x=18.66546628964693, y=139.6527417158474, tamaño=128.5003962973254×43.31474032494115; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 2 ID=31e94932-4861-441d-a9bf-0453e631520c; asset=ninguno; función=decoracion; x=18.66546628964693, y=135.32126768335326, tamaño=128.5003962973254×43.31474032494115; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 3 ID=1e5252c9-fa44-4f3a-a12b-6d0e4f63b849; asset=ninguno; función=decoracion; x=21.553115644643007, y=138.20891703834934, tamaño=122.72509758733325×37.539441614949; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 4 ID=27eb5940-81ba-4698-b1ed-aa0427b490b9; asset=ninguno; función=decoracion; x=30.150435315199488, y=144.57487129822704, tamaño=27.56392566132619×27.56392566132619; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 5 ID=e05d7286-852e-4d8f-974d-74d1a2f52616; asset=ninguno; función=decoracion; x=30.150435315199488, y=142.5075768736276, tamaño=27.56392566132619×27.56392566132619; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 6 ID=09b6987b-b453-47da-845d-bd0914daa46d; asset=ninguno; función=decoracion; x=32.90682788133214, y=145.26396943976022, tamaño=22.051140529060955×22.05114052906095; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pieza 7 ID=3ebc3d55-1c82-48ae-9882-1f1a0cf00fb5; asset=ninguno; función=decoracion; x=34.974122305931616, y=147.3312638643597, tamaño=17.91655167986202×16.538355396795712; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- 30 ID=e0c018bb-89d6-4396-89e0-9ec49206dbfa; asset=ninguno; función=pregunta; x=77.16924508589958, y=145.42804042583953, tamaño=41.81315693227898×27.944267150417772; giro=0; texto="30"; notas=. Resto de propiedades y recorte en escena.json.
- flecha-abajo ID=5d15fa33-72a9-4d4a-aa57-10701325f942; asset=d8e7341c41b61035ec085002; función=decoracion; x=63.293879691110064, y=616.2335854037859, tamaño=83.17989588781381×83.17989588781381; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- flecha-arriba ID=a3790d32-ffc9-46af-b62d-fc51fbd01738; asset=7edf9b67b5ea5f63c75caa73; función=decoracion; x=63.293879691110064, y=526.7173357414508, tamaño=83.17989588781381×83.17989588781381; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- panel-reto ID=85486964-5395-4726-a4b7-513f8e29a62f; asset=e935d048a2e26059991ecaee; función=boton; x=324.26559930383144, y=39.77588015496298, tamaño=887.3148156881092×499.379929164181; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=a8f20814-f536-43ed-b2df-add5d72c1f6e; asset=ninguno; función=pregunta; x=580.4753492634723, y=136.5220297293822, tamaño=398.17572994425973×35.61676723017102; giro=0; texto="Resuelve: 2,916 + 3,342."; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=8871b3ea-8e0f-40c9-8493-f274bddaa2f9; asset=ninguno; función=pregunta; x=463.52401350774966, y=398.19945696559023, tamaño=613.5536422879786×22.942526139115444; giro=0; texto="Revisa la columna de centenas: ¿llegaste a diez o más?"; notas=. Resto de propiedades y recorte en escena.json.
- pedestal ID=e6bb4d27-9f02-4fdb-b952-f1d28814d948; asset=b373007861f1eeaa49cdc5da; función=decoracion; x=463.52401350774977, y=591.5194240217252, tamaño=161.84108590481185×107.89405726987457; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- caja-respuesta ID=837db38c-8ed1-4bf5-910c-2590668662eb; asset=e4191a12a7b3429d460e666b; función=decoracion; x=463.5240135077497, y=483.62536675185066, tamaño=161.84108590481185×161.84108590481185; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=d08c7f75-4dda-4f4d-b9bc-edfdb05adfe0; asset=ninguno; función=pregunta; x=508.4137636568391, y=551.304231177557, tamaño=72.06158560663317×26.483357053399118; giro=0; texto="5,258"; notas=. Resto de propiedades y recorte en escena.json.
- pedestal ID=989667b5-55c6-4603-872a-48394ff9dac4; asset=b373007861f1eeaa49cdc5da; función=decoracion; x=650.9716713921637, y=591.5194240217252, tamaño=161.84108590481185×107.89405726987457; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- caja-respuesta ID=7d1c3b18-fe27-4ea5-98c4-6cf7e9e80611; asset=e4191a12a7b3429d460e666b; función=decoracion; x=650.9716713921637, y=483.62536675185066, tamaño=161.84108590481185×161.84108590481185; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=b7efebb2-0524-4921-a267-dc0a4a45ac96; asset=ninguno; función=pregunta; x=695.861421541253, y=551.304231177557, tamaño=72.06158560663317×26.483357053399118; giro=0; texto="6,258 "; notas=. Resto de propiedades y recorte en escena.json.
- pedestal ID=b4d6381c-5cd6-40de-8dc8-d94fe009507c; asset=b373007861f1eeaa49cdc5da; función=decoracion; x=834.4027154559711, y=591.5194240217252, tamaño=161.84108590481185×107.89405726987457; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- caja-respuesta ID=06a86d33-a3f6-4e26-9808-f7eafefac127; asset=e4191a12a7b3429d460e666b; función=decoracion; x=834.4027154559711, y=483.62536675185066, tamaño=161.84108590481185×161.84108590481185; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=c8436a6e-642e-47ec-b012-4cc2a29de3f0; asset=ninguno; función=pregunta; x=879.2924656050604, y=551.304231177557, tamaño=72.06158560663317×26.483357053399118; giro=0; texto="6,268"; notas=. Resto de propiedades y recorte en escena.json.
- GOZ · Etapa 3 · Volar ID=99e116ae-a3ee-47f6-974a-48f5ea31a95e; asset=98899603884e77ebdac5bdca; función=personaje; x=30.150435315199488, y=200.7758656558741, tamaño=240×240; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- mosaico-vacio ID=3b263aa1-b0f8-418e-a253-83f60052c6a3; asset=1578ab000f8894098fb1c6e4; función=decoracion; x=158.9857843861633, y=472.85169999317645, tamaño=240×237.33544805709752; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- diagrama-MCDU-vacio ID=a6a4ae84-24c1-4958-abaf-351d1a6c8cf6; asset=8e53e122ab5edb85ccc49448; función=decoracion; x=581.9574126069979, y=153.12965129843877, tamaño=371.9311890817763×278.94839181133227; giro=0; texto=""; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=59a3854d-9877-4bb6-a999-b36d923c7b56; asset=ninguno; función=pregunta; x=629.8418073457865, y=242.29856966004928, tamaño=36.316898964456755×35.61676723017102; giro=0; texto="2"; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=dc254e45-7ad2-4c90-91f9-ff75532c7a49; asset=ninguno; función=pregunta; x=713.7337648623411, y=242.29856966004928, tamaño=36.316898964456755×35.61676723017102; giro=0; texto="9"; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=f5cb0469-62a5-4664-abfa-8b3281ba1c06; asset=ninguno; función=pregunta; x=794.654307814747, y=242.29856966004928, tamaño=36.316898964456755×35.61676723017102; giro=0; texto="1"; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=8daeb725-2241-4617-890f-3c9197f1e9ed; asset=ninguno; función=pregunta; x=879.0063594439202, y=242.29856966004928, tamaño=36.316898964456755×35.61676723017102; giro=0; texto="6"; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=873efc63-0ede-4b8e-91b7-b1e9527abaf3; asset=ninguno; función=pregunta; x=629.8418073457865, y=289.46584473705354, tamaño=36.316898964456755×35.61676723017102; giro=0; texto="3"; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=27c2d861-a594-4083-973f-cabdf2d1b91d; asset=ninguno; función=pregunta; x=713.7337648623411, y=289.46584473705354, tamaño=36.316898964456755×35.61676723017102; giro=0; texto="3"; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=85e22606-e630-4246-83ff-4eb2a51e1bc7; asset=ninguno; función=pregunta; x=794.654307814747, y=289.46584473705354, tamaño=36.316898964456755×35.61676723017102; giro=0; texto="4"; notas=. Resto de propiedades y recorte en escena.json.
- Pregunta ID=f87f2995-1941-4939-8939-10d1ba5ecc67; asset=ninguno; función=pregunta; x=879.0063594439202, y=289.46584473705354, tamaño=36.316898964456755×35.61676723017102; giro=0; texto="2"; notas=. Resto de propiedades y recorte en escena.json.

## Tipografía y vectores
Conserva fontFamily, fontSize, bold, italic, underline, align, verticalAlign, lineHeight y letterSpacing. Tipografía oficial: solo Nunito Sans (recomendada para Ciclos I y II) e Inter (recomendada para Ciclo III), con todos sus pesos (fontWeight) y cursivas. Los archivos están en fonts/ y se cargan con fonts.css; no uses otras fuentes.
Las formas con svgPath son vectores reales. Su trazado usa coordenadas locales vectorWidth × vectorHeight y se escala al tamaño width × height. Respeta relleno, strokeColor, strokeWidth, opacidad, reflejos y giro. booleanSources conserva originales para edición, no se dibuja. No conviertas estos elementos en imágenes salvo una necesidad explícita.

## Entrega y validación
Entrega HTML, CSS, JavaScript y assets con rutas relativas, sin claves ni rutas absolutas en el runtime. Preferir Phaser para las mecánicas de juego; fija la versión usada.
Completa carga, instrucciones, interacción, pausa, reinicio, feedback y final. Las reglas no definidas deben identificarse y acordarse; no inventes criterios de evaluación.
Prueba que se pueda ganar, que los errores permitan continuar, que las respuestas sean correctas y que teclado/táctil funcionen. No deduzcas las respuestas correctas por el aspecto visual.
Compara el resultado con referencia.png si está incluida. Conserva el lienzo lógico y adapta la escala con márgenes, sin distorsionar personajes ni recortar controles.
No uses servicios de IA durante la partida salvo solicitud explícita. No publiques ni envíes datos a terceros automáticamente.
