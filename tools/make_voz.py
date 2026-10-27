# Genera js/voz-guion.js (clave -> texto para la voz). Textos literales de la ficha (J-01 a J-04); los números van con letras.
import json, os, re
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
U = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte',
     'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve']
D = {3: 'treinta', 4: 'cuarenta', 5: 'cincuenta', 6: 'sesenta', 7: 'setenta', 8: 'ochenta', 9: 'noventa'}
C = {1: 'ciento', 2: 'doscientos', 3: 'trescientos', 4: 'cuatrocientos', 5: 'quinientos', 6: 'seiscientos', 7: 'setecientos', 8: 'ochocientos', 9: 'novecientos'}
def w(n):
    if n < 30: return U[n]
    if n < 100:
        d, u = divmod(n, 10); return D[d] + ('' if u == 0 else ' y ' + U[u])
    if n < 1000:
        if n == 100: return 'cien'
        c, r = divmod(n, 100); return C[c] + ('' if r == 0 else ' ' + w(r))
    m, r = divmod(n, 1000)
    return ('mil' if m == 1 else w(m) + ' mil') + ('' if r == 0 else ' ' + w(r))
def spell(t):
    t = re.sub(r'\d{1,3}(?:,\d{3})+', lambda m: str(int(m.group().replace(',', ''))), t)
    t = t.replace(' + ', ' más ').replace(' = ', ' igual a ')
    t = re.sub(r'\d+', lambda m: w(int(m.group())), t)
    return t[:1].upper() + t[1:]

# (sumando 1, sumando 2, suma de centenas: (c1, c2))
R = [(2916, 3342, (9, 3)), (5723, 3854, (7, 8)), (1834, 5915, (8, 9)), (2641, 6738, (6, 7)), (3567, 2821, (5, 8)), (4952, 4636, (9, 6))]
V = {}
def put(k, t): V['nar-' + k] = spell(t)
put('consigna', 'Vas a resolver seis retos de suma. En cada reto tienes 1 intento y 2 reintentos, con una pista antes de cada reintento.')
put('intro', 'Cómo jugar. Uno: vuela con Goz hasta cada estación. Dos: resuelve la suma en M, C, D, U. Tres: elige la caja con el resultado correcto. Cuatro: completa los 6 retos y restaura el mosaico. Si te equivocas, revisa la pista e inténtalo de nuevo.')
put('vuela', 'Usa las flechas para subir y bajar y recoge las monedas.')
put('prueba', 'Prueba de controles. Resuelve: 10 + 10. Toca la opción correcta para probar los controles.')
put('prueba-ok', 'Así funcionan los controles del juego.')
put('ok', '¡Correcto! Formaste bien el millar.')
put('no-a', 'Esa no es la centena correcta. Vuelve a sumar las centenas: ¿llegas a diez o más?')
put('no-b', 'No lograste formar el millar en este reto. Revisemos juntos la columna de centenas en la siguiente actividad.')
put('tiempo', 'Se acabó el tiempo de este reto. Vamos al siguiente.')
put('nosel', 'Toca una de las tres cajas para elegir tu respuesta.')
put('g1a', 'Primero, resuelve la suma en tu cuaderno y mira la tabla de valor posicional.')
put('g1b', 'Después, toca la caja con el resultado correcto.')
put('p2', 'Compara el total de centenas con diez: ¿alcanza para formar un millar completo? Si lo forma, ese millar se suma a la columna de los millares.')
put('j04', '¿Cuál reto te costó más? ¿Qué estrategia usaste? Piensa en la columna de centenas de ese reto.')
put('gracias', 'Gracias por compartir tu estrategia. Vamos a seguir practicando solo.')
for i, t in enumerate(['¡Lo lograste! ¡Restauraste el mosaico del millar!', '¡Lo lograste! ¡Formar el millar con las centenas fue tu gran truco!', '¡Lo lograste! ¡Goz y tú son un gran equipo!', '¡Lo lograste! ¡Sigue practicando: cada día sumas mejor!', '¡Lo lograste! ¡Equivocarse es parte de aprender. Tú no te rendiste!']): put(f'final-{i}', t)
for n, (a, b, (c1, c2)) in enumerate(R, 1):
    put(f'q{n}', f'Resuelve: {a:,} + {b:,}. Revisa la columna de centenas: ¿llegaste a diez o más?')
    put(f'no-c{n}', f'Revisa las centenas: {c1} + {c2} = {c1 + c2}; falta trasladar el millar.')
    put(f'p1-{n}', f'Suma primero las centenas: {c1} + {c2}. ¿Llegas a diez o más?')
out = os.path.join(ROOT, 'js', 'voz-guion.js')
with open(out, 'w', encoding='utf-8') as f:
    f.write('/* Guion de voz: clave -> texto. Prefijo nar = narrador (Alejandro Ballesteros). Goz no habla.\n   Generado por tools/make_voz.py; textos de la ficha (Día 19) con los números escritos con letras. */\nwindow.VOZ_GUION = ')
    json.dump(V, f, ensure_ascii=False, indent=1); f.write(';\n')
print(len(V), 'voces')
