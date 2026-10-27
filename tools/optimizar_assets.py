# Genera assets/web/* (WebP livianos) a partir de los originales de la maqueta. Los originales no se tocan.
from PIL import Image
import numpy as np
import os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
A = os.path.join(ROOT, 'assets')

def save(im, rel, maxw=None, q=88):
    if maxw and im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    out = os.path.join(A, 'web', rel); os.makedirs(os.path.dirname(out), exist_ok=True)
    im.save(out, 'WEBP', quality=q, method=6)
    print(rel, im.size, os.path.getsize(out) // 1024, 'KB')

def crop(im, thr=24):
    a = np.array(im.split()[-1]); ys, xs = np.where(a > thr)
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))

def load(rel): return Image.open(os.path.join(A, rel)).convert('RGBA')

save(Image.open(os.path.join(A, 'referencias', 'pantalla-inicio-v1.png')).convert('RGB'), 'pantallas/inicio.webp', 1600, 88)
save(Image.open(os.path.join(A, 'referencias', 'pantalla-instrucciones-v1.png')).convert('RGB'), 'pantallas/instrucciones.webp', 1600, 88)
save(Image.open(os.path.join(A, 'props', '01-cielo.png')).convert('RGB'), 'cielo.webp', 1600, 84)
save(load('props/02-islas-lejanas.png'), 'islas.webp', 1600, 84)
save(load('props/03-nubes-cercanas.png'), 'nubes.webp', 1600, 84)
save(load('interfaz/panel-reto.png'), 'panel.webp', 1200, 90)
for n in ('sonido', 'pausa'):
    save(load(f'interfaz/boton-{n}-normal.png'), f'btn-{n}.webp', None, 92)
save(load('props/flecha-arriba.png'), 'flecha-arriba.webp', 256, 92); save(load('props/flecha-abajo.png'), 'flecha-abajo.webp', 256, 92)
save(load('props/caja-respuesta.png'), 'caja.webp', 420, 90)
save(load('props/pedestal.png'), 'pedestal.webp', 440, 90)
save(load('props/pieza-hexagonal.png'), 'pieza.webp', 240, 90)
save(load('props/mosaico-vacio.png'), 'mosaico.webp', 520, 90)
save(load('props/diagrama-mcdu-vacio.png'), 'diagrama.webp', 760, 90)
save(crop(load('props/efecto-acierto.png'), 10), 'acierto.webp', 520, 88)
save(load('props/moneda-pluma.png'), 'moneda.webp', 140, 92)
for n in ('volar', 'jump', 'idle'):
    save(load(f'personajes/goz/e3/{n}.png'), f'goz-{n}.webp', None, 90)
