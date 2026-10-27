import os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
parts = [open(os.path.join(ROOT, 'js', f), encoding='utf-8').read() for f in ('_head.js', '_core.js', '_voz.js', '_mid.js', '_body.js')]
open(os.path.join(ROOT, 'js', 'game.js'), 'w', encoding='utf-8').write(''.join(parts))
css = ''.join(open(os.path.join(ROOT, 'css', f), encoding='utf-8').read() for f in ('_base.css', '_extra.css'))
open(os.path.join(ROOT, 'css', 'style.css'), 'w', encoding='utf-8').write(css)
print('game.js y style.css ensamblados')
